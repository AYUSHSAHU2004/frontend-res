"use client"
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import AddTaskTwoToneIcon from '@mui/icons-material/AddTaskTwoTone';
import Link from 'next/link';

interface CartItem {
    id: string;
    name: string;
    img: string;
    // Add other properties as needed
}

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]); // Explicitly typing items as CartItem[]

  useEffect(() => {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setItems([...cartItems]);
  }, []);

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = items.filter((item, indexi) => indexi !== index);
    setItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`Removed ${items[index].name} from the cart.`);
  };

  const placeOrder = () => {
    alert("Confirm your Order");
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '35px', fontFamily: 'cursive' }}>
        Your Orders
      </div>
      <div style={{ display: 'flex', "margin": "80px 0", flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '80px' }}>
        {items?.map((item, index) => (
          <Card key={item.id} sx={{ maxWidth: 345 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardHeader title={item.name} />
              <a href="/cart" style={{ cursor: 'pointer' }} onClick={() => handleRemoveFromCart(index)}>
                <CardHeader title={<DeleteIcon />} subheader="Remove From Order" />
              </a>
            </div>
            <CardMedia component="img" height="194" image={item.img} alt="Paella dish" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography>
              <Typography style={{"fontWeight":"700"}} variant="body2" color="black">
                   Price: {item.price} Rs
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', "cursor": "pointer", "backgroundColor": "whitesmoke", "justifyContent": "space-around", 'alignItems': 'center', 'fontFamily': 'cursive', "position": "fixed", "bottom": "0px", "width": "100%", "padding": "15px 0" }}>
        <Link style={{ display: 'flex', "textDecoration": "none", "flexDirection": "column", "cursor": "pointer", "backgroundColor": "whitesmoke", 'justifyContent': 'center', 'alignItems': 'center', 'fontFamily': 'cursive' }} href="/home">
          <div>
            <MenuBookIcon />

          </div>
          <div>
            Add More Dishes
          </div>
        </Link>
        <Link href="/confirmorder" onClick={placeOrder} style={{ display: 'flex', "textDecoration": "none", "flexDirection": "column", "cursor": "pointer", "backgroundColor": "whitesmoke", 'justifyContent': 'center', 'alignItems': 'center', 'fontFamily': 'cursive' }}>
          <div>
            <AddTaskTwoToneIcon />
          </div>
          <div>
            Place Order
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
