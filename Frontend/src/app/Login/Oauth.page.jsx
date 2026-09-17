
"use client";

import React, { useEffect } from "react";
import {
    useSession,
    signIn,
    signOut
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Context/AuthContext";

export default function Oauth() {
    const {
        data: session,
        status
    } = useSession();

    const router = useRouter();
    const { setUser } = useAuth();

    useEffect(() => {
        const loginOauth = async () => {
            if (status !== "authenticated" || !session?.user) {
                return;
            }

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_FETCH_URI}/githubLogin`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            username: session.user.name,
                            email: session.user.email,
                            image: session.user.image
                        })
                    }
                );

                const result = await res.json();

                // console.log("GitHub Login Response:", result);

                if (result.success) {
                    setUser(result.data);
                    router.push("/Pricing");
                }
            } catch (error) {
                console.error("OAuth Login Error:", error);
            }
        };

        loginOauth();
    }, [session, status, router, setUser]);

    return (
        <div className="hidden min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-stone-950 via-stone-900 to-sky-950 p-6 lg:flex lg:w-1/2">

            {/* Main Content */}
            <div className="w-80 max-w-md text-center">

                {/* Logo */}
                {/* <h1 className="text-5xl font-extrabold tracking-tight text-white">
                    Shrinkit
                    <span className="text-sky-400">.io</span>
                </h1>

                <p className="mt-4 text-lg text-gray-300">
                    Shorten your links. Simplify your world.
                </p>

                <p className="mt-2 text-sm text-gray-400">
                    Login quickly using your favorite platform.
                </p> */}

                {/* OAuth Buttons */}
                <div className="mt-10 flex flex-col gap-4">

                    {/* Google */}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 font-semibold text-gray-800 transition duration-300 hover:scale-[1.02] hover:bg-gray-100"
                    >
                        <span className="text-xl font-bold text-red-500">
                            G
                        </span>
                        Continue with Google
                    </button>

                    {/* GitHub */}
                    <button
                        type="button"
                        onClick={() => signIn("github")}
                        className="flex items-center justify-center gap-3 rounded-xl bg-gray-800 px-5 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-gray-700"
                    >
                        <span className="text-xl">
                            ◉
                        </span>
                        Continue with GitHub
                    </button>

                    {/* LinkedIn */}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 font-semibold text-gray-800 transition duration-300 hover:scale-[1.02] hover:bg-gray-100"
                    >
                        <span className="text-xl font-bold text-blue-600">
                            in
                        </span>
                        Continue with LinkedIn
                    </button>

                    {/* Twitter */}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 font-semibold text-gray-800 transition duration-300 hover:scale-[1.02] hover:bg-gray-100"
                    >
                        <span className="text-xl font-bold text-sky-500">
                            𝕏
                        </span>
                        Continue with Twitter
                    </button>

                    {/* Facebook */}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 font-semibold text-gray-800 transition duration-300 hover:scale-[1.02] hover:bg-gray-100"
                    >
                        <span className="text-xl font-bold text-blue-600">
                            f
                        </span>
                        Continue with Facebook
                    </button>

                    {/* Apple */}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 font-semibold text-gray-800 transition duration-300 hover:scale-[1.02] hover:bg-gray-100"
                    >
                        <span className="text-xl font-bold text-black">
                            
                        </span>
                        Continue with Apple
                    </button>

                </div>

                {/* Footer */}
                <p className="mt-8 text-xs leading-relaxed text-gray-500">
                    By continuing, you agree to our Terms of Service
                    and Privacy Policy.
                </p>

            </div>
        </div>
    );
}