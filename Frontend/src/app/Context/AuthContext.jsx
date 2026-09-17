"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const hasFetched = useRef(false);


    // Refresh Access Token
    const refreshAccessToken = async () => {

        try {

            console.log(" Trying to refresh access token...");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_FETCH_URI}/refresh-token`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            console.log(
                "Refresh response status:",
                response.status
            );

            return response.ok;

        } catch (error) {

            console.error(
                "Refresh token error:",
                error
            );

            return false;
        }
    };


    useEffect(() => {

        // Prevent duplicate API calls
        if (hasFetched.current) {
            return;
        }

        hasFetched.current = true;


        const getCurrentUser = async () => {

            console.log(" Getting current user...");

            try {

                let response = await fetch(
                    `${process.env.NEXT_PUBLIC_FETCH_URI}/currentUser`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                console.log(
                    " Current user response:",
                    response.status
                );


                if (response.status === 401) {

                    console.log(
                        " Access token expired. Starting refresh..."
                    );

                    const refreshed =
                        await refreshAccessToken();

                    // console.log(
                    //     " Refresh result:",
                    //     refreshed
                    // );


                    if (refreshed) {

                        console.log(
                            "Trying current user again..."
                        );

                        response = await fetch(
                            `${process.env.NEXT_PUBLIC_FETCH_URI}/currentUser`,
                            {
                                method: "GET",
                                credentials: "include"
                            }
                        );

                        console.log(
                            " Second current user response:",
                            response.status
                        );

                    } else {

                        console.log(
                            " Refresh failed"
                        );

                        setUser(null);

                        return;
                    }
                }


                const data = await response.json();


                // console.log(
                //     " Current user data:",
                //     data
                // );


                if (data.success) {

                    setUser(data.data);

                } else {

                    setUser(null);
                }


            } catch (error) {

                console.error(
                    " Get current user error:",
                    error
                );

                setUser(null);

            } finally {

                setLoading(false);
            }

        };


        getCurrentUser();


    }, []);


    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                refreshAccessToken
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};


export const useAuth = () => {

    return useContext(AuthContext);

};