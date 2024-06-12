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


const lastpage =() =>{
    
    
   
    const [items, setItems] = useState([]);
const [sum, setSum] = useState(0);

useEffect(() => {
    try {
        const storedItems = JSON.parse(localStorage.getItem("cart"));
        if (storedItems) {
            let total = 0;
            storedItems.forEach((item) => {
                total += parseInt(item.price);
            });
            setSum(total);
            localStorage.setItem("pricesum",total);
            localStorage.setItem("ncart", JSON.stringify(storedItems));
            localStorage.removeItem("cart");
        }
        // let total = 0;
        // storedItems.forEach((item) => {
        //     total += parseInt(item.price);
        // });

        const nstored = JSON.parse(localStorage.getItem("ncart"));
        setItems(nstored || []);
    } catch (error) {
        console.error("Error in retrieving or parsing data from local storage:", error);
        // Handle error gracefully, e.g., show a message to the user or set default values
    }
}, []);
useEffect(()=>{
    const sumprice = localStorage.getItem("pricesum");
    setSum(sumprice);
},[]); // Removed 'sum' from the dependency array

// Rest of your component...
 // No dependencies needed here, as it's just an initial setup
    // Include setItems in the dependency array if it might change
    
    
    return(<>
        <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive',color:"palevioletred" }}>
                        Thank You For Ordering
                    </div><br></br>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive',color:"palevioletred" }}>
                        Your Total Bill Is
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive',color:"palevioletred" }}>
                        {sum} Rs
                    </div>
                    <div style={{ display: 'flex',"margin":"80px 0", flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '80px' }}>
        {items?.map((item,index) => (
          <Card key={item.id} sx={{ maxWidth: 345 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardHeader title={item.name} />
             
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

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive',color:"palevioletred" }}>
                        Pay Online Now
                    </div><br></br>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive',color:"palevioletred" }}>
                        Scan The Below Code
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', fontFamily: 'cursive',color:"palevioletred" }}>
                        <img src='qr.jpeg'>
                        </img>
                    </div><br></br>
                    <Link style={{ display: 'flex',"textDecoration":"none","flexDirection":"column","cursor":"pointer","backgroundColor":"whitesmoke" ,'justifyContent': 'center', 'alignItems': 'center', 'fontFamily': 'cursive' }} href="/home">
                        <div>
                            <MenuBookIcon/>
            
                        </div>
                        <div>
                            Order More Dishes
                        </div>
                    </Link>

        </div>
    </>)
}
export default lastpage;