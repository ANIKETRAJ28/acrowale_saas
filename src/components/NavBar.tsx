"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
    const session = useSession();
    return (
        <header className="flex flex-wrap w-full text-sm py-3 dark:bg-neutral-800 mb-4">
            <nav className="w-full mx-auto px-4 flex items-center justify-between">
                <Link className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white" href="/" aria-label="Brand">ACROWALE</Link>
                <div className="flex flex-row items-center gap-5 justify-end ps-5">
                    <button 
                        type="button" 
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => {
                            if(session.data) signOut();
                            else signIn();
                        }}
                    >
                        {session.data ? "Logout" : "Login"}
                    </button>
                </div>
            </nav>
        </header>
    )
}