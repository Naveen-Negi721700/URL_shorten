"use client";

import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function Login() {

const [form, setform] = useState({
    username: "",
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

        console.log("API response:", result);


        if (res.ok) {

            toast.success("Login Successfully!");

            setform({
                username: "",
                password: ""
            });

        } else {

            toast.error(
                result.message || "Failed to login"
            );

        }

    } catch (error) {

        console.log("Failed to fetch API:", error);

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

            <div className="min-h-screen flex justify-center items-center bg-stone-900 px-4">

                <div className="w-full max-w-md bg-stone-800 border-2 border-gray-300 rounded-3xl p-8">

                    {/* Logo */}

                    <h1 className="text-4xl font-bold text-center text-gray-200">

                        Shrinkit
                        <span className="text-sky-500">.io</span>

                    </h1>


                    <h2 className="text-2xl font-semibold text-center text-gray-200 mt-8">

                        Welcome Back

                    </h2>


                    <p className="text-gray-400 text-center mt-2">

                        Login to manage your short links.

                    </p>


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 flex flex-col gap-5"
                    >

                        {/* Username */}

                        <div>

                            <label className="text-gray-300">

                                Username or Email

                            </label>

                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter username or email"
                                required
                                className="w-full mt-2 px-4 py-3 rounded-xl bg-stone-900 border border-gray-500 text-gray-200 outline-none focus:border-sky-500"
                            />

                        </div>


                        {/* Password */}

                        <div>

                            <label className="text-gray-300">

                                Password

                            </label>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="w-full mt-2 px-4 py-3 rounded-xl bg-stone-900 border border-gray-500 text-gray-200 outline-none focus:border-sky-500"
                            />

                        </div>


                        {/* Login Button */}

                        <button
                            type="submit"
                            className="bg-sky-600 hover:bg-sky-500 text-white text-lg font-semibold py-3 rounded-xl cursor-pointer transition"
                        >

                            Login

                        </button>

                    </form>


                    {/* Signup Link */}

                    <p className="text-center text-gray-400 mt-6">

                        Don't have an account?{" "}

                        <Link
                            href="/signup"
                            className="text-sky-500 hover:underline"
                        >

                            Sign Up

                        </Link>

                    </p>

                </div>

            </div>

        </>
    );
}
