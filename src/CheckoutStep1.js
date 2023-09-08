import React, { useState } from "react";
import CheckoutBar from "./CheckoutBar";
import { useSelector } from "react-redux";
import CartCard from "./CartCard";
import { faArrowRight, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import classNames from "classnames";
function CheckoutStep1(){
    const products = useSelector(state => state.Basket.products);
    const total = useSelector(state => state.Basket.total);
    const [classes,setClasses] = useState(classNames({
        'flex' : true,
        'flex-col' : true,
        'justify-center' : true,
        'items-center' : true,
        'w-full' : true,
        'py-40' : true,
        'sm:px-24' : true,
        'duration-700' : true,
        'translate-y-[10vh]' : true,
        'opacity-20' : true
    }));
    useEffect(() => {
        setClasses(classNames({
            'flex' : true,
            'flex-col' : true,
            'justify-center' : true,
            'items-center' : true,
            'w-full' : true,
            'py-40' : true,
            'sm:px-24' : true,
            'duration-700' : true
        }))
    },[]);
    return(
        <div className={classes}>
            <div className="w-2/3 flex flex-col justify-center items-center">
                <CheckoutBar step={1}></CheckoutBar>
            </div>
            <div className="font-[FallingSkyRegular] text-xl">Order Summary</div>
            <div className="font-[AwanZaman] font-semibold text-[#4A4A4A] my-4">Review items in your basekt.</div>
            <div className="flex flex-col w-3/5 my-2">
            {products.map((item,pos) =>{
                    return <CartCard id={pos} name={item.name} quantity={item.quantity} size={item.size} color={item.color} price={item.price} image={item.image}></CartCard>
                })}
            </div>
            <div className="flex flex-col w-[62%]">
                <div className="flex flex-col items-start self-end">
                    <span className="font-[AwanZaman] font-semibold text-[#4A4A4A]">Subtotal:</span>
                    <div className="text-3xl font-[FallingSkyRegular] my-4">${Math.floor(total) == total ? total + ".00" : total.toFixed(2)}</div>
                </div>
            </div>
            <div className="flex justify-between w-[62%] my-4">
                <Link to="/" className="text-lg font-[FallingSkyRegular] text-[#909190] py-4 px-4 bg-[#F2F2F2] border-[0.1px] border-[#c5c5c5] mb-3"><FontAwesomeIcon className="pr-2" icon={faStore} />Continue Shopping</Link>
                <Link to="/checkout/step2" className="text-lg flex items-center font-[FallingSkyRegular] text-white py-4 px-4 bg-black border-[0.1px] border-black mb-3">Next Step<FontAwesomeIcon className="pl-2" icon={faArrowRight}></FontAwesomeIcon></Link>
            </div>
        </div>
    );
}
export default CheckoutStep1;