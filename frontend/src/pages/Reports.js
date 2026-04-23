import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Grid, CircularProgress } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import reportService from '../services/reportService';

const Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const result = await reportService.getDashboardStats();
        setData(result.data);
      } catch (error) {
        console.error('Failed to fetch reports', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReportData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Formatting data for charts based on dashboard stats available
  const productData = [
    { name: 'Total Products', count: data?.totalProducts || 0 },
    { name: 'Low Stock', count: data?.lowStockItems || 0 },
  ];

  const getStatusCount = (statusName) => {
    if (!data?.orderStatusCounts) return 0;
    const match = data.orderStatusCounts.find(s => s.status === statusName);
    return match ? match.count : 0;
  };

  const orderData = [
    { name: 'Pending', count: getStatusCount('pending') },
    { name: 'Processing', count: getStatusCount('processing') },
    { name: 'Shipped', count: getStatusCount('shipped') },
    { name: 'Delivered', count: getStatusCount('delivered') },
  ];

  const COLORS = ['#0088FE', '#FFBB28', '#FF8042', '#00C49F'];

  const filteredOrderData = orderData.filter(d => d.count > 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Analytics & Reports
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Product Stock Overview
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={productData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Quantity" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Recent Order Status Distribution
            </Typography>
            
            {filteredOrderData.length === 0 ? (
              <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">No active orders available to graph.</Typography>
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={filteredOrderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {filteredOrderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
