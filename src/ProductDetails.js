import React, { useEffect, useRef, useState } from "react";
import ProductsView from "./ProductsView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import ProductModel from "./ProductModel";
import ColorOption from "./ColorOption";
import { useDispatch, useSelector } from 'react-redux';
import { updateImage } from "./Redux/ImageSlice";
import axios from "axios";
import { updateColor } from "./Redux/ColorSlice";
import Dropdown from "./Dropdown";
import { addtoBasket } from "./Redux/BasketSlice";
import { toggleAlert, updateContent } from "./Redux/AlertSlice";
function ProductDetails() {
    const refProduct = useRef();
    const [product, setProduct] = useState([]);
    const [Loaded, setLoaded] = useState(false);
    const [productImages, setProductImages] = useState([]);
    const [productColors, setProductColors] = useState([]);
    const [isPicLoaded, setIsPicLoaded] = useState(false);
    const dispatch = useDispatch();
    const Image = useSelector(state => state.Image.selectedImage);
    const Color = useSelector(state => state.Color.selectedColor);
    const ColorHex = useSelector(state => state.Color.selectedColorHex);
    const Size = useSelector(state => state.Size.selectedSize);
    const Basket = useSelector(state => state.Basket.products);
    let { id } = useParams();

    useEffect(() => {
        window.scrollTo({
            top: refProduct.current.offsetTop,
            behavior: "smooth",
        });
        const getPics = async () => {
            try {
                await axios.get(`http://127.0.0.1:8000/api/products/${id}`).then(res => {
                    setProduct(res.data.product);
                    setProductImages(res.data.product.image.split(","));
                    console.log(res.data.colors);
                    setProductColors(res.data.colors);
                    dispatch(updateImage(res.data.product.image.split(",")[0]));
                    dispatch(updateColor({ color: "", hex: "" }));
                    setLoaded(true);
                })
            } catch (err) {
            }
        }
        getPics();
    }, [id]);
    const HandleLoad = () => {
        setIsPicLoaded(true);
        console.log(isPicLoaded);
    }
    const HandleAdd = () => {
        var Exists = false;
        Basket.every((element) => {
            if (element.name == product.name) {
                if (element.size == Size && element.color == ColorHex) {
                    Exists = true;
                    return false;
                }
            }
            return true;
        });
        if (!Exists) {
            dispatch(addtoBasket({ image: Image, name: product.name, quantity: 1, size: Size, color: ColorHex, price: product.price }));
            dispatch(updateContent("Item added to Basket"));
            dispatch(toggleAlert());
            setTimeout(() => { dispatch(toggleAlert()) }, 2000);
        }
    }
    return (
        <div ref={refProduct} className="flex flex-col justify-center items-center pt-16 sm:px-24">
            <div className="flex flex-col w-full px-14 py-10">
                <Link to="/Shop" className="self-start p-5">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span className="font-[AwanZaman] text-2xl pl-2">Back to Shop</span>
                </Link>
                <div className="flex border-[0.1px] border-solid border-[#c5c5c5] flex-wrap">
                    {Loaded ? <><div className="flex w-full lg:flex-col lg:w-[160px] border-b-[0.1px] lg:border-r-[0.1px] border-solid border-[#c5c5c5] p-[0.6rem]">
                        {productImages.map((item) => {
                            return <ProductModel imgsrc={item}></ProductModel>
                        })}
                    </div>
                        <div className="relative flex justify-center min-w-[450px] min-h-[570px] max-w-[500px] max-h-[600px] items-center w-full lg:w-auto bg-[#F8F8F8]">
                            {Color !== "" ? <input type="color" value={`${ColorHex}`} className="absolute top-0 left-0 w-full h-full mix-blend-hue" disabled></input> : null}
                            {isPicLoaded ? null : <FontAwesomeIcon className="text-3xl" icon={faSpinner} spin />}
                            <img onLoad={HandleLoad} className="box-content" src={Image}></img>
                        </div>
                        <div className="flex  flex-col py-5 px-8 items-start w-full lg:w-2/5">
                            <br></br>
                            <h6 className="font-[AwanZaman] font-semibold text-base text-[#818181]">{product.collection_name}</h6>
                            <h1 className="font-[MaiseeMedium] text-4xl mb-4">{product.name}</h1>
                            <p className="text-left font-[AwanZaman] font-semibold text-[#4A4A4A] mt-2">{product.details}</p>
                            <hr className="w-full my-5" />
                            <div className="flex flex-col w-full items-start">
                                <label htmlFor="lens" className="font-[AwanZaman] font-semibold text-sm text-[#818181] tracking-wider mb-4">Lens Width and Frame Size</label>
                                <Dropdown></Dropdown>
                                {productColors.length !== 0 ? <label htmlFor="color" className="font-[AwanZaman] font-semibold text-sm text-[#818181] tracking-wider">Choose Color</label> : null}
                                <div className="flex w-3/4 my-4 relative">
                                    {productColors.map((item, pos) => {
                                        return <ColorOption key={pos} pos={pos} isClicked={Color === pos ? true : false} color={item.color_hex}></ColorOption>
                                    })}
                                </div>
                                <h1 className="font-[MaiseeMedium] text-4xl my-5">${product.price}</h1>
                                <button onClick={HandleAdd} className="text-sm font-[FallingSkyRegular] text-white py-[0.7rem] px-4 bg-black border-2 border-black hover:bg-[#2A2A2A] duration-300 hidden lg:block mb-3">Add to Basket</button>
                            </div>
                        </div></> : <div className="flex min-h-[570px] w-full justify-center items-center"><FontAwesomeIcon className="text-4xl" icon={faSpinner} spin /></div>}
                </div>
            </div>
            <ProductsView link="/Recommended" section="Recommended Products"></ProductsView>
        </div>
    );
}
export default ProductDetails;