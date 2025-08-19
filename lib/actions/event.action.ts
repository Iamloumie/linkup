"use server";

import { CreateEventParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";

// THIS FILES CREATES THE HANDSHAKE BETWEEN THE FRONTEND AND BACKEND FOR UPLOADING FILES

export const createEvent = async ({ event, userId, path }: CreateEventParams) => {
    try {
        await connectToDatabase();

        // FIRST FIND OUT WHO THE ORGANIZER IS
        const organizer = await User.findById(userId);

        if (!organizer) {
            throw new Error("Organizer not found");
        }

        // IF ORGANIZER EXISTS, CREATE THE EVENT
        const newEvent = await Event.create({
            ...event,
            category: event.categoryId,
            organizer: userId
        });

        return JSON.parse(JSON.stringify(newEvent));

    } catch (error) {
        handleError(error);
        
    }
}