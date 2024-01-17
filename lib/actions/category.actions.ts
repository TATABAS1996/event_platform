'use server'

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabse } from "../database"
import Category from "../database/models/category.model"


// create a new category
export const createCategory = async ({categoryName}: CreateCategoryParams) => {
    try {
        await connectToDatabse();

        const newCategory = await Category.create({name: categoryName});

        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        handleError(error)
    }
}
// get all categories available
export const getAllCategories = async () => {
    try {
        await connectToDatabse();

        const categories = await Category.find();

        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        handleError(error)
    }
}