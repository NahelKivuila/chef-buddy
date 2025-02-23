"use server";
import {zodResponseFormat} from "openai/helpers/zod";
import {RecipeJson, RecipeResponse} from "@/model/recipe";
import OpenAI from "openai";
import {RateLimiter} from "@/services/rateLimiterTokenBucket";
import {redirect} from "next/navigation";
import {toast} from "sonner";

const rateLimiter = new RateLimiter({refillRate: 60000, maxTokens: 1});
const id = 'token'
const openai = new OpenAI();


function getCompletion(prompt: string) {
    return openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: prompt
            },
        ],
        response_format: zodResponseFormat(RecipeResponse, "recipe_json")
    });
}

export async function callApi(prompt: string): Promise<RecipeJson | null> {
    const isRateLimited = rateLimiter.limit(id);

    if (isRateLimited) {
        redirect('/no-more-call')
    }
    const completion = await getCompletion(prompt);

    const recipeResponse = completion.choices[0].message;

    if (recipeResponse.refusal) {
        toast.error("Un problème est survenu, veuillez réessayer ou me contacter si cela persiste")
        return null;
    }

    return recipeResponse.parsed;
}