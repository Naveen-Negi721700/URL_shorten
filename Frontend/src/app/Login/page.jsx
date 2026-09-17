
"use client";

import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
import { useRouter } from "next/navigation";

import Oauth from "./Oauth.page";

export default function Login() {
    const { setUser } = useAuth();
    const router = useRouter();

    const [form, setform] = useState({
        usernameOrEmail: "",
        password: ""
    });

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_FETCH_URI}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(form)
                }
            );

            const result = await res.json();

            // console.log("API response:", result);

            if (result.success) {
                setUser(result.data);
                console.log("User stored in AuthContext");

                toast.success("Login Successfully!");

                setform({
                    usernameOrEmail: "",
                    password: ""
                });

                router.push("/Pricing");
            } else {
                toast.error(result.message || "Failed to login");
            }
        } catch (error) {
            console.error("Failed to fetch API:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
                transition={Bounce}
            />

            {/* Common Parent Div */}
            <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-stone-950 via-stone-900 to-sky-950 lg:flex-row">

                {/* OAuth Component */}
                <Oauth />

                {/* Login Section */}
                <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-stone-950 via-stone-900 to-sky-950 px-4 py-8 sm:px-6 lg:w-1/2 lg:px-10">

                    <div className="w-full max-w-md rounded-3xl border border-gray-600/60 bg-stone-900/80 p-6 shadow-2xl backdrop-blur-md sm:p-8">

                        {/* Logo */}
                        <h1 className="text-center text-3xl font-bold text-gray-200 sm:text-4xl">
                            Shrinkit
                            <span className="text-sky-500">.io</span>
                        </h1>

                        {/* Heading */}
                        <h2 className="mt-6 text-center text-xl font-semibold text-gray-200 sm:mt-8 sm:text-2xl">
                            Welcome Back
                        </h2>

                        <p className="mt-2 text-center text-sm text-gray-400 sm:text-base">
                            Login to manage your short links.
                        </p>

                        {/* Login Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 flex flex-col gap-5 sm:mt-8"
                        >

                            {/* Username or Email */}
                            <div>
                                <label
                                    htmlFor="usernameOrEmail"
                                    className="text-sm text-gray-300 sm:text-base"
                                >
                                    Username or Email
                                </label>

                                <input
                                    id="usernameOrEmail"
                                    type="text"
                                    name="usernameOrEmail"
                                    value={form.usernameOrEmail}
                                    onChange={handleChange}
                                    placeholder="Enter username or email"
                                    autoComplete="username"
                                    required
                                    className="mt-2 w-full rounded-xl border border-gray-600 bg-stone-800/80 px-4 py-3 text-sm text-gray-200 outline-none transition placeholder:text-gray-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-base"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-sm text-gray-300 sm:text-base"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="mt-2 w-full rounded-xl border border-gray-600 bg-stone-800/80 px-4 py-3 text-sm text-gray-200 outline-none transition placeholder:text-gray-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-base"
                                />
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="rounded-xl bg-sky-600 py-3 text-base font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/20 sm:text-lg"
                            >
                                Login
                            </button>

                        </form>

                        {/* Signup Link */}
                        <p className="mt-6 text-center text-sm text-gray-400 sm:text-base">
                            Don't have an account?{" "}

                            <Link
                                href="/Signup"
                                className="text-sky-500 transition hover:text-sky-400 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>

                    </div>
                </div>

            </div>
        </>
    );
}