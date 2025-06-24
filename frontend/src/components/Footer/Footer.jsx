import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id = "footer">
        <div className="footer-content">
            <div className="footer-contect-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut ad deleniti ipsa nostrum odio. Obcaecati perspiciatis aut omnis aliquam reprehenderit necessitatibus tenetur beatae voluptatum deleniti non, eum quasi, recusandae ut.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-middle">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                        <li>+91 345634534</li>
                        <li>contact@gmail.com</li>    
                    </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            copyright 2025 @ All right reserved by <span>Foodie</span>
        </p>
    </div>
  )
}

export default Footer