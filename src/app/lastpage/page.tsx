"use client"
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface StoredItem {
  id: number;
  name: string;
  img: string;
  price: number; // Assuming price is a number
  // Add other properties as needed
}

const lastpage = () => {
  const [items, setItems] = useState<StoredItem[]>([]);
  const [sum, setSum] = useState<number>(0);

  useEffect(() => {
    try {
      const storedItemsString = localStorage.getItem("cart");
      const storedItems: StoredItem[] = storedItemsString ? JSON.parse(storedItemsString) : [];

      if (storedItems) {
        let total = 0;
        storedItems.forEach((item: StoredItem) => {
          total += parseInt(item.price.toString());
        });
        setSum(total);
        localStorage.setItem("pricesum", total.toString());
        localStorage.setItem("ncart", JSON.stringify(storedItems));
        localStorage.removeItem("cart");
      }

      const nstoredString = localStorage.getItem("ncart");
      const nstored: StoredItem[] = nstoredString ? JSON.parse(nstoredString) : [];
      setItems(nstored || []);
    } catch (error) {
      console.error("Error in retrieving or parsing data from local storage:", error);
      // Handle error gracefully, e.g., show a message to the user or set default values
    }
  }, []);

  useEffect(() => {
    const sumprice = localStorage.getItem("pricesum");
    if (sumprice !== null) {
      const parsedSumPrice = parseInt(sumprice);
      if (!isNaN(parsedSumPrice)) {
        setSum(parsedSumPrice);
      }
    }
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive', color: "palevioletred" }}>
        Thank You For Ordering
      </div><br></br>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive', color: "palevioletred" }}>
        Your Total Bill Is
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive', color: "palevioletred" }}>
        {sum} Rs
      </div>
      <div style={{ display: 'flex', "margin": "80px 0", flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '80px' }}>
        {items?.map((item, index) => (
          <Card key={item.id} sx={{ maxWidth: 345 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardHeader title={item.name} />
            </div>
            <CardMedia component="img" height="194" image={item.img} alt="Paella dish" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
          </Card>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive', color: "palevioletred" }}>
        Pay Online Now
      </div><br></br>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive', color: "palevioletred" }}>
        Scan The Below Code
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', fontFamily: 'cursive', color: "palevioletred" }}>
        <img src='qr.jpeg'></img>
      </div><br></br>
      <Link style={{ display: 'flex', "textDecoration": "none", "flexDirection": "column", "cursor": "pointer", "backgroundColor": "whitesmoke", 'justifyContent': 'center', 'alignItems': 'center', 'fontFamily': 'cursive' }} href="/home">
        <div>
          <MenuBookIcon />
        </div>
        <div>
          Order More Dishes
        </div>
      </Link>
    </div>
  );
}

export default lastpage;

