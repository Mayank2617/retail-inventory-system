const { Product, Category, Location, Inventory } = require('../models');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const { Op } = require('sequelize');

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Private
 */
const getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = '',
      category_id = '',
      is_active = '',
      sort_by = 'created_at',
      order = 'DESC',
    } = req.query;

    const offset = (page - 1) * limit;

    // Build where clause
    const where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { sku: { [Op.iLike]: `%${search}%` } },
        { barcode: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (category_id) {
      where.category_id = category_id;
    }

    if (is_active !== '') {
      where.is_active = is_active === 'true';
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort_by, order]],
    });

    paginatedResponse(res, rows, page, limit, count, 'Products retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Private
 */
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }

    successResponse(res, product, 'Product retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create product
 * @route   POST /api/products
 * @access  Private (Admin, Manager)
 */
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    // Automatically seed an Inventory record with 0 quantity for each warehouse location
    const locations = await Location.findAll();
    
    if (locations && locations.length > 0) {
      const inventoryRecords = locations.map((location) => ({
        product_id: product.id,
        location_id: location.id,
        quantity_available: 0,
        quantity_reserved: 0,
        quantity_in_transit: 0,
        last_adjustment_reason: 'Initial product creation',
        updated_by: req.user ? req.user.id : null
      }));
      
      await Inventory.bulkCreate(inventoryRecords);
    }

    const productWithCategory = await Product.findByPk(product.id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    successResponse(res, productWithCategory, 'Product created successfully', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private (Admin, Manager)
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }

    await product.update(req.body);

    const updatedProduct = await Product.findByPk(product.id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    successResponse(res, updatedProduct, 'Product updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private (Admin)
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }

    try {
      // First delete associated inventory tracking records
      const { Inventory } = require('../models');
      await Inventory.destroy({ where: { product_id: product.id } });
      
      // Then hard delete the product
      await product.destroy();
      return successResponse(res, null, 'Product permanently deleted');
    } catch (dbError) {
      // If it fails (e.g. Foreign Key Constraint from Sales Orders), fallback to soft delete
      if (dbError.name === 'SequelizeForeignKeyConstraintError') {
        await product.update({ is_active: false });
        return successResponse(res, null, 'Product is tied to sales orders and was deactivated instead');
      }
      throw dbError; // re-throw if it's another error
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
