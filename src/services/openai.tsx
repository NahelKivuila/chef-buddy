"use server";
import {zodResponseFormat} from "openai/helpers/zod";
import {RecipeJson, RecipeResponse} from "@/model/recipe";
import OpenAI from "openai";
import {RateLimiter} from "@/services/rateLimiterTokenBucket";

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

export async function callApi(request: string): Promise<RecipeJson | null> {
    const isRateLimited = rateLimiter.limit(id);
    console.log(isRateLimited)

    if (isRateLimited) {
        // TODO : add messageService to print too many
        console.log('too many');
        return null;
    }
    const completion = await getCompletion(request);
    console.log(request)




    const recipeResponse = completion.choices[0].message;

    if (recipeResponse.refusal) {
        // TODO : handle the refusal with a message service
        return null;
    }

    return recipeResponse.parsed;
}