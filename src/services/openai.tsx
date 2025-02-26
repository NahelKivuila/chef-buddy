'use server';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { RecipeJson, RecipeResponse } from '@/model/recipe';
import { RateLimiter } from '@/services/rateLimiterTokenBucket';

const rateLimiter = new RateLimiter({ refillRate: 60000, maxTokens: 10 });
const id = 'token';
const openai = new OpenAI();

function getCompletion(prompt: string) {
    return openai.beta.chat.completions.parse({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'user',
                content: prompt,
            },
        ],
        response_format: zodResponseFormat(RecipeResponse, 'recipe_json'),
    });
}

export async function callApi(
    prompt: string
): Promise<RecipeJson | { status: number } | null> {
    const isRateLimited = rateLimiter.limit(id);

    if (isRateLimited) {
        return { status: 429 };
    }
    const completion = await getCompletion(prompt);

    const recipeResponse = completion.choices[0].message;

    if (recipeResponse.refusal) {
        return { status: 500 };
    }

    return recipeResponse.parsed;
}
