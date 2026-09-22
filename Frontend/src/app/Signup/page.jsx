"use client";

import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useRouter } from "next/navigation";
export default function Signup() {
    

    const [form, setform] = useState({ username: "", email: "", password: "" })
      const router = useRouter();

    const handleChange = ((e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });

    })
 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_FETCH_URI}/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },
                 credentials: "include",

                body: JSON.stringify(form),
            }
        );

        const result = await res.json();

        // console.log("API response", result);

        if (res.ok) {

            toast("🦄 Signup Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
               
                  
                router.push("/Login");

            setform({
                username: "",
                email: "",
                password: ""
            }); 

        } else {
            alert(result.message || "Failed to signup");
        }

    } catch (error) {
        console.error("Failed to fetch API", error);
    }
};

    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="min-h-screen flex justify-center items-center bg-stone-900 px-4">

                <div className="w-full max-w-md bg-stone-800 border-2 border-gray-300 rounded-3xl p-8">

                    {/* Logo */}

                    <h1 className="text-4xl font-bold text-center text-gray-200">

                        Shrinkit<span className="text-sky-500">.io</span>

                    </h1>


                    <h2 className="text-2xl font-semibold text-center text-gray-200 mt-8">

                        Create Account

                    </h2>


                    <p className="text-gray-400 text-center mt-2">

                        Create an account to manage your short links.

                    </p>


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 flex flex-col gap-5"
                    >

                        {/* Username */}

                        <div>

                            <label className="text-gray-300">

                                Username

                            </label>

                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                                className="w-full mt-2 px-4 py-3 rounded-xl bg-stone-900 border border-gray-500 text-gray-200 outline-none focus:border-sky-500"
                            />

                        </div>


                        {/* Email */}

                        <div>

                            <label className="text-gray-300">

                                Email

                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
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


                        {/* Signup Button */}

                        <button
                            type="submit"
                            className="bg-sky-600 hover:bg-sky-500 text-white text-lg font-semibold py-3 rounded-xl cursor-pointer transition"
                        >

                            Sign Up

                        </button>

                    </form>


                    {/* Message */}

                    {/* {message && (

                    <p className="text-center text-gray-300 mt-5">

                        {message}

                    </p>

                )} */}


                    {/* Login */}

                    <p className="text-center text-gray-400 mt-6">

                        Already have an account?{" "}

                        <Link
                            href="/Login"
                            className="text-sky-500 hover:underline"
                        >

                            Login

                        </Link>

                    </p>

                </div>

            </div>
        </>

    );
}