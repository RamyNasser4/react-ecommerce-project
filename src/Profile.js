import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
function Profile() {
    const [Loaded, setLoaded] = useState(false);
    const [isPicLoaded, setIsPicLoaded] = useState(false);
    const [user, setUser] = useState("");
    let { id } = useParams();
    const [active, setActive] = useState("Account");
    useEffect(() => {
        const getData = async () => {
            const token = Cookies.get("_auth");
            try {
                await axios.get(`http://127.0.0.1:8000/api/user/${id}`, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "Application/json",
                        Authorization: `Bearer ${token}`,
                        'Accept': "application/json"
                    }
                }).then(res => {
                    setUser(res.data);
                    console.log(res.data);
                    setLoaded(true);
                })
            } catch (err) {

            }
        }
        getData();
    }, [id]);
    const HandleLoad = () => {
        setIsPicLoaded(true);
    }
    return (
        <div className="flex flex-col justify-center items-center py-40 sm:px-24">
            {Loaded ? <> <div className="flex w-1/2 bg-[#F2F2F2] border-[0.1px] border-[#c5c5c5]" >
                <div className="flex relative bottom-[-2px]">
                    <div onClick={() => { setActive("Account") }} style={active == "Account" ? { color: "#4A4A4A", backgroundColor: "white", borderBottom: "1px solid white" } : null} className="font-[AwanZaman] font-semibold text-[#818381] border-b-transparent border-b-[1px] border-b-solid hover:bg-[#F9F9F9] duration-300 cursor-pointer ml-8 text-xl px-3 py-4">Account</div>
                    <div onClick={() => { setActive("My Wish List") }} style={active == "My Wish List" ? { color: "#4A4A4A", backgroundColor: "white", borderBottom: "1px white" } : null} className="font-[AwanZaman] font-semibold text-[#818381] hover:bg-[#F9F9F9] duration-300 cursor-pointer text-xl px-3 py-4">My Wish List</div>
                    <div onClick={() => { setActive("My Orders") }} style={active == "My Orders" ? { color: "#4A4A4A", backgroundColor: "white", borderBottom: "1px white" } : null} className="font-[AwanZaman] font-semibold text-[#818381] hover:bg-[#F9F9F9] duration-300 cursor-pointer text-xl px-3 py-4">My Orders</div>
                </div>
            </div>
                <div className="flex border-[0.1px] border-[#c5c5c5] flex-col p-4 bg-white w-1/2 items-start pb-20">
                    <img className="h-40 w-full" src={user.cover_img}></img>
                    <div className="flex justify-between items-center px-2 relative bottom-12 w-full">
                        <img className="box-content object-cover w-[100px] h-[100px] rounded-full border-2 border-white" src={user.profile_img}></img>
                        <button className="text-sm font-[FallingSkyRegular] text-white py-[0.7rem] px-4 bg-black border-2 border-black hidden lg:block mb-3">Edit Account</button>
                    </div>
                    <div className="flex flex-col items-start w-full px-5">
                        <div className="font-[AwanZaman] text-4xl my-4 text-[#1A1A1A]">{user.name}</div>
                        <p className="font-[AwanZaman] text-lg text-[#6D6C6D]">Email</p>
                        <p className="font-[AwanZaman] text-lg text-[#1A1A30] my-4">{user.email}</p>
                        <p className="font-[AwanZaman] text-lg text-[#6D6C6D]">Address</p>
                        <p className="font-[AwanZaman] text-lg text-[#818381] my-4"><i>{user.address}</i></p>
                        <p className="font-[AwanZaman] text-lg text-[#6D6C6D]">Mobile</p>
                        <p className="font-[AwanZaman] text-lg text-[#818381] my-4"><i>{user.phone_number}</i></p>
                        <p className="font-[AwanZaman] text-lg text-[#6D6C6D]">Date Joined</p>
                        <p className="font-[FallingSkyRegular] text-base text-[#1A1A30] my-4">{user.created_at.split("T")[0]}</p>
                    </div>
                </div> </> : <div className="w-full h-[calc(75vh-20rem)] flex justify-center items-center"><FontAwesomeIcon className="text-3xl" icon={faSpinner} spin></FontAwesomeIcon></div>}
        </div >

    );
}
export default Profile;