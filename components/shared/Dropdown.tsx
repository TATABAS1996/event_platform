import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from "../ui/input";
import { createCategory, getAllCategories } from "@/lib/actions/category.actions";




type DropdownProps = {
    // question mark after a property name means it is optional
    value?: string;
    // function that takes no arguments and returns nothing
    onChangeHandler?: () => void;
}
// dropdown component that takes in a value and onChangeHandler function as props and returns a dropdown component
const Dropdown = ({value, onChangeHandler}: DropdownProps) => {
    
    // create a state variable to hold our categories and a function to update it. ICategory is a type that we created in models/category.model.ts
    // can select existing category or create new one:
    const [categories,setCategories] = useState<ICategory[]>([])
    const [newCategory,setNewCategory] = useState('');

    const handleAddCategory = () => {
        createCategory({
            categoryName: newCategory.trim(),
        })
        .then((category) => {
            setCategories((prevState)=> [...prevState,category])
        })
    }

    useEffect(() => {
        const getCategories = async () => {
            const categoriesList = await getAllCategories();

            categoriesList && setCategories(categoriesList as ICategory[]);
        }
        getCategories();
    }, [])
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>

            {/* map over our own cats, cats will be created dynamically */}
            {categories.length > 0 && categories.map((category) => (
                <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
                    {category.name}
                </SelectItem>
            ))}

            <AlertDialog>
                <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-orimary-500 hover:bg-primary-50 focus:text-primary-500'>Add New Category</AlertDialogTrigger>
                <AlertDialogContent className='bg-white'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>New Category</AlertDialogTitle>
                        <AlertDialogDescription>
                            <Input type="text" placeholder="Category name" 
                            className="input-field mt-3" onChange={(e) =>
                                setNewCategory(e.target.value)}/>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </SelectContent>
    </Select>

  )
}

export default Dropdown