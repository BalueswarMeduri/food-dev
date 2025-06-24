import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item controller
const addFood = async (req, res) => {
    try {
        // Make sure multer is used and the image is present
        const image_filename = req.file?.filename;

        if (!image_filename) {
            return res.status(400).json({
                success: false,
                message: "Image file is missing"
            });
        }

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
        });

        await food.save();

        res.json({
            success: true,
            message: "Food added successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to add food",
        });
    }
};

// all food list;

const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({
            success : true,
            data : foods
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message : "error in fetch the food list"
        })             
    }
}

// remove food item
const removedFood = async (req, res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{});

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({
            success:true,
            message : "food removed",
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message : "error in deleting"
        })
    }
}

export { addFood , listFood,removedFood };
