"use client";

import {useEffect, useState} from "react";
import Checkbox from "@/app/_component/checkbox";
import CustomListbox from "@/app/_component/customListbox";
import {RateLimiter} from "@/services/rateLimiterTokenBucket";
// import OpenAI from "openai";

const recipeResponse = "{\n" +
    "  \"title\": \"Poulet Sauté au Riz Parfumé\",\n" +
    "  \"ingredients\": [\n" +
    "    {\n" +
    "      \"quantity\": \"200\",\n" +
    "      \"unit\": \"g\",\n" +
    "      \"name\": \"riz\"\n" +
    "    },\n" +
    "    {\n" +
    "      \"quantity\": \"2\",\n" +
    "      \"unit\": \"pièces\",\n" +
    "      \"name\": \"escalopes de poulet\"\n" +
    "    },\n" +
    "    {\n" +
    "      \"quantity\": \"1\",\n" +
    "      \"unit\": \"c. à soupe\",\n" +
    "      \"name\": \"huile d'olive\"\n" +
    "    },\n" +
    "    {\n" +
    "      \"quantity\": \"1\",\n" +
    "      \"unit\": \"c. à café\",\n" +
    "      \"name\": \"curcuma\"\n" +
    "    },\n" +
    "    {\n" +
    "      \"quantity\": \"1\",\n" +
    "      \"unit\": \"c. à café\",\n" +
    "      \"name\": \"paprika\"\n" +
    "    },\n" +
    "    {\n" +
    "      \"quantity\": \"1\",\n" +
    "      \"unit\": \"gousse\",\n" +
    "      \"name\": \"ail\"\n" +
    "    },\n" +
    "    {\n" +
    "      \"quantity\": \"1\",\n" +
    "      \"unit\": \"pièce\",\n" +
    "      \"name\": \"oignon\"\n" +
    "    },\n" +
    "    {\n" +
    "      \"quantity\": \"200\",\n" +
    "      \"unit\": \"ml\",\n" +
    "      \"name\": \"bouillon de volaille\"\n" +
    "    },\n" +
    "    {\n" +
    "      \"quantity\": \"1\",\n" +
    "      \"unit\": \"pincée\",\n" +
    "      \"name\": \"sel\"\n" +
    "    },\n" +
    "    {\n" +
    "      \"quantity\": \"1\",\n" +
    "      \"unit\": \"pincée\",\n" +
    "      \"name\": \"poivre\"\n" +
    "    }\n" +
    "  ],\n" +
    "  \"steps\": [\n" +
    "    \"Faire cuire le riz dans une casserole d’eau bouillante salée selon les indications du paquet, puis l'égoutter.\",\n" +
    "    \"Découper le poulet en morceaux.\",\n" +
    "    \"Émincer l’oignon et hacher l’ail.\",\n" +
    "    \"Faire chauffer l’huile d’olive dans une poêle et y faire revenir l’oignon et l’ail jusqu’à ce qu’ils soient dorés.\",\n" +
    "    \"Ajouter le poulet, le curcuma et le paprika, puis faire revenir pendant 5 minutes.\",\n" +
    "    \"Verser le bouillon de volaille et laisser mijoter à feu doux pendant 10 minutes.\",\n" +
    "    \"Ajouter le riz cuit, bien mélanger et rectifier l’assaisonnement avec sel et poivre.\",\n" +
    "    \"Servir chaud.\"\n" +
    "  ]\n" +
    "}\n";

export interface RecipeJson {
    title: string;
    ingredients: [{
        quantity: number;
        unit: string;
        name: string;
    }];
    steps: [];
}

const numberOfPerson = [
    {number: 1},
    {number: 2},
    {number: 3},
    {number: 4},
    {number: 5},
    {number: 6},
    {number: 7},
    {number: 8},
    {number: 9},
    {number: 10},
]

const rateLimiter = new RateLimiter({refillRate: 60000, maxTokens: 1});
const id = 'token'

async function callApi(request: string): Promise<RecipeJson | null> {
    const isRateLimited = rateLimiter.limit(id);
    console.log(isRateLimited)

    if (isRateLimited) {
        console.log('too many');
        return null;
    }
    console.log(request)
    const data = await fetch('/recipe')
    console.log(data)
    return JSON.parse(recipeResponse);
}

export default function Recipe() {
    const [recipe, setRecipe] = useState<RecipeJson>();
    const [selected, setSelected] = useState(numberOfPerson[1]);

    function createPrompt(ingredients: string | null): string {
        if (ingredients) {
            return 'fait moi une recette avec (' + ingredients + ') tu peux ajouter autre chose si ça va bien\n' +
                ' donne moi la recette sous cette forme :\n' +
                '{title: "";ingredients: [{quantity: ""; unit: "";name: "";}]step: [""]}'
        } else {
            return 'fait moi une recette' +
                ' donne moi la recette sous cette forme :\n' +
                '{title: "";ingredients: [{quantity: ""; unit: "";name: "";}]step: [""]}'
        }
    }

    useEffect(() => {
        const loadData = async () => {
            const params = new URLSearchParams(document.location.search);
            const ingredients = params.get("ingredients");
            const requestPrompt = createPrompt(ingredients);

            callApi(requestPrompt).then(r => {
                if (r)
                    setRecipe(r)
            });
        }

        // setRecipe(callApi(requestPrompt))
        // callApi(requestPrompt).then
        // const recipeCreated = await callApi(requestPrompt)
        loadData().then();
    }, []);

    return (
        <div className="mx-auto max-w-4xl">
            {recipe &&
                <div>
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-2xl font-semibold h-full">Ingredients
                                pour {selected.number} {selected.number == 1 ? 'personne' : 'personnes'} :</p>
                            <CustomListbox list={numberOfPerson} action={setSelected} selected={selected}/>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {recipe.ingredients.map((ingredient) => (
                                <div
                                    key={ingredient.name}
                                    className="relative flex items-center space-x-3 rounded-lg border border-gray-200 bg-slate-200 px-6 py-2 shadow-sm hover:border-gray-400"
                                >
                                    <div className="min-w-0 flex-1">
                                        <span aria-hidden="true" className="absolute inset-0"/>
                                        <p className="font-medium text-gray-900">{ingredient.name}</p>
                                        <p className="truncate text-gray-500">{ingredient.quantity * (selected.number / 2)} {ingredient.unit}</p>
                                    </div>
                                    <div className="z-10">
                                        <Checkbox/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-10">
                        <p className="text-2xl font-semibold mb-4">Etapes à suivre :</p>
                        {recipe.steps.map((step, index) => (
                            <div key={index} className="overflow-hidden rounded-lg bg-white shadow m-4">
                                <div className="px-4 py-2 sm:px-6">
                                    Étape {index + 1}
                                </div>
                                <div className="bg-slate-50 px-4 py-5 sm:p-6">
                                    {step}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            }
        </div>

    );
}