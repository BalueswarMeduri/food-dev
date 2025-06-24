import { createContext, useEffect, useState } from "react";
import axios from "axios"; // ✅ Missing import

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]); // ✅ Use this instead of imported food_list
    const [token, setToken] = useState("");
    const url = "http://localhost:4000";

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
        }));
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    };

    const removeFromCart = async (itemId) => {
    const updated = { ...cartItems };

    if (!updated[itemId]) return;

    updated[itemId] -= 1;
    if (updated[itemId] <= 0) {
        delete updated[itemId];
    }

    setCartItems(updated);

    if (token) {
        try {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        } catch (err) {
            console.error("Error removing from cart:", err);
        }
    }
};


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async(token)=>{
        const response = await axios.post(url + "/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(localStorage.getItem("token"));
            }
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
