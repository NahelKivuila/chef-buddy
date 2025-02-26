'use client';

import { Field, Label, Switch } from '@headlessui/react';

export default function Toggle({
    label,
    enabled,
    action,
}: {
    label: string;
    enabled: boolean;
    action: (value: boolean) => void;
}) {
    return (
        <Field className="flex items-center">
            <Label as="span" className="ml-3 text-sm mr-4">
                <span className="text-lg text-gray-900">{label}</span>
            </Label>
            <Switch
                checked={enabled}
                onChange={action}
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-slate-500">
                <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
            </Switch>
        </Field>
    );
}
