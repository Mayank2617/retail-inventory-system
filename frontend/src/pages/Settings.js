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
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlerts: true,
    weeklyReports: true,
  });

  const handleToggle = (setting) => () => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Settings
      </Typography>

      <Card sx={{ mt: 3 }}>
        <List subheader={<Typography variant="h6" sx={{ p: 2, pb: 1 }}>Notifications</Typography>}>
          <ListItem>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive updates and alerts via email"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.emailNotifications}
                onChange={handleToggle('emailNotifications')}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="SMS Notifications"
              secondary="Receive critical alerts via SMS text"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.smsNotifications}
                onChange={handleToggle('smsNotifications')}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Divider sx={{ borderWidth: 4, borderColor: 'background.default' }} />

        <List subheader={<Typography variant="h6" sx={{ p: 2, pb: 1 }}>Inventory Alerts</Typography>}>
          <ListItem>
            <ListItemText
              primary="Low Stock Alerts"
              secondary="Notify me when products drop below their minimum stock level"
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
          <Divider />
          <ListItem>
            <ListItemText
              primary="Weekly Summary Reports"
              secondary="Email me a summary of inventory and sales every Monday"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.weeklyReports}
                onChange={handleToggle('weeklyReports')}
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
