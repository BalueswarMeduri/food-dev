import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Helper: Create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Basic field validation
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10); // ✅ Added await here
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({
            success: true,
            token,
            message: "User registered successfully",
        });

    } catch (error) {
        console.log("Registration Error:", error);
        res.status(500).json({
            success: false,
            message: "Error during registration",
        });
    }
};

// Login User (still empty)
const loginUser = async (req, res) => {
    // to be implemented
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User does not exists"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success : false, message : "Invalid credentials"});
        }
        const token = createToken(user._id);

        res.json({success:true, token});

    } catch (error) {
        console.log(error);
        res.json({success : false, message : "Error in login"})
        
    }
};

export { loginUser, registerUser };
