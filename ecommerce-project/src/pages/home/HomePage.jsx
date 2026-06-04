import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react'
import Header from '../../components/Header';
import {ProductsGrid} from './ProductsGrid';
import './HomePage.css';

function HomePage({cart, loadCart}) {

    // fetch('http://localhost:3000/api/products')
    //     .then((response) =>{
    //         return response.json()
    //     }).then((data)=>{
    //         console.log(data)
    //     });

    const [products, setProducts] = useState([])

    useEffect(() =>{
        const getHomeData = async () =>{
            const response = await axios.get('/api/products')
            setProducts(response.data)
        }

        getHomeData();
    },[])

    

    return (
        <>

            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    )
}

export default HomePage;
