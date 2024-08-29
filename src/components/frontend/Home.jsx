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
// import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    products: [
      { id: 1, name: 'Laptop', image: 'laptop.jpg', price: '$999' },
      { id: 2, name: 'Smartphone', image: 'smartphone.jpg', price: '$599' },
    ],
  },
  {
    id: 2,
    name: 'Clothing',
    products: [
      { id: 3, name: 'T-Shirt', image: 'tshirt.jpg', price: '$29' },
      { id: 4, name: 'Jeans', image: 'jeans.jpg', price: '$49' },
    ],
  },
  // Add more categories as needed
];

const heroImages = [
  {
    src: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
    name: 'test 1',
    description: 'testing new things'
  },
  {
    src: 'https://via.placeholder.com/1200x400?text=Image+2',
    name: 'test 2',
    description: 'testing new things'
  },
  {
    src: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
    name: 'test 3',
    description: 'testing new things'
  },

];

const Home = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCartDrawer = (open) => () => {
    setCartOpen(open);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    alert('Search functionality to be implemented!');
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My E-Commerce Store
          </Typography>
          <form className="d-flex" onSubmit={handleSearch}>
            <TextField
              variant="outlined"
              placeholder="Search products..."
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: 1, mr: 2 }}
            />
            <Button variant="contained" color="secondary" type="submit">
              Search
            </Button>
          </form>
          <IconButton color="inherit" onClick={toggleCartDrawer(true)}>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Background Slider */}
      <div>
        <Slider className="custom-slider" {...settings}>
          {heroImages.map((image) => (
            <div key={image.id} className="slide-item">
              <div className="img-body">
                <img src={image.src} alt={image.name} />
              </div>
              <div className="slide-text">
                <h2>{image.name}</h2>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Category Showcase */}
      <Container className="my-5">
        <Typography variant="h4" gutterBottom>
          Shop by Category
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} md={6} key={category.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {category.name}
                  </Typography>
                  <Grid container spacing={2}>
                    {category.products.map((product) => (
                      <Grid item xs={12} sm={6} key={product.id}>
                        <Card className="mt-2">
                          <CardMedia
                            component="img"
                            height="140"
                            image={product.image}
                            alt={product.name}
                          />
                          <CardContent>
                            <Typography variant="h6">
                              {product.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {product.price}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Shopping Cart Drawer */}
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
            {/* Example Cart Items */}
            <ListItem>
              <ListItemText primary="Laptop" secondary="$999" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Smartphone" secondary="$599" />
            </ListItem>
            {/* Add more items as needed */}
          </List>
          <Divider />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Checkout
          </Button>
        </Container>
      </Drawer>
    </div>
  );
};

export default Home;


