import ApiError from '@/app/recipe/api-error';
import RecipeSteps from '@/app/recipe/recipe';
import TooMany from '@/app/recipe/too-many';
import { callApi } from '@/services/openai';

function createPrompt(ingredients: string | null): string {
    if (ingredients) {
        return (
            'fait moi une recette avec (' +
            ingredients +
            ') tu peux ajouter autre chose si ça va bien. pour 2 personnes'
        );
    } else {
        return 'fait moi une recette pour 2 personnes quelque chose de différents';
    }
}

export default async function Recipe({
    searchParams,
}: {
    searchParams: Promise<{ ingredients: string }>;
}) {
    const { ingredients } = await searchParams;
    const prompt = createPrompt(ingredients);
    const request = await callApi(prompt);

    if (request && 'status' in request) {
        if (request.status == 429) {
            return (
                <div>
                    <TooMany />
                </div>
            );
        } else {
            return (
                <div>
                    <ApiError />
                </div>
            );
        }
    }

    return (
        <div>
            {request && (
                <RecipeSteps recipe={request} />
                // typeof resp === ''
                //     ? <RecipeSteps resp={request} />
                //     : <RecipeSteps resp={request}/>
            )}
        </div>
    );
}
