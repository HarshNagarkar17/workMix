import { z } from "zod";

export const articleSchema = () => z.object({
    title:z.string().refine((data) => data.trim() !== "", {message:"title is required"}),
    description:z.string().refine((data) => data.trim() !== "", {message:"description is required"}),
    content:z.string().refine((data) => data.trim() !== "", {message:"content is required"}),
})
