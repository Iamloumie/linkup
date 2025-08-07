// This is a NEXTJS server action that creates a user
'use server';

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "../mongodb/database";
import User from "../mongodb/database/models/user.model";
import Order from "../mongodb/database/models/order.model";
import Event from "../mongodb/database/models/event.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

// This function creates a new user in the database
export const createUser = async (user: CreateUserParams) => {
    try {
        await connectToDatabase();

        // For Mongoose 8.x, be explicit with the create method
        const newUser = await User.create([user]);

        return JSON.parse(JSON.stringify(newUser[0]));

    } catch (error) {
        handleError(error);
    } 
}

// THIS FUNCTION GETS USER ID  
export async function getUserById(userId: string) {
    try {
        await connectToDatabase();

        // Use exec() for better type inference in Mongoose 8.x
        const user = await User.findById(userId).exec();

        if (!user) throw new Error('User not found');
        
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}

// THIS FUNCTION UPDATES THE USER
export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate(
            { clerkId }, 
            user, 
            { new: true }
        ).exec();
        
        if (!updatedUser) throw new Error('User update failed');

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

// THIS FUNCTION DELETES THE USER BY ID
export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();

        const userToDelete = await User.findOne({ clerkId }).exec();

        if (!userToDelete) throw new Error('User not found');

        // unlink relationships
        await Promise.all([
            // update the 'events' collection to remove references to the user
            Event.updateMany(
                { _id: { $in: userToDelete.events || [] } },
                { $pull: { organizer: userToDelete._id } }
            ).exec(),

            // update the 'orders' collection to remove references to the user
            Order.updateMany(
                { _id: { $in: userToDelete.orders || [] } },
                { $unset: { buyer: 1 } }
            ).exec()
        ]);

        // delete the user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id).exec();
        revalidatePath('/');

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;

    } catch (error) {
        handleError(error);
    }
}