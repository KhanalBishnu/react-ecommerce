import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const products = [
  { id: 1, name: 'Product 1', price: '$29.99', image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Product 2', price: '$49.99', image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Product 3', price: '$19.99', image: 'https://via.placeholder.com/300' },
];

const Product = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Our Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ height: 200 }}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {product.price}
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Product;
