import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../services/api';

const productSchema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  sku: yup.string().required('SKU is required'),
  barcode: yup.string(),
  category_id: yup.string(),
  unit_price: yup.number()
    .typeError('Unit price must be a number')
    .positive('Price must be greater than zero')
    .required('Unit price is required'),
  cost_price: yup.number()
    .typeError('Cost price must be a number')
    .positive('Cost must be greater than zero')
    .required('Cost price is required'),
  is_active: yup.boolean(),
  description: yup.string(),
  min_stock_level: yup.number().typeError('Must be a number').integer().min(0).default(0),
  reorder_point: yup.number().typeError('Must be a number').integer().min(0).default(0),
  reorder_quantity: yup.number().typeError('Must be a number').integer().min(0).default(0),
});

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: '',
      sku: '',
      barcode: '',
      category_id: '',
      unit_price: '',
      cost_price: '',
      is_active: true,
      description: '',
      min_stock_level: 0,
      reorder_point: 0,
      reorder_quantity: 0
    }
  });

  React.useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoadingProduct(true);
        try {
          const response = await api.get(`/products/${id}`);
          const product = response.data.data || response.data;
          reset({
            name: product.name || '',
            sku: product.sku || '',
            barcode: product.barcode || '',
            category_id: product.category_id || '',
            unit_price: product.unit_price || '',
            cost_price: product.cost_price || '',
            is_active: product.is_active !== undefined ? product.is_active : true,
            description: product.description || '',
            min_stock_level: product.min_stock_level || 0,
            reorder_point: product.reorder_point || 0,
            reorder_quantity: product.reorder_quantity || 0
          });
        } catch (err) {
          toast.error('Failed to load product details');
          navigate('/products');
        } finally {
          setLoadingProduct(false);
        }
      };
      fetchProduct();
    }
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      if (id) {
        await api.put(`/products/${id}`, data);
        toast.success('Product updated successfully');
      } else {
        await api.post('/products', data);
        toast.success('Product created successfully');
      }
      navigate('/products');
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/products')}
        sx={{ mb: 2 }}
      >
        Back to Products
      </Button>

      <Typography variant="h4" gutterBottom fontWeight="600">
        {id ? 'Edit Product' : 'Add New Product'}
      </Typography>

      {loadingProduct ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} required fullWidth label="Product Name" error={!!errors.name} helperText={errors.name?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="sku"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} required fullWidth label="SKU" error={!!errors.sku} helperText={errors.sku?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="barcode"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Barcode" error={!!errors.barcode} helperText={errors.barcode?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select fullWidth label="Category" error={!!errors.category_id} helperText={errors.category_id?.message}>
                      <MenuItem value="">Select Category</MenuItem>
                      <MenuItem value="15ffa099-9c0b-4ef8-bb6d-6bb9bd380c11">Electronics</MenuItem>
                      <MenuItem value="18c2d399-9c0b-4ef8-bb6d-6bb9bd380c44">-- Smartphones</MenuItem>
                      <MenuItem value="19d3e499-9c0b-4ef8-bb6d-6bb9bd380c55">-- Laptops</MenuItem>
                      <MenuItem value="16a0b199-9c0b-4ef8-bb6d-6bb9bd380c22">Apparel</MenuItem>
                      <MenuItem value="20e4f599-9c0b-4ef8-bb6d-6bb9bd380c66">-- Mens Clothing</MenuItem>
                      <MenuItem value="21f50699-9c0b-4ef8-bb6d-6bb9bd380c77">-- Womens Clothing</MenuItem>
                      <MenuItem value="17b1c299-9c0b-4ef8-bb6d-6bb9bd380c33">Home & Garden</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="unit_price"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} required fullWidth type="number" label="Unit Price" error={!!errors.unit_price} helperText={errors.unit_price?.message} InputProps={{ startAdornment: '$' }} />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="cost_price"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth type="number" label="Cost Price" error={!!errors.cost_price} helperText={errors.cost_price?.message} InputProps={{ startAdornment: '$' }} />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select fullWidth label="Status">
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth multiline rows={4} label="Description" error={!!errors.description} helperText={errors.description?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="min_stock_level"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth type="number" label="Minimum Stock Level" error={!!errors.min_stock_level} helperText={errors.min_stock_level?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="reorder_point"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth type="number" label="Reorder Point" error={!!errors.reorder_point} helperText={errors.reorder_point?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller
                  name="reorder_quantity"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth type="number" label="Reorder Quantity" error={!!errors.reorder_quantity} helperText={errors.reorder_quantity?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/products')}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
                    disabled={saving}
                  >
                    Save Product
                  </Button>
                </Box>
              </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ProductForm;
