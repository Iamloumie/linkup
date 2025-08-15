import { model } from "mongoose";
import { Document, models, Schema } from "mongoose";

export interface ICategory extends Document {
    _id: string;
    name: string;
}

// CREATE CATEGORY SCHEMA
const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
})


// TURN THE SCHEMA INTO A MODEL
const Category = models.Category || model('Category', CategorySchema);

export default Category;