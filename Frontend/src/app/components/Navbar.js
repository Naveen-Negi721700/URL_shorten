
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Info, History, Gem, LogIn, LogOut, } from "lucide-react";
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
            {/* ================= NAVBAR ================= */}
            <nav className="sticky top-0 z-50 min-h-20 border-b border-gray-800 bg-stone-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">

                    <div className="flex min-h-20 items-center justify-between">

                        {/* Logo */}
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="text-2xl font-extrabold tracking-tight text-gray-200 transition-transform duration-300 hover:scale-105 sm:text-3xl lg:text-4xl"
                        >
                            Shrinkit
                            <span className="text-sky-500">
                                .io
                            </span>
                        </Link>

                        {/* ================= DESKTOP NAVIGATION ================= */}
                        <div className="hidden items-center gap-8 lg:flex">

                            <ul className="flex items-center gap-8 text-lg text-gray-300 xl:text-xl">

                                <li>
                                    <Link
                                        href="/"
                                        className="transition-all duration-300 hover:scale-110 hover:text-sky-400"
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/About"
                                        className="transition-all duration-300 hover:scale-110 hover:text-sky-400"
                                    >
                                        About
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/History"
                                        className="transition-all duration-300 hover:scale-110 hover:text-sky-400"
                                    >
                                        History
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/Pricing"
                                        className="transition-all duration-300 hover:scale-110 hover:text-sky-400"
                                    >
                                        Pricing
                                    </Link>
                                </li>

                            </ul>

                            {/* Desktop Authentication */}
                            <div className="flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-base font-medium text-black shadow-lg shadow-sky-500/20 transition-all duration-300 hover:bg-sky-400">

                                {loading ? (
                                    <>
                                        <Link
                                            href="/Login"
                                            className="transition-transform duration-200 hover:scale-110"
                                        >
                                            LogIn
                                        </Link>

                                        <span>/</span>

                                        <Link
                                            href="/Signup"
                                            className="transition-transform duration-200 hover:scale-110"
                                        >
                                            Signup
                                        </Link>
                                    </>
                                ) : session ? (
                                    <>
                                        <div className="px-2">
                                            {/* {session.user?.email} */}
                                        </div>

                                        <button
                                            onClick={() => signOut()}
                                            className="transition-transform duration-200 hover:scale-110 "
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : user ? (
                                    <>
                                        <div className="px-2">
                                            {/* {user.username} */}
                                        </div>

                                        <Link
                                            href="/Logout"
                                            className="transition-transform duration-200 hover:scale-110"
                                        >
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/Login"
                                            className="transition-transform duration-200 hover:scale-110"
                                        >
                                            LogIn
                                        </Link>

                                        <span>/</span>

                                        <Link
                                            href="/Signup"
                                            className="transition-transform duration-200 hover:scale-110"
                                        >
                                            Signup
                                        </Link>
                                    </>
                                )}

                            </div>
                        </div>

                        {/* ================= MOBILE MENU BUTTON ================= */}
                        <button
                            onClick={() =>
                                setIsMenuOpen(!isMenuOpen)
                            }
                            className="relative z-[60] rounded-lg p-2 text-gray-200 transition-all duration-300 hover:bg-gray-800 hover:text-sky-400 lg:hidden"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? (
                                <X size={28} />
                            ) : (
                                <Menu size={28} />
                            )}
                        </button>

                    </div>
                </div>
            </nav>

            {/* ================= MOBILE OVERLAY ================= */}
            <div
                className={`fixed inset-0 top-20 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${isMenuOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
                onClick={closeMenu}
            />

            {/* ================= MOBILE SLIDING SIDEBAR ================= */}
            <div
                ref={menuRef}
                className={`fixed left-0 top-20 z-50 min-h-[calc(100vh-5rem)] w-80 max-w-[85vw] overflow-y-auto rounded-r-3xl border-r border-sky-500/30 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 px-5 py-8 shadow-[8px_0_35px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out lg:hidden ${isMenuOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                    }`}
            >

                {/* Mobile Menu Header */}
                <div className="mb-8 border-b border-gray-700 pb-6 text-center">

                    <h2 className="text-xl font-bold text-gray-200">
                        Welcome to{" "}
                        <span className="text-sky-500">
                            Shrinkit.io
                        </span>
                    </h2>

                    <p className="mt-2 text-xs leading-relaxed text-gray-400">
                        Shorten your links.
                        <br />
                        Share with ease.
                    </p>

                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-3">

                    {/* Home */}
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="group flex items-center gap-4 rounded-xl border border-transparent px-5 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:translate-x-2 hover:border-sky-400/30 hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-sky-500/20"
                    >
                        <Home
                            size={19}
                            className="transition-transform duration-300 group-hover:scale-125"
                        />
                        <span>Home</span>
                    </Link>

                    {/* About */}
                    <Link
                        href="/About"
                        onClick={closeMenu}
                        className="group flex items-center gap-4 rounded-xl border border-transparent px-5 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:translate-x-2 hover:border-sky-400/30 hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-sky-500/20"
                    >
                        <Info
                            size={19}
                            className="transition-transform duration-300 group-hover:scale-125"
                        />
                        <span>About</span>
                    </Link>

                    {/* History */}
                    <Link
                        href="/History"
                        onClick={closeMenu}
                        className="group flex items-center gap-4 rounded-xl border border-transparent px-5 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:translate-x-2 hover:border-sky-400/30 hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-sky-500/20"
                    >
                        <History
                            size={19}
                            className="transition-transform duration-300 group-hover:scale-125"
                        />
                        <span>History</span>
                    </Link>

                    {/* Pricing */}
                    <Link
                        href="/Pricing"
                        onClick={closeMenu}
                        className="group flex items-center gap-4 rounded-xl border border-transparent px-5 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:translate-x-2 hover:border-sky-400/30 hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-sky-500/20"
                    >
                        <Gem
                            size={19}
                            className="transition-transform duration-300 group-hover:scale-125"
                        />
                        <span>Pricing</span>
                    </Link>

                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                {/* Mobile Authentication */}
                {/* Mobile Authentication */}
                <div className="flex w-full flex-col gap-3">

                    {loading ? (
                        <>
                            <Link
                                href="/Login"
                                onClick={closeMenu}
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-sky-400"
                            >
                                <LogIn size={18} />
                                Login
                            </Link>

                            <Link
                                href="/Signup"
                                onClick={closeMenu}
                                className="flex w-full items-center justify-center gap-3 rounded-xl border border-sky-500 px-5 py-3 text-sm font-semibold text-sky-400 transition-all duration-300 hover:scale-105 hover:bg-sky-500 hover:text-black"
                            >
                                <LogIn size={18} />
                                Signup
                            </Link>
                        </>
                    ) : session ? (
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                signOut();
                            }}
                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    ) : user ? (
                        <Link
                            href="/Logout"
                            onClick={closeMenu}
                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600"
                        >
                            <LogOut size={18} />
                            Logout
                        </Link>
                    ) : (
                        <>
                            {/* Login Button */}
                            <Link
                                href="/Login"
                                onClick={closeMenu}
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-sky-400"
                            >
                                <LogIn size={18} />
                                Login
                            </Link>

                            {/* Signup Button */}
                            <Link
                                href="/Signup"
                                onClick={closeMenu}
                                className="flex w-full items-center justify-center gap-3 rounded-xl border border-sky-500 px-5 py-3 text-sm font-semibold text-sky-400 transition-all duration-300 hover:scale-105 hover:bg-sky-500 hover:text-black"
                            >
                                <LogIn size={18} />
                                Signup
                            </Link>
                        </>
                    )}

                </div>

                {/* Bottom Footer */}
                <div className="mt-12 border-t border-gray-800 pt-6 text-center">

                    <p className="text-xs text-gray-500">
                        Made with ❤️
                    </p>

                    <p className="mt-1 text-xs font-semibold text-sky-500">
                        Shrinkit.io
                    </p>

                </div>

            </div>

            {/* Bottom Border */}
            <div className="h-1 bg-sky-500" />
        </>
    );
};

export default Navbar;