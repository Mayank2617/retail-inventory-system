import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  Typography,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { getInventory, adjustInventory } from '../../store/slices/inventorySlice';

const adjustSchema = yup.object().shape({
  quantity: yup.number().required('Quantity adjustment is required'),
  reason: yup.string().required('Reason is required')
});

const InventoryList = () => {
  const dispatch = useDispatch();
  const { inventory, isLoading } = useSelector((state) => state.inventory);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(adjustSchema),
    defaultValues: {
      quantity: 0,
      reason: ''
    }
  });

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  const getStockStatus = (item) => {
    const available = item.quantity_available;
    const reorderPoint = item.product?.reorder_point || 0;
    const minStock = item.product?.min_stock_level || 0;

    if (available <= minStock) return { label: 'Out of Stock', color: 'error' };
    if (available <= reorderPoint) return { label: 'Reorder', color: 'warning' };
    return { label: 'In Stock', color: 'success' };
  };

  const handleOpenAdjust = (item) => {
    setSelectedItem(item);
    reset({
      quantity: 0,
      reason: ''
    });
    setOpenDialog(true);
  };

  const onClose = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(adjustInventory({
        product_id: selectedItem.product_id,
        location_id: selectedItem.location_id,
        quantity: data.quantity,
        reason: data.reason
      })).unwrap();
      toast.success('Inventory adjusted successfully');
      dispatch(getInventory()); // Refresh data to immediately update status
      onClose();
    } catch (err) {
      toast.error(err || 'Failed to adjust inventory');
    }
  };

  const filteredInventory = inventory?.filter((item) => {
    if (statusFilter === 'All') return true;
    const status = getStockStatus(item);
    return status.label === statusFilter;
  });

  if (isLoading && !openDialog) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" gutterBottom fontWeight="600">
            Inventory
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track inventory levels across all locations
          </Typography>
        </div>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter Status</InputLabel>
          <Select
            value={statusFilter}
            label="Filter Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All">All Items</MenuItem>
            <MenuItem value="In Stock">In Stock</MenuItem>
            <MenuItem value="Reorder">Reorder</MenuItem>
            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Available</TableCell>
                <TableCell align="right">Reserved</TableCell>
                <TableCell align="right">In Transit</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!filteredInventory || filteredInventory.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography color="text.secondary" sx={{ py: 3 }}>
                      No inventory data available
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventory.map((item) => {
                  const status = getStockStatus(item);
                  return (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="500">
                          {item.product?.name || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.product?.sku || '-'}</TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {item.location?.name || '-'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.location?.code || ''}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          fontWeight="600"
                          color={status.color === 'error' ? 'error.main' : 'text.primary'}
                        >
                          {item.quantity_available}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{item.quantity_reserved}</TableCell>
                      <TableCell align="right">{item.quantity_in_transit}</TableCell>
                      <TableCell>
                        <Chip label={status.label} color={status.color} size="small" />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" title="Adjust Stock" onClick={() => handleOpenAdjust(item)}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={openDialog} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Adjust Stock</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Adjusting stock for: <strong>{selectedItem?.product?.name}</strong> at <strong>{selectedItem?.location?.name}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Current Available Stock: <strong>{selectedItem?.quantity_available}</strong>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <TextField 
                    {...field} 
                    type="number" 
                    label="Adjustment Quantity (+/-)" 
                    fullWidth 
                    error={!!errors.quantity} 
                    helperText={errors.quantity?.message || 'Use negative numbers to deduct stock'} 
                  />
                )}
              />
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <TextField 
                    {...field} 
                    label="Reason for adjustment" 
                    fullWidth 
                    multiline 
                    rows={2} 
                    error={!!errors.reason} 
                    helperText={errors.reason?.message} 
                  />
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">Apply Adjustment</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default InventoryList;
