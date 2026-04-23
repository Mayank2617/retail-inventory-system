import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  Inventory2,
  ShoppingCart,
  AttachMoney,
  Warning,
} from '@mui/icons-material';
import reportService from '../services/reportService';

const StatCard = ({ title, value, icon, color, trend }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ mb: 1 }}>
            {value}
          </Typography>
          {trend !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUp fontSize="small" color={trend > 0 ? 'success' : 'error'} />
              <Typography variant="body2" color={trend > 0 ? 'success.main' : 'error.main'}>
                {trend > 0 ? '+' : ''}{trend}% from last month
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            bgcolor: `${color}.light`,
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        const response = await reportService.getDashboardStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts?.toLocaleString() || '0',
      icon: <Inventory2 sx={{ color: 'primary.main' }} />,
      color: 'primary',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders?.toLocaleString() || '0',
      icon: <ShoppingCart sx={{ color: 'success.main' }} />,
      color: 'success',
    },
    {
      title: 'Revenue',
      value: `$${Number(stats?.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: <AttachMoney sx={{ color: 'info.main' }} />,
      color: 'info',
    },
  ];

  if (localStorage.getItem('hideLowStockAlerts') !== 'true') {
    statCards.push({
      title: 'Low Stock Items',
      value: stats?.lowStockItems?.toString() || '0',
      icon: <Warning sx={{ color: 'warning.main' }} />,
      color: 'warning',
    });
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Welcome back, {user?.first_name || 'User'}! Here's what's happening with your inventory today.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Stats Cards */}
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Recent Orders
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography color="text.secondary">
                {stats?.totalOrders > 0
                  ? `You have ${stats.totalOrders} orders in the system.`
                  : 'No recent orders. Orders will appear here once created.'}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Low Stock Alert */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Low Stock Alert
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography color={stats?.lowStockItems > 0 ? 'warning.main' : 'text.secondary'}>
                {stats?.lowStockItems > 0
                  ? `${stats.lowStockItems} items are running low on stock. Please reorder soon.`
                  : 'All inventory levels are healthy.'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
