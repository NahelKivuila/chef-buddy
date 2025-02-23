"use client";

import Toggle from "@/app/_component/toggle";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Loading from "@/app/_component/loading";

export default function Home() {
    const [isToggleEnabled, setIsToggleEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();


    function sendPrompt(formData: FormData) {
        const ingredients = formData.get("ingredients");
        setIsLoading(true)

        if (ingredients){
            router.push(`/recipe?ingredients=${ingredients}`);
        } else {
            router.push('/recipe')
        }
    }

    return (
            <div className="mx-auto max-w-xl text-center">
                <p className="text-pretty text-2xl sm:text-3xl">
                    Salut quelle recette te fera plaisir aujourd&#39;hui ?
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
                    <Loading isDisable={isLoading}/>
                </form>
            </div>
    );
}
