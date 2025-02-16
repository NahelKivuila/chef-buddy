"use client";

import Toggle from "@/app/_component/toggle";
import {useState} from "react";
import {PlusIcon} from "@heroicons/react/24/solid";

export default function Home() {

    const [isToggleEnabled, setIsToggleEnabled] = useState(false);


    function createPrompt(ingredients: FormDataEntryValue | null): string {
        if (ingredients) {
            return 'fait moi une recette avec (' + ingredients + ') tu peux ajouter autre chose si ça va bien\n' +
                'donne moi la recette sous cette forme :\n' +
                '{title: "";ingredients: [{quantity: ""; unit: "";name: "";}]step: [""]}'
        }
        else {
            return 'fait moi une recette' +
                'donne moi la recette sous cette forme :\n' +
                '{title: "";ingredients: [{quantity: ""; unit: "";name: "";}]step: [""]}'
        }
    }

    function sendPrompt(formData: FormData) {
        const ingredients = formData.get("ingredients");
        const queryPrompt = createPrompt(ingredients)
        return undefined
    }

    return (
        <div className="px-6 py-12 sm:py-24 lg:px-8 h-full">
            <div className="mx-auto max-w-xl text-center">
                <p className="text-pretty text-2xl sm:text-3xl">
                    Bonjour quelle recette te fera plaisir aujourd'hui ?
                </p>
                <div className="mt-8 justify-items-center">
                    <Toggle label="Recette personnalisée" enabled={isToggleEnabled} action={setIsToggleEnabled}/>
                </div>

                <form className="mt-8" action={sendPrompt}>
                    {isToggleEnabled &&
                        <div className="mb-8">
                            <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                                Ingrédients à iclure
                            </label>
                            <div className="mt-2 justify-items-center">
                                <input
                                    id="text"
                                    name="ingredients"
                                    type="text"
                                    placeholder="Riz, poulet, etc..."
                                    className="block w-2/3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    }

                    <button
                        type="submit"
                        className="h-16 w-2/3 justify-center inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Générer une nouvelle recette
                        <PlusIcon aria-hidden="true" className="-mr-0.5 size-5"/>
                    </button>
                </form>

            </div>
        </div>
    );
}
