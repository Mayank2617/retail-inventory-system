import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate as useRouteNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Divider,
  CircularProgress
} from '@mui/material';
import { ArrowBack, Save, AddShoppingCart } from '@mui/icons-material';
import { createOrder } from '../../store/slices/orderSlice';
import locationService from '../../services/locationService';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const orderSchema = yup.object().shape({
  customer_id: yup.string().uuid('Customer ID must be a valid UUID').nullable().transform(value => value || null),
  location_id: yup.string().required('Location is required'),
  status: yup.string().required('Status is required'),
  notes: yup.string()
});

const OrderForm = () => {
  const navigate = useRouteNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await locationService.getLocations();
        setLocations(response.data || []);
      } catch (err) {
        toast.error('Failed to load locations');
      }
    };
    fetchLocations();
  }, []);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: {
      customer_id: '',
      location_id: '',
      status: 'pending',
      notes: '',
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      // In a real scenario, we would also collect order items
      await dispatch(createOrder({ ...data, items: [] })).unwrap();
      toast.success('Order created successfully');
      navigate('/orders');
    } catch (error) {
      toast.error(error || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/orders')} sx={{ mb: 2 }}>
        Back to Orders
      </Button>

      <Typography variant="h4" gutterBottom fontWeight="600" sx={{ display: 'flex', alignItems: 'center' }}>
        <AddShoppingCart sx={{ mr: 2, fontSize: 32 }} />
        Create New Order
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" gutterBottom color="primary">
              Order Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="customer_id"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Customer ID (Optional)"
                      placeholder="Enter Customer UUID if known"
                      error={!!errors.customer_id}
                      helperText={errors.customer_id?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Order Status"
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="location_id"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Location (Warehouse)"
                      error={!!errors.location_id}
                      helperText={errors.location_id?.message}
                    >
                      {locations.map((loc) => (
                        <MenuItem key={loc.id} value={loc.id}>
                          {loc.name} ({loc.code})
                        </MenuItem>
                      ))}
                      {locations.length === 0 && (
                        <MenuItem value="" disabled>No locations available</MenuItem>
                      )}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={4}
                      label="Order Notes"
                      placeholder="Special instructions or delivery notes"
                      error={!!errors.notes}
                      helperText={errors.notes?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom color="text.secondary">
              * Order Items selection UI will be integrated below *
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
              <Button variant="outlined" onClick={() => navigate('/orders')} disabled={loading}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                disabled={loading}
              >
                Save Order
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderForm;
