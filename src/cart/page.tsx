"use client"
import * as React from "react";
import './cart.css';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Link from "next/link";
export default function Cart(){
    return(
        <>
        
            <Link href="/cart"  style={{"width":"100%","textDecoration":"none","cursor":"pointer","position":"fixed","bottom":"0","backgroundColor":"#f5f5f5","height":"80px","marginTop":"50px","display":"flex","justifyContent":"center","alignItems":"center"}}>
                <FastfoodIcon/>
                
                <div>
                    Your Dishes
                </div>
            </Link>
            
        </>
    );
}