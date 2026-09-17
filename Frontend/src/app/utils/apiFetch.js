const apiFetch = async (endpoint, options = {}, refreshAccessToken) => {

    const baseUrl = process.env.NEXT_PUBLIC_FETCH_URI;

    let response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        credentials: "include",
    });

    if (response.status === 401) {

        console.log(" Access token expired");

        const refreshed = await refreshAccessToken();

        if (!refreshed) {
            return response;
        }

        console.log(" Retrying original request");

        response = await fetch(`${baseUrl}${endpoint}`, {
            ...options,
            credentials: "include",
        });
    }

    return response;
};

export default apiFetch;