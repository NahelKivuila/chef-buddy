import {Disclosure} from '@headlessui/react'
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <Disclosure as="nav" className="bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid h-20 items-center grid-cols-3">
                    <div className="flex items-center">
                        <div className="shrink-0">
                            <Link href="/">
                                <Image
                                    width="56"
                                    height="56"
                                    alt="Chef cuisto"
                                    src="/chef-cuisto.png"
                                    className="h-14 w-auto rounded-full"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="justify-items-center">
                        <h1 className="font-bold text-3xl text-white text-center">Chef Buddy</h1>
                    </div>
                </div>
            </div>

        </Disclosure>
    );
}