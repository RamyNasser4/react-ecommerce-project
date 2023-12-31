import React, { useEffect, useState } from "react";
import ShopCard from "../../Components/Shop/ShopCard";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { closeBasket, updateClickable } from "../../Redux/BasketSlice";
function Shop() {
    const [Loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    dispatch(closeBasket(false));
    dispatch(updateClickable(true));
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/products").then(res => {
            setProducts(res.data.products);
            setLoaded(true);
        });
    }, []);
    return (
        <div className="grid gap-3 min-h-[calc(100vh-72px)] grid-cols-[repeat(auto-fit,minmax(160px,1fr))] py-[15vh] px-28">
            {Loaded ? products.map((item) => {
                var imgs = item.image.split(",");
                return <ShopCard Name={item.name} desc={item.collection_name} price={item.price} imgsrc={item.image.substring(0,4)!="http" ? item.image : imgs[0]} key={item.id} id={item.id} color={item.colors[0] ? item.colors[0].color_hex : ""}></ShopCard>
            }) : <div className="w-full h-full flex justify-center items-center"><FontAwesomeIcon className="text-4xl" icon={faSpinner} spin /></div>}
        </div>
    );
}

/* } */
export default Shop;