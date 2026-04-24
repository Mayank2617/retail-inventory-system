const { sequelize, Product, SalesOrder, Inventory } = require('../models');
const { successResponse } = require('../utils/response');
const { Op } = require('sequelize');

/**
 * @desc    Get dashboard stats
 * @route   GET /api/reports/dashboard
 * @access  Private
 */
const getDashboardStats = async (req, res, next) => {
  try {
    // Get total products
    const totalProducts = await Product.count({ where: { is_active: true } });

    // Get total orders
    const totalOrders = await SalesOrder.count();

    // Get total revenue
    const revenueResult = await SalesOrder.sum('total_amount');
    const totalRevenue = revenueResult || 0;

    const lowStockItems = await Inventory.count({
      include: [
        {
          model: Product,
          as: 'product',
          where: {
            is_active: true,
            [Op.and]: sequelize.literal('"Inventory"."quantity_available" <= "product"."reorder_point"')
          },
        },
      ],
    });

    // Get order status counts
    const orderStatusCounts = await SalesOrder.findAll({
      attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['status']
    });

    const stats = {
      totalProducts,
      totalOrders,
      totalRevenue: parseFloat(totalRevenue).toFixed(2),
      lowStockItems,
      orderStatusCounts: orderStatusCounts.map(s => ({
        status: s.status,
        count: parseInt(s.dataValues.count, 10)
      })),
    };

    successResponse(res, stats, 'Dashboard stats retrieved successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
