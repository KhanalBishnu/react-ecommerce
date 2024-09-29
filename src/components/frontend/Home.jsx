import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CardActions, Badge, Box, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const products = [
  { id: 1, name: "Wireless Earbuds", price: 99.99, image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" },
  { id: 2, name: "Smart Watch", price: 199.99, image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 79.99, image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" },
  { id: 4, name: "Laptop", price: 999.99, image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" },
];

const heroSlides = [
  { id: 1, image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg", title: "Welcome to E-Shop", subtitle: "Discover amazing products at unbeatable prices!" },
  { id: 2, image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg", title: "New Arrivals", subtitle: "Check out our latest collection" },
  { id: 3, image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg", title: "Special Offers", subtitle: "Limited time deals on select items" },
];

const Home = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };

  const toggleCartDrawer = (open) => () => {
    setCartOpen(open);
  };

  const toggleMenuDrawer = (open) => () => {
    setMenuOpen(open);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert('Search functionality to be implemented!');
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenuDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Shop
          </Typography>
          {!isMobile && (
            <div>
              <Button color="inherit">Home</Button>
              <Button color="inherit">Products</Button>
              <Button color="inherit">About</Button>
              <Button color="inherit">Contact</Button>
            </div>
          )}
          <form onSubmit={handleSearch} style={{ display: 'flex', marginLeft: '1rem' }}>
            <TextField
              variant="outlined"
              placeholder="Search products..."
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: 1, mr: 1 }}
            />
            <Button variant="contained" color="secondary" type="submit">
              Search
            </Button>
          </form>
          <IconButton color="inherit" onClick={toggleCartDrawer(true)}>
            <Badge badgeContent={getTotalItems()} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Menu Drawer (only for mobile) */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenuDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleMenuDrawer(false)}
          onKeyDown={toggleMenuDrawer(false)}
        >
          <List>
            <ListItem button key="home">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="products">
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button key="about">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button key="contact">
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Hero Section with Background Slider */}
      <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
        <Slider {...sliderSettings}>
          {heroSlides.map((slide) => (
            <div key={slide.id}>
              <div style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: '2rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: 'white',
                }}>
                  <Typography variant="h2" component="h1" gutterBottom>
                    {slide.title}
                  </Typography>
                  <Typography variant="h5" component="p" gutterBottom>
                    {slide.subtitle}
                  </Typography>
                  <Button variant="contained" color="primary" size="large">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <Container className="my-5">
        <Typography variant="h4" gutterBottom>
          Shop by Category
        </Typography>
        <section className="py-5">
          <Container>
            <Typography variant="h3" component="h2" gutterBottom className="text-center mb-4">
              Featured Products
            </Typography>
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        ${product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
      </Container>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCartDrawer(false)}>
        <Container sx={{ width: 350, padding: 2, position: 'relative' }}>
          <IconButton
            onClick={toggleCartDrawer(false)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Shopping Cart
          </Typography>
          <Divider />
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id}>
                <ListItemText 
                  primary={item.name} 
                  secondary={`$${item.price.toFixed(2)} x ${item.quantity}`} 
                />
                <Button onClick={() => removeFromCart(item.id)} color="secondary">
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" align="right" sx={{ mt: 2 }}>
            Total: ${getTotalPrice()}
          </Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Checkout
          </Button>
        </Container>
      </Drawer>

      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-evenly">
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Best Product
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                123 E-Shop 
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Follow Us
              </Typography>
              <Link href="https://www.facebook.com/" color="inherit">
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.instagram.com/"
                color="inherit"
                sx={{ pl: 1, pr: 1 }}
              >
                <InstagramIcon />
              </Link>
              <Link href="https://www.twitter.com/" color="inherit">
                <TwitterIcon />
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" color="text.secondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://your-website.com/">
                E-Shop
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Home;