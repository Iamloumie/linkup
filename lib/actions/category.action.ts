"use server";

import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";
import { connect } from "http2";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";

// Allowing the server to handle the creation of a category
export const createCategory = async ({categoryName}: CreateCategoryParams) => {
    try {
        await connectToDatabase();

        const newCategory = await Category.create({ name: categoryName });

        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        handleError(error)
        
    }
}

// Allowing the server to fetch all categories
export const getAllCategories = async () => {
    try {
        await connectToDatabase();

        const categories = await Category.find();

        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        handleError(error)
        
    }
}