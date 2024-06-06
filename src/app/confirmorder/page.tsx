"use client"
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { items } from '../data';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AddTaskTwoToneIcon from '@mui/icons-material/AddTaskTwoTone';
import Link from 'next/link';




interface CartItem {
    id: number;
    name: string;
    img: string;
    // Add other properties as needed
}
const confirmorder = () =>{
    const [cart, setCart] = useState<CartItem[]>([]);
    const [numb, setNum] = useState<number>(0); // Initialize numb as a number with an initial value of 0
    const [pnumb, setPnumb] = useState<string | undefined>('');
    const [name,setname] = useState("");
   
    const [value,setValue] = useState({
        "phone_number":"",
        "table_number":"",
        "first_name":"",
        "items":{}
    });
    const handleAddToCart = (item: CartItem) => {
        setCart([...cart, item]);
        alert(`Added ${item.name} to cart`);
    };

    useEffect(() => {
        console.log(cart);
        const phoneNumber = typeof pnumb === 'string' ? pnumb : "";
        const tableNumber = typeof numb === 'string' ? numb : "";
        setValue({
            "phone_number": phoneNumber,
            "table_number": tableNumber,
            "first_name": name,
            "items": cart
        });
    }, [cart, numb, pnumb, name]);
    
    

    useEffect(() => {
        const storedItemsString = localStorage.getItem("cart");
        if (storedItemsString !== null) {
            const prevItems = JSON.parse(storedItemsString);
            if (prevItems.length !== 0) {
                setCart(prevItems);
            }
        }
    }, []);
    
    useEffect(()=>{

    },[]);
    function sendProps(numb:number){
       // Log cart state
       
       if(!numb){
        alert("first enter your table number");
        return;
       }
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("tableno.", numb?.toString() ?? ''); // Convert numb to string or use an empty string if undefined
        localStorage.setItem("pnumb.", (pnumb ?? '').toString()); // Convert pnumb to string or use an empty string if undefined

        localStorage.setItem("name.",name);
        // setValue({
        //     phone_number: pnumb,
        //     table_number: numb,
        //     first_name: name,
        //     items: JSON.parse(localStorage.getItem("cart"))
        // })
        console.log(value);
        
        
        alert("confirmed your order");

        axios.post('https://backend-res-fecn.onrender.com/enter',value).then(res => {
            if(res.status == 200){
                alert(res);
            }
        }


        ).catch((err)=>console.log(err));
        // Log localStorage item
      };
    
      function savenumb(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value; // Get the input value as a string
        const numericValue = parseInt(value); // Convert the string value to a number
    
        if (!isNaN(numericValue)) { // Check if the conversion is successful
            setNum(numericValue); // Set the number value to the state variable
            localStorage.setItem("tno.", numericValue.toString()); // Store the number value in localStorage
        } else {
            // Handle the case where the input value is not a valid number
            console.error("Invalid input value:", value);
        }
    
        setValue({
            "phone_number": pnumb?.toString() ?? '', // Convert pnumb to string or use an empty string if undefined
            "table_number": numb?.toString() ?? '', // Convert numb to string or use an empty string if undefined
            "first_name": name,
            "items": cart
        });
        
        
    }
    
    
    function savePnumb(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value;
        setPnumb(newValue); // Corrected function name
        localStorage.setItem("pno.", newValue);
        
        setValue({
            "phone_number": newValue ? newValue.toString() : "", // Handle undefined case
            "table_number": numb ? numb.toString() : "", // Handle undefined case
            "first_name": name,
            "items": cart
        });
    }
    
    
    function savename(e: React.ChangeEvent<HTMLInputElement>) {
        setname(e.target.value);
        localStorage.setItem("ne.", e.target.value);
    
        setValue({
            "phone_number": pnumb?.toString() ?? '', // Convert pnumb to string or use an empty string if undefined
            "table_number": numb?.toString() ?? '', // Convert numb to string or use an empty string if undefined
            "first_name": name,
            "items": cart
        });
        
    }
    
    return(
            <>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive' }}>
                        Confirm Your Order
                    </div>
                    <div style={{ display: 'flex',"flexDirection":"column","margin":"25px 0", justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontFamily: 'cursive' }}>
                        <div>
                        Enter Your Table Number

                        </div>
                        <div >
                        <input onChange={(e)=>savenumb(e)} style={{"fontSize":"20px"}}  type="number"></input>
                        </div>

                    </div>
                    <div style={{ display: 'flex',"flexDirection":"column","margin":"25px 0", justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontFamily: 'cursive' }}>
                        <div>
                        Enter Your Phone Number

                        </div>
                        <div >
                        <input onChange={(e)=>savePnumb(e)} style={{"fontSize":"20px"}}   type="number"></input>
                        </div>

                    </div>
                    <div style={{ display: 'flex',"flexDirection":"column","margin":"25px 0", justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontFamily: 'cursive' }}>
                        <div>
                        Additional Request To Chef

                        </div>
                        <div >
                        <input onChange={(e)=>savename(e)} style={{"fontSize":"20px"}}  type="text"></input>
                        </div>

                    </div>
                    <div style={{ display: 'flex',"flexDirection":"column", justifyContent: 'center', alignItems: 'center', fontSize: '25px', fontFamily: 'serif',"fontWeight":"800" }}>
                    Add some sweetness 
                    <span style={{ display: 'flex',"flexDirection":"column","margin":"20px 0", justifyContent: 'center', alignItems: 'center', fontSize: '25px', fontFamily: 'cursive' }}>
                        For Your very <span style={{"color":"violet","fontSize":"35px"}}>Special Ones</span> 
                    </span>
                    </div>
                    <div>
                    <div style={{"display":"flex","flexWrap":"wrap","justifyContent":"center","alignItems":"center","gap":"80px","margin":"40px 0"}}>
        {items.map((item) => item.type == 'dessert' ? (
            <Card key={item.id} sx={{ maxWidth: 345 }}>
              <div style={{"display":"flex","justifyContent":"space-between","alignContent":"center","alignItems":"center"}}>
                <CardHeader
                  title={`${item.name}`}
                />
                                    <div onClick={() => handleAddToCart({
                            id: parseInt(item.id),
                            name: item.name,
                            img: item.img,
                        })} style={{"cursor":"pointer"}}>


                  <CardHeader
                    title={<ShoppingCartIcon/>}
                    subheader="Add To Cart"
                  />
                </div>
              </div>
              <CardMedia component="img" height="194" image ={item.img} alt="Paella dish" />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
              </CardActions>
            </Card>
          ):[] )}
      </div><br></br><br></br><br></br><br></br>


                        
        </div>
                    
            <Link href="/lastpage" style={{ 'display': 'flex',"width":"100%","bottom":"0","position":"fixed","textDecoration":"none","cursor":"pointer","backgroundColor":"whitesmoke" ,'justifyContent': 'space-around', 'alignItems': 'center', 'fontFamily': 'cursive'}}>


                    <div style={{ 'display': 'flex',"textDecoration":"none","flexDirection":"column","cursor":"pointer","backgroundColor":"whitesmoke" , 'alignItems': 'center', 'fontFamily': 'cursive'}}>
                            <div>
                                <AddTaskTwoToneIcon/>
                            </div>
                            <div onClick={()=>sendProps(numb)} style={{"fontFamily":"cursive","fontWeight":"800","fontSize":"25px"}}>
                                confirm Order
                            </div>
                    </div>





                <div onClick={()=>localStorage.setItem("cart", JSON.stringify(cart))}>
                    <Link href="/cart"  style={{"textDecoration":"none","flexDirection":"column","display":"flex","fontSize":"25px","cursor":"pointer","backgroundColor":"#f5f5f5","height":"80px","justifyContent":"center","alignItems":"center"}}>
                        <FastfoodIcon/>
                
                        <div>
                            Your Dishes
                        </div>
                    </Link>
                </div>

            </Link>

                    
         </div>

            </>
    );
};

export default confirmorder;
