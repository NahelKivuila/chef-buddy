import RecipeSteps from "@/app/recipe/recipe";
import {callApi} from "@/services/openai";

function createPrompt(ingredients: string | null): string {
    if (ingredients != 'null') {
        return 'fait moi une recette avec (' + ingredients + ') tu peux ajouter autre chose si ça va bien. pour 2 personnes'
    } else {
        return 'fait moi une recette pour 2 personnes'
    }
}

export default async function Recipe({searchParams} : {searchParams: {ingredients: string}}) {
    const {ingredients} = await searchParams
    const prompt = createPrompt(ingredients)
    const recipe = await callApi(prompt)

    return (
        <div>
            {recipe &&
                <RecipeSteps recipe={recipe} />
            }
        </div>
    )

}