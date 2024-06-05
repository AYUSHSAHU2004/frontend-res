"use client"
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Admin = () => {
    //const [itemsi, setItems] = useState([]);
    const [itemsi, setItems] = useState<{ table_number: string, items: { name: string, price: number }[], first_name: string }[]>([]);


   // const [selectedCard, setSelectedCard] = useState([]);
   const [selectedCard, setSelectedCard] = useState<number[]>([]);

    //const [sum,setSum] = useState();
    const [sum, setSum] = useState<number[]>([]);

    //const [totalsum,setTotalsum] = useState();
    const [totalsum, setTotalsum] = useState<number>(0);


    useEffect(() => {
        axios.get("https://backend-res-fecn.onrender.com/get")
            .then((res) => {
                setItems(res.data);
                
            })
            .catch((err) => console.log(err));
    }, [itemsi]);
    useEffect(() => {
        //CGANGE1 let newSums = [];
        let newSums: number[] = [];

        let totalsum: number = 0;
        // Initialize an array to store the new sums
        itemsi.forEach((item,index) => {
            let total = 0;
            
            // if (Array.isArray(item.items)) {
            //     item.items.forEach(food => {
            //         total += parseInt(food.price);
            //     });
            // }
            if (Array.isArray(item?.items)) {
                item.items.forEach(food => {
                    total += parseInt(food.price);
                });
            }
            newSums.push(total); // Push the calculated total to the newSums array
        });
        //setSum(newSums);
        setSum(newSums as number[]);

        newSums.forEach((price)=>{
            totalsum = price + totalsum;
        })
        setTotalsum(totalsum);
         // Update the sum state with the newSums array
    }, [itemsi]);
    
    

    const handleCardClick = (index : number) => {

       
        if (selectedCard.includes(index)) {
            localStorage.setItem("colorselect",JSON.stringify(selectedCard.filter(item => item !== index)));
            // If the index is already selected, remove it from the selectedCard array
            setSelectedCard(selectedCard.filter(item => item !== index));
            
            if(selectedCard){
                console.log(selectedCard);
            }
            
           
        } else {
            // If the index is not selected, add it to the selectedCard array

            setSelectedCard([...selectedCard, index]);
            localStorage.setItem("colorselect",JSON.stringify(selectedCard.filter(item => item !== index)));
            
            console.log(selectedCard,index);

        }
    };
    // useEffect(()=>{
    //     const colortrue = localStorage.getItem("colorselect");
    //     if(colortrue){
    //         setSelectedCard(colortrue);
    //     }
        
    // },[]);
    

    return (
        <>
            <div>
                <div style={{ display: 'flex',"color":"red" ,justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'cursive' }}>
                    Orders List
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'monospace' }}>
                    Your Total Income 
                </div><br></br>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'monospace' }}>
                    This Month
                </div><br></br>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', fontFamily: 'monospace' }}>
                     <span style={{"color":"red","fontWeight":"800"}}>{totalsum}Rs</span>
                </div>
                <div style={{ display: 'flex', margin: "80px 0", flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '80px' }}>
                    {itemsi.map((item, index) => (
                        <Card key={index} style={{ backgroundColor: selectedCard.includes(index) ? '#3DED97' : 'red', color: 'white',border:"2px solid black" }} sx={{ maxWidth: 345 }} onClick={() => handleCardClick(index)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <CardHeader title={`TableNo. ${item.table_number}`} />
                            </div>
                            <CardContent style={{ backgroundColor: selectedCard.includes(index) ? '#3DED97' : 'red', color:'white' }}>
                                
                                <Typography variant="body2" color="white">
                                    Orders :
                                </Typography>
                                {Array.isArray(item.items) ? (
                                    item.items.map((food, foodIndex) => (
                                       <>
                                        <Typography variant="body2" color="white" key={foodIndex}>
                                            {food.name} : {food.price}Rs
                                        </Typography>
                                        
                                    
                                       </>
                                       
                                    ))
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        Items data is not available or is not in the expected format.
                                    </Typography>
                                    
                                )}

                                <Typography variant="body2" color="white">
                                   Additional Request
                                 </Typography>

                                <Typography variant="body2" color="white">
                                    {item.first_name}
                                 </Typography>
                                
                                <Typography style={{"color":"white"}} variant="body2" color="text.secondary">
                                        Total Price:{sum[index]}Rs
                                    </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Admin;
