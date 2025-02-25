"use client";

import Toggle from "@/app/_component/toggle";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Loading from "@/app/_component/loading";
import {Button} from "@headlessui/react";
import {PlusIcon} from "@heroicons/react/24/solid";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Home() {
    const [isToggleEnabled, setIsToggleEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<FormDataEntryValue | null>(null)
    const router = useRouter();

    function sendPrompt(formData: FormData) {
        const ingredients = formData.get("ingredients");
        setFormData(ingredients)
        setIsLoading(true);
    }

    useEffect(() => {
        if (isLoading) {
            if (formData){
                router.push(`/recipe?ingredients=${formData}`);
            } else {
                router.push('/recipe')
            }
        }
    }, [isLoading, formData, router])

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
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className={classNames(
                            isLoading
                                ? 'cursor-not-allowed bg-slate-400'
                                : 'hover:bg-slate-500 bg-slate-600',
                            'relative h-16 mt-10 w-2/3  justify-center inline-flex items-center gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 focus-visible:outline '
                        )}
                    >
                        Générer une nouvelle recette
                        <PlusIcon aria-hidden="true" className="-mr-0.5 size-5"/>

                        <Loading />
                    </Button>
                </form>

            </div>
    );
}
