"use client";

import { AuthProvider } from "./Context/AuthContext";

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};

export default Providers;