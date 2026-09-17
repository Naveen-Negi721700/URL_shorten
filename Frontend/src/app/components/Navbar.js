
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    const { user, loading } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    // Close menu after clicking a link
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className="bg-stone-900 min-h-20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

                    <div className="min-h-20 flex items-center justify-between">

                        {/* Logo */}
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-200"
                        >
                            Shrinkit
                            <span className="text-sky-500">
                                .io
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-10">

                            <ul className="flex items-center gap-8 text-xl text-gray-200">

                                <Link
                                    href="/"
                                    className="hover:text-sky-500 hover:scale-110 transition-transform"
                                >
                                    Home
                                </Link>

                                <Link
                                    href="/About"
                                    className="hover:text-sky-500 hover:scale-110 transition-transform"
                                >
                                    About
                                </Link>

                                <Link
                                    href="/History"
                                    className="hover:text-sky-500 hover:scale-110 transition-transform"
                                >
                                    History
                                </Link>

                                <Link
                                    href="/Pricing"
                                    className="hover:text-sky-500 hover:scale-110 transition-transform"
                                >
                                    Pricing
                                </Link>

                            </ul>

                            {/* Desktop Login / User Section */}
                            <div className="flex text-xl gap-2 items-center bg-sky-500 px-4 py-2 rounded-3xl">

                                {loading ? (
                                    <p>Loading...</p>
                                ) : session ? (
                                    <>
                                        <div className="text-black px-2">
                                            {/* {session.user?.email} */}
                                        </div>

                                        <button
                                            onClick={() => signOut()}
                                            className="hover:text-black transition-transform hover:scale-110"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : user ? (
                                    <>
                                        <div className="text-black px-2">
                                            {/* {user.username} */}
                                        </div>

                                        <Link
                                            href="/Logout"
                                            className="hover:text-black transition-transform hover:scale-110"
                                        >
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/Login"
                                            className="hover:text-black transition-transform hover:scale-110"
                                        >
                                            LogIn
                                        </Link>

                                        <div className="text-2xl text-black">
                                            /
                                        </div>

                                        <Link
                                            href="/Signup"
                                            className="hover:text-black transition-transform hover:scale-110"
                                        >
                                            Signup
                                        </Link>
                                    </>
                                )}

                            </div>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() =>
                                setIsMenuOpen(!isMenuOpen)
                            }
                            className="lg:hidden text-white cursor-pointer"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? (
                                <X size={32} />
                            ) : (
                                <Menu size={32} />
                            )}
                        </button>

                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div
                            ref={menuRef}
                            className="lg:hidden pb-5"
                        >
                            <div className="flex flex-col items-center gap-5 text-lg text-gray-200">

                                <Link
                                    href="/"
                                    onClick={closeMenu}
                                    className="hover:text-sky-500"
                                >
                                    Home
                                </Link>

                                <Link
                                    href="/About"
                                    onClick={closeMenu}
                                    className="hover:text-sky-500"
                                >
                                    About
                                </Link>

                                <Link
                                    href="/History"
                                    onClick={closeMenu}
                                    className="hover:text-sky-500"
                                >
                                    History
                                </Link>

                                <Link
                                    href="/Pricing"
                                    onClick={closeMenu}
                                    className="hover:text-sky-500"
                                >
                                    Pricing
                                </Link>

                                {/* Mobile Login / User Section */}
                                <div className="flex items-center gap-2 bg-sky-500 text-black px-4 py-2 rounded-3xl">

                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : session ? (
                                        <button
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                signOut();
                                            }}
                                        >
                                            Logout
                                        </button>
                                    ) : user ? (
                                        <Link
                                            href="/Logout"
                                            onClick={closeMenu}
                                        >
                                            Logout
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href="/Login"
                                                onClick={closeMenu}
                                            >
                                                LogIn
                                            </Link>

                                            <span>/</span>

                                            <Link
                                                href="/Signup"
                                                onClick={closeMenu}
                                            >
                                                Signup
                                            </Link>
                                        </>
                                    )}

                                </div>

                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className="h-1 bg-sky-500"></div>
        </>
    );
};

export default Navbar;