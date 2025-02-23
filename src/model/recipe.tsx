import {z} from "zod";

export interface RecipeJson {
    title: string;
    ingredients: {
        quantity: number;
        unit: string;
        name: string;
    }[];
    steps: string[];
}

const Ingredient = z.object({
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
})

export const RecipeResponse = z.object({
    title: z.string(),
    ingredients: z.array(Ingredient),
    steps: z.array(z.string())
})