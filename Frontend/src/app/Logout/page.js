"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Context/AuthContext";

export default function Logout() {

    const {setUser } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);


    const handleLogout = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_FETCH_URI}/logout`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (data.success) {

                // Remove user from Context
                setUser(null);

                // Redirect to Login page
                router.push("/Login");

            }

        } catch (error) {

            console.error("Logout Error:", error);

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-stone-800">

            <div className="bg-stone-900 p-8 rounded-xl shadow-lg text-center">

                <h1 className="text-2xl font-bold text-white mb-4">
                    Logout
                </h1>

                <p className="text-gray-400 mb-6">
                    Are you sure you want to logout?
                </p>


                <div className="flex gap-4 justify-center">

                    <button
                        onClick={() => router.back()}
                        className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:scale-105 transition"
                    >
                        Cancel
                    </button>


                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:scale-105 transition"
                    >

                        {loading ? "Logging out..." : "Logout"}

                    </button>

                </div>

            </div>

        </div>

    );
}