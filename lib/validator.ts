import { z } from "zod";
// added the zod schema for form validation

export const eventFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5, "Description must be at least 5 characters").max(500, "Description must not exceed 500 characters"),
    location: z.string().min(3, "Location must be at least 3 characters").max(300, "Location must not exceed 300 characters"),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
});