// SideMenu.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TableChartIcon from '@mui/icons-material/TableChart';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const drawerWidth = 240;

const SideMenu = () => {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5, mt:-5 }}>
        <img
          alt="Logo"
          src="/images/Icon.png"
          sx={{ width: 80, height: 80 }}
        />
      </Box>
      <List>
        {[
          { text: 'Dashboard', icon: <HomeIcon /> },
          { text: 'Marketplace', icon: <ShoppingCartIcon /> },
          { text: 'Tables', icon: <TableChartIcon /> },
          { text: 'Profile', icon: <PersonIcon /> },
          { text: 'Sign In', icon: <LockIcon /> },
        ].map((item, index) => (
            <ListItem
            component="div"
            key={item.text}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
            sx={{
              cursor: 'pointer',
              backgroundColor: 'transparent',
              '&.Mui-selected': {
                backgroundColor: 'transparent', // Ensure no background color when selected
                color: 'primary.main', // Change text color when selected
                fontWeight: 'bold', // Make text bold when selected
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedIndex === index ? 'primary.main' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontWeight: selectedIndex === index ? 'bold' : 'inherit',
                  }}
                >
                  {item.text}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;