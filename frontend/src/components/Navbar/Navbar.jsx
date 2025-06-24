import React, { useContext, useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setshowlogin }) => {
    const [menu, setmenu] = useState("home");
    const { getTotalCartAmount,token, setToken } = useContext(StoreContext);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef();

    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate('/');
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='navbar'>
            <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-down' onClick={() => setmenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setmenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token?

                <button onClick={() => setshowlogin(true)}>sign-in</button>
                :
                <div className='navbar-profile' ref={profileRef}>
                    <img src={assets.profile_icon} alt="" onClick={() => setProfileOpen((prev) => !prev)} style={{cursor:'pointer'}} />
                    {profileOpen && (
                    <ul className="nav-profile-dropdown">
                        <li onClick={() => {navigate('/orders'); setProfileOpen(false);}}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                        <hr />
                        <li onClick={() => {logout(); setProfileOpen(false);}}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                    </ul>
                    )}
                </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
