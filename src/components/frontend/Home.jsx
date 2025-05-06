import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import HeroSection from './HeroSection';
import Product from './Product';
import About from './About';
import Contact from './Contact';

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cart = [1, 2, 3]; // Example cart data (replace with real state later)

  return (
    <>
     <HeroSection />
     <Product />
     <About />
     <Contact />
    </>
  );
};

export default Home;
