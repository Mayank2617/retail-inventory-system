import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
} from '@mui/material';

const Settings = () => {
  const [settings, setSettings] = useState({
    lowStockAlerts: localStorage.getItem('hideLowStockAlerts') !== 'true',
  });

  const handleToggle = (setting) => () => {
    setSettings((prev) => {
      const newValue = !prev[setting];
      if (setting === 'lowStockAlerts') {
        localStorage.setItem('hideLowStockAlerts', !newValue ? 'true' : 'false');
      }
      return { ...prev, [setting]: newValue };
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Settings
      </Typography>

      <Card sx={{ mt: 3 }}>
        <List subheader={<Typography variant="h6" sx={{ p: 2, pb: 1 }}>Inventory Alerts</Typography>}>
          <ListItem>
            <ListItemText
              primary="Dashboard Low Stock Alerts"
              secondary="Show the Low Stock warning widget on the main Dashboard"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.lowStockAlerts}
                onChange={handleToggle('lowStockAlerts')}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Card>
    </Box>
  );
};

export default Settings;
