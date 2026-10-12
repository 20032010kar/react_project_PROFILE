import type React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const RootLayout: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="box-border min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-500 w-full flex h-20 items-center justify-between p-2 mb-2">
                <Link className="text-amber-50 text-5xl uppercase font-bold" to='/'>
                    <h1>Logo</h1>
                </Link>

                <div className="text-2xl text-amber-50 uppercase underline flex gap-4">
                    <NavLink className="hover:text-neutral-400" to='/profile'>Profile</NavLink>
                    <NavLink className="hover:text-neutral-400" to='/profile/1'>Profile1</NavLink>
                    <NavLink className="hover:text-neutral-400" to='/test'>Test404</NavLink>
                </div>
            </header>

            {/* content */}
            <main className="grow px-4 md:px-8 lg:px-12">
                <Outlet/>
            </main>

            <footer className="bg-blue-500 w-full h-100 flex justify-center items-center">
                <h1 className="text-6xl uppercase text-blue-600">Footer</h1>
            </footer>
        </div>
    )
}

export default RootLayout;