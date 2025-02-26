'use client';

import { useState } from 'react';
import Checkbox from '@/app/_component/checkbox';
import CustomListbox from '@/app/_component/customListbox';
import { numberOfPerson } from '@/model/number-of-person';
import { RecipeJson } from '@/model/recipe';

export default function RecipeSteps({ recipe }: { recipe: RecipeJson }) {
    const [selected, setSelected] = useState(numberOfPerson[1]);

    return (
        <div>
            <div>
                <div className="justify-center mb-10">
                    <p className="text-4xl font-bold h-full text-center">
                        {recipe.title}
                    </p>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-2xl font-semibold h-full">
                            Ingredients pour {selected.number}{' '}
                            {selected.number == 1 ? 'personne' : 'personnes'} :
                        </p>
                        <CustomListbox
                            list={numberOfPerson}
                            action={setSelected}
                            selected={selected}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {recipe.ingredients.map(ingredient => (
                            // {recipe.then(r => (r?.ingredients.map(ingredient => (
                            <div
                                key={ingredient.name}
                                className="relative flex items-center space-x-3 rounded-lg border border-gray-200 bg-slate-200 px-6 py-2 shadow-sm hover:border-gray-400">
                                <div className="min-w-0 flex-1">
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                    />
                                    <p className="font-medium text-gray-900">
                                        {ingredient.name}
                                    </p>
                                    <p className="truncate text-gray-500">
                                        {(ingredient.quantity / 2) *
                                            selected.number}{' '}
                                        {ingredient.unit}
                                    </p>
                                </div>
                                <div className="z-10">
                                    <Checkbox />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-10">
                    <p className="text-2xl font-semibold mb-4">
                        Etapes à suivre :
                    </p>
                    {recipe.steps.map((step, index) => (
                        // {recipe.then(r => (r?.steps.map((step, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg bg-white shadow m-4">
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
        </div>
    );
}
