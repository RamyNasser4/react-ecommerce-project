import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
class Header extends Component {
    state = {
        Headeractive: false
    }
    classes = classNames({
        'bg-white': true,
        'flex-col': true,
        'items-start': true,
        'duration-100': true,
        'overflow-hidden' :true,
        'leading-none': true,
        'invisible' : true,
        'p-0': true,
        'h-0' : true,
        'flex': false,
    });
    active = classNames({
        'bg-white': true,
        'flex-col': true,
        'items-start': true,
        'duration-500': true,
        'overflow-hidden' :true,
        'leading-none': true,
        'p-4' : true,
        'h-fit' : true,
        'flex': true,
    });
    navclasses = classNames({
        'text-lg': true,
         'font-[AwanZaman]' : true,
         'text-white': true
    });
    navactive = classNames({
        'text-lg': true,
         'font-[AwanZaman]' : true
    });
    onClickBar = () => {
        if (this.state.Headeractive) {
            this.setState({ Headeractive: false });
        } else {
            this.setState({ Headeractive: true });
        }
        
    }
    render() {
        return (
            <div className="w-[100%] flex flex-col fixed z-10">
                <div className="w-[100%] px-8 py-2 flex justify-between bg-white ">
                    <div className="w-[30%] flex justify-between items-center align-middle">
                        <a className="text-4xl mt- py-2 px-3 font-[AwanZaman]">Logo</a>
                        <a href="/" className="text-lg py-2 px-3 hover:bg-[#F5F5F5] duration-300 font-[AwanZaman] hidden sm:block">Home</a>
                        <a className="text-lg py-2 px-3 hover:bg-[#F5F5F5] duration-300 font-[AwanZaman] hidden sm:block">Shop</a>
                        <a className="text-lg py-2 px-3 hover:bg-[#F5F5F5] duration-300 font-[AwanZaman] hidden sm:block">Featured</a>
                        <a className="text-lg py-2 px-3 hover:bg-[#F5F5F5] duration-300 font-[AwanZaman] hidden sm:block">Recommended</a>
                    </div>
                    <div className="w-[13%] flex justify-between items-center">
                        <FontAwesomeIcon icon={faBagShopping} className="text-2xl" />
                        <FontAwesomeIcon icon={faBars} className="text-2xl sm:hidden px-4" onClick={this.onClickBar} />
                        <a className="text-lg font-[AwanZaman] text-white py-1 px-4 bg-black border-2 border-black hidden sm:block" href="/Signup">Sign up</a>
                        <a className="text-lg font-[AwanZaman] text-[#907F7D] py-1 px-4 bg-[#F2F2F2] border-2 hidden sm:block" href="/Signin">Sign in</a>
                    </div>
                </div>
                <div className={this.state.Headeractive ? this.active : this.classes}>
                    <a href="/" className={this.state.Headeractive ? this.navactive : this.navclasses}>Home</a>
                    <a className={this.state.Headeractive ? this.navactive : this.navclasses}>Shop</a>
                    <a className={this.state.Headeractive ? this.navactive : this.navclasses}>Featured</a>
                    <a className={this.state.Headeractive ? this.navactive : this.navclasses}>Recommended</a>
                </div>
            </div>

        );
    }

}
export default Header;