"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export default function page() {
  return (
    <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"100%","height":"100vh","flexWrap":"wrap"}}>
        <div >
        <Image src="/Menue.jpg" width={400} height={400} alt='blue diamond'></Image>
        </div>
        <div>
        <Image src="/logo.jpg" width={500} height={400} alt='blue diamond'></Image>
        </div>
        <Link href="/home" style={{"cursor":"pointer"}}>
        <Image src="/order.jpg" width={500} height={400} alt='blue diamond'></Image>
        </Link>
    </div>
  )
}