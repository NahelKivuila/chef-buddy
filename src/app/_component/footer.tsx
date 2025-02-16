import { JSX, SVGProps } from "react"

const navigation = [
    {
        name: 'Site principal',
        href: 'https://nahelkivuila.com',
        icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" {...props}>
                <path
                    d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"/>
                <path
                    d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"/>
            </svg>

        ),
    },
    {
        name: 'mail',
        href: 'mailto:nahel.kivuila@gmail.com',

        icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" {...props}>
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/>
                <path
                    d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/>
            </svg>


        ),
    },
]

export default function Footer() {
    const date = new Date().getFullYear()

    return (
        <footer className="bg-slate-900">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center gap-x-6 md:order-2">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                            <span className="sr-only">{item.name}</span>
                            <item.icon aria-hidden="true" className="size-6"/>
                        </a>
                    ))}
                </div>
                <p className="mt-8 text-center text-sm/6 text-gray-200 md:order-1 md:mt-0">
                    &copy; {date} Nahel Kivuila. All rights reserved.
                </p>
            </div>
        </footer>
    )
}