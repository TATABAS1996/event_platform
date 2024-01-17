import * as z from "zod"

// This is a validator for the event form to show what is needed from the user:
export const eventFormSchema = z.object({
    title: z.string().min(3, "Too short, must be atleast 3 characters. "),
    description: z.string().min(3, "Too short, must be atleast 3 characters. ").max(400, "Too long, must be less than 400 characters. "),
    location: z.string().min(3, "Too short, must be atleast 3 characters. ").max(400, "Too long, must be less than 400 characters. "),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
  })