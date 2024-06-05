"use client"
import React, {useState, useEffect} from 'react';
 // Import useHistory
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Cart from "@/cart/page";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import { items } from '../data';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeReviewCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({ category: '', keyword: '', type: '' });
  const [cart, setCart] = useState([]);
  const router = useRouter();
 // Initialize useHistory
    useEffect(()=>{
        const prevItems = JSON.parse(localStorage.getItem("cart")) || [] ;
        if(prevItems.length !=0){
            setCart(prevItems);
        }
        
    },[]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    alert(`Added ${item.name} to cart`);
  };
  function sendProps(){
    alert("See Your Cart"); // Log cart state
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart stored in localStorage:", localStorage.getItem("cart")); // Log localStorage item
  };
  
  

  return (
    <>
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <select style={{"height":"50px"}} value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
          <option value="">All Categories</option>
          {Array.from(new Set(items.map((item) => item.category))).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select style={{"height":"50px"}} value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)}>
          <option value="">All Types</option>
          {Array.from(new Set(items.map((item) => item.type))).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div style={{"display":"flex","flexWrap":"wrap","justifyContent":"center","alignItems":"center","gap":"80px","margin":"40px 0"}}>
        {items
          .filter((item) => (!filters.category || item.category === filters.category) &&
                             (!filters.type || item.type === filters.type) &&
                             (!filters.keyword || item.name.toLowerCase().includes(filters.keyword.toLowerCase())))
          .map((item) => (
            <Card key={item.id} sx={{ maxWidth: 345 }}>
              <div style={{"display":"flex","justifyContent":"space-between","alignContent":"center","alignItems":"center"}}>
                <CardHeader
                  title={`${item.name}`}
                />
                <div onClick={() => handleAddToCart(item)} style={{"cursor":"pointer"}}>
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
                </Typography><br></br>
                <Typography style={{"fontWeight":"700"}} variant="body2" color="black">
                   Price: {item.price} Rs
                </Typography>
              </CardContent>
              
              <CardActions disableSpacing>
              </CardActions>
            </Card>
          ))}
      </div><br></br><br></br><br></br><br></br><br></br><br></br>
      {/* Display cart items here */}
      <div onClick={()=>sendProps()}>
      <Cart/>
      </div>
      
      </>
    </>
  );
};

export default RecipeReviewCard;
