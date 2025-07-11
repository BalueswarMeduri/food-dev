import React, { useContext } from 'react';
import './FoodIteam.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodIteam = ({ id, name, price, description, image }) => {

    const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-iteam-image' src={url+"/images/"+image} alt="" />
                {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className='food-iteam-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="foot-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-dscs">
                    {description}
                </p>
                <p className="food-item-price">
                    ${price}
                </p>
            </div>
        </div>
    );
};

export default FoodIteam;
