import { createContext, useEffectEvent, useState } from "react";
import { useEffect } from "react";
export const CartContext=createContext()
const CartProvider=({children})=>{
   
   const [cart,setCart]=useState(()=>{
    const updatedCart=localStorage.getItem("cart")
    return updatedCart?JSON.parse(updatedCart):[]

   })
 useEffect(()=>{
localStorage.setItem("cart",JSON.stringify(cart))
 },[cart])
    const addToCart=(product)=>{
    const existedCart=cart.find((item)=>{
        return item._id===product._id
    })
    if(existedCart){
        const updatedCart=cart.map((item)=>{
            if(item._id===product._id){
                return {
                    ...item,
                    quantity:item.quantity+1
                }
            }
            return item
        })
        setCart(updatedCart)
    }
    else{
    
        setCart([...cart,{...product,quantity:1}])
    }
    
}
const deleteItem=(product)=>{
    const existedCart=cart.find((item)=>item._id===product._id)
    if(existedCart.quantity!==1){
        const updatedCart=cart.map((item)=>{
            if(item._id===product._id){
                return {
                    ...item,
                    quantity:item.quantity-1
                }
            }
            return item;
        })
        setCart(updatedCart)

    }
    else{
        const updatedCart=cart.filter((item)=>{
            return item._id!==product._id
        })
        setCart(updatedCart)
    }

}
const totalItems=cart.reduce((total,item)=>{
return total+item.quantity
},0)
return(
<CartContext.Provider value={
    {
        cart,setCart,addToCart,totalItems,deleteItem
    }
}>{children}</CartContext.Provider>
)}
export default CartProvider