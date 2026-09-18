import { useEffect } from "react";
import { createContext, useState } from "react";
export const ProductContext=createContext()

const ProductProvider=({children})=>{
    const [products,setProducts]=useState([])
   useEffect(() => {
        const getData = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/products`
            );

            const data = await response.json();
            setProducts(data);
        };

        getData();
    }, []);

    return(
        <ProductContext.Provider value={{products,setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}
export default ProductProvider;