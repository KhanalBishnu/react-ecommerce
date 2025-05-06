import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';

const NavbarWithDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cart = [1, 2, 3];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Shop
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <NavLink to="/" style={({ isActive }) => ({ color: 'white', textDecoration: isActive ? 'underline' : 'none' })}>Home</NavLink>
            <NavLink to="/products" style={({ isActive }) => ({ color: 'white', textDecoration: isActive ? 'underline' : 'none' })}>Products</NavLink>
            <NavLink to="/about" style={({ isActive }) => ({ color: 'white', textDecoration: isActive ? 'underline' : 'none' })}>About</NavLink>
            <NavLink to="/contact" style={({ isActive }) => ({ color: 'white', textDecoration: isActive ? 'underline' : 'none' })}>Contact</NavLink>
            <NavLink to="/login" style={({ isActive }) => ({ color: 'white', textDecoration: isActive ? 'underline' : 'none' })}>Login</NavLink>
          </Box>
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6">Your Cart</Typography>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`Product ${item}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavbarWithDrawer;
