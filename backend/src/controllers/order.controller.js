const { SalesOrder, SalesOrderItem, Customer, Location, Product } = require('../models');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private
 */
const getOrders = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      status = '',
      customer_id = '',
      location_id = '',
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (status) {
      where.status = status;
    }

    if (customer_id) {
      where.customer_id = customer_id;
    }

    if (location_id) {
      where.location_id = location_id;
    }

    const { count, rows } = await SalesOrder.findAndCountAll({
      where,
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'customer_number', 'first_name', 'last_name', 'email'],
        },
        {
          model: Location,
          as: 'location',
          attributes: ['id', 'code', 'name'],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['order_date', 'DESC']],
    });

    paginatedResponse(res, rows, page, limit, count, 'Orders retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single order
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrder = async (req, res, next) => {
  try {
    const order = await SalesOrder.findByPk(req.params.id, {
      include: [
        {
          model: Customer,
          as: 'customer',
        },
        {
          model: Location,
          as: 'location',
        },
        {
          model: SalesOrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'sku', 'name', 'unit_price'],
            },
          ],
        },
      ],
    });

    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    successResponse(res, order, 'Order retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create order
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res, next) => {
  try {
    const { customer_id, location_id, items, ...orderData } = req.body;

    // Calculate totals
    let subtotal = 0;
    let tax_amount = 0;
    let total_amount = parseFloat(orderData.total_amount) || 0;

    if (items && items.length > 0) {
      items.forEach((item) => {
        subtotal += item.quantity * item.unit_price;
      });
      tax_amount = subtotal * 0.09; // 9% tax
      total_amount = subtotal + tax_amount + (parseFloat(orderData.shipping_cost) || 0);
    } else {
      subtotal = total_amount; // Fallback for DB constraints
    }

    // Generate order number
    const orderCount = await SalesOrder.count();
    const order_number = `SO-${new Date().getFullYear()}-${String(orderCount + 1).padStart(4, '0')}`;

    // Create order
    const order = await SalesOrder.create({
      order_number,
      customer_id,
      location_id,
      ...orderData,
      subtotal,
      tax_amount,
      total_amount,
    });

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      ...item,
      total_price: item.quantity * item.unit_price,
    }));

    await SalesOrderItem.bulkCreate(orderItems);

    // Fetch complete order
    const completeOrder = await SalesOrder.findByPk(order.id, {
      include: [
        { model: Customer, as: 'customer' },
        { model: Location, as: 'location' },
        {
          model: SalesOrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });

    successResponse(res, completeOrder, 'Order created successfully', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update order status
 * @route   PUT /api/orders/:id/status
 * @access  Private (Admin, Manager)
 */
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await SalesOrder.findByPk(req.params.id);

    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    await order.update({ status });

    successResponse(res, order, 'Order status updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
};
