
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../Context/AuthContext";
import apiFetch from "../utils/apiFetch";

import { ToastContainer, toast, Bounce } from "react-toastify";

const Home = () => {
  const router = useRouter();

  const {
    user,
    loading,
    refreshAccessToken,
  } = useAuth();

  const [form, setform] = useState({
    originalUrl: "",
  });

  const [responce, setresponce] = useState(null);

  // Get complete short URL
  const shortUrl = responce?.data?.shortUrl;

  // Get only short code
  const shortCode = shortUrl
    ? shortUrl.split("/").pop()
    : "";

  // Get latest shortened URL from localStorage
  useEffect(() => {
    const latest = localStorage.getItem("latestShortUrl");

    if (latest) {
      try {
        setresponce(JSON.parse(latest));
      } catch (error) {
        console.error("Error reading latest URL:", error);
        localStorage.removeItem("latestShortUrl");
      }
    }
  }, []);

  // Copy short URL
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      toast("🦄 Copy to clipboard", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Copy error:", error);
      toast.error("Unable to copy URL");
    }
  };

  // Input change
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit URL
  const handleSubmit = async (e) => {
    e.preventDefault();

    // AuthContext is still checking login status
    if (loading) {
      return;
    }

    // User is not logged in
    if (!user) {
      alert("Please login first");
      router.push("/Login");
      return;
    }

    // Empty URL
    if (!form.originalUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      const response = await apiFetch(
        "/url_shorten",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
        refreshAccessToken
      );

      const data = await response.json();

      if (response.ok) {
        setresponce(data);

        localStorage.setItem(
          "latestShortUrl",
          JSON.stringify(data)
        );

        // Clear input
        setform({
          originalUrl: "",
        });
      } else {
        toast.error(
          data.message || "Unable to shorten URL"
        );
      }
    } catch (error) {
      console.error("Error:", error);

      toast.error(
        "Something went wrong. Please try again."
      );
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

      {/* Main Section */}
      <section className="mt-6 px-3 sm:px-5">

        {/* Main Heading */}
        <div className="text-4xl sm:text-5xl lg:text-7xl text-gray-200 text-center font-bold">
          Shorten Your
          <span className="text-sky-500 pl-2 sm:pl-4">
            Links.
          </span>
        </div>

        <div className="text-4xl sm:text-5xl lg:text-7xl text-gray-200 text-center font-bold mt-2">
          Simplify Your
          <span className="text-sky-500 pl-2 sm:pl-4">
            World
          </span>
        </div>

        {/* Blue Container */}
        <div className="min-h-80 bg-sky-500 mt-8 rounded-3xl sm:rounded-4xl p-4 sm:p-6 lg:p-10">

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-6"
          >

            {/* Input and Button */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">

              <input
                type="text"
                name="originalUrl"
                placeholder="Paste your long URL here..."
                required
                value={form.originalUrl}
                onChange={handleChange}
                className="text-black w-full sm:w-2/3 lg:w-1/2 px-4 h-12 rounded-2xl border-2 border-gray-300 outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="hover:text-stone-800 hover:bg-gray-200 bg-stone-800 px-5 py-2 h-12 text-lg sm:text-xl lg:text-2xl rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "CHECKING..." : "SHORTEN!"}
              </button>

            </div>

            {/* Result Cards */}
            <div className="w-full flex flex-col lg:flex-row gap-5">

              {/* Short URL Card */}
              <div className="flex flex-col w-full lg:w-1/2 min-h-72 bg-stone-800 rounded-3xl border-gray-200 border-2 p-5 sm:p-6">

                <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-200">
                  Here's your short link!
                </p>

                <div className="flex flex-col">

                  {/* Generated Short URL */}
                  {responce && responce.data && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-5">

                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl sm:text-2xl text-sky-500 cursor-pointer hover:underline break-all"
                      >
                        {shortCode}
                      </a>

                      <button
                        type="button"
                        className="hover:text-stone-800 hover:bg-gray-200 bg-sky-500 px-4 py-1 text-lg sm:text-2xl rounded-full cursor-pointer"
                        onClick={() =>
                          copyText(responce.data.shortUrl)
                        }
                      >
                        Copy
                      </button>

                    </div>
                  )}

                  {/* Description After URL Generation */}
                  {responce && (
                    <>
                      <ul className="mt-6 list-disc space-y-4 pl-5 text-sm leading-relaxed text-gray-200 sm:text-base">

                        <li>
                          <strong>Ready to share! 🚀</strong>
                        </li>

                        <li>
                          Your shortened link is waiting for you.
                          Copy it and start sharing.
                        </li>

                        <li>
                          Your latest shortened link is saved here
                          for easy access. For all your previously
                          created links, visit the History section.
                        </li>

                      </ul>
                    </>
                  )}

                  {/* Dummy Short URL */}
                  {!responce && (
                    <>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-5">

                        <p className="text-lg sm:text-xl text-sky-500 break-all">
                          https://example.com/very/long/url
                        </p>

                        <button
                          type="button"
                          className="bg-sky-500 px-3 py-1 text-lg sm:text-xl rounded-full cursor-pointer"
                        >
                          Copy
                        </button>

                      </div>



                      <div className="mt-6 text-gray-200 text-sm sm:text-base leading-relaxed">
                        Your shortened link will appear here.
                        To view all your saved links, visit the
                        History section.
                      </div>
                    </>
                  )}

                </div>
              </div>

              {/* QR Code Card */}
              <div className="flex flex-col items-center text-center text-gray-200 w-full lg:w-1/2 min-h-72 bg-stone-800 text-xl sm:text-2xl rounded-3xl border-gray-200 border-2 p-5">

                <p className="pt-2">
                  Here's your short QR code:
                </p>

                {/* Generated QR Code */}
                {responce && responce.data && (
                  <div className="flex justify-center items-center mt-5">
                    <div className="w-40 sm:w-48 lg:w-56">
                      <img
                        src={responce.data.qrCode}
                        alt="QR Code"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}

                {/* Dummy QR Code */}
                {!responce && (
                  <div className="flex justify-center items-center mt-5">
                    <div className="w-40 sm:w-48 lg:w-56">
                      <img
                        src="/DummyQR.jpeg"
                        alt="QR"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}

              </div>

            </div>

          </form>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#050B14] min-h-90 text-white flex flex-col items-center rounded-3xl sm:rounded-4xl px-4 py-12 sm:py-16 mt-6 font-sans">

        {/* Header Section */}
        <div className="text-center max-w-3xl mb-10 sm:mb-12">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why
            <span className="text-sky-400">
              {" "}Shrinkit.io?
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            We built Shrinkit.io to make link sharing simple,
            fast and reliable. Whether you're a student,
            professional or a business, our platform helps
            you shorten, manage and track your links with ease.
          </p>

        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl w-full">

          {/* Card 1 */}
          <div className="bg-[#0A1424] border border-slate-800/80 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transition-transform duration-300 hover:-translate-y-1">

            <div className="w-16 h-16 rounded-full bg-[#0D264A] flex items-center justify-center mb-6">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8 text-sky-400 fill-sky-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>

            </div>

            <h3 className="text-xl font-bold mb-3 text-white">
              Our Mission
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed">
              To simplify the way people share links.
            </p>

          </div>

          {/* Card 2 */}
          <div className="bg-[#0A1424] border border-slate-800/80 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transition-transform duration-300 hover:-translate-y-1">

            <div className="w-16 h-16 rounded-full bg-[#1A1D4E] flex items-center justify-center mb-6">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8 text-indigo-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M21.75 12h-2.25m-.166 5.834-1.591-1.591M12 21.75V19.5m-5.834-.166 1.591-1.591M2.25 12h2.25m.166-5.834 1.591 1.591"
                />
              </svg>

            </div>

            <h3 className="text-xl font-bold mb-3 text-white">
              Our Vision
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed">
              A more connected and efficient digital world.
            </p>

          </div>

          {/* Card 3 */}
          <div className="bg-[#0A1424] border border-slate-800/80 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transition-transform duration-300 hover:-translate-y-1">

            <div className="w-16 h-16 rounded-full bg-[#0B2C38] flex items-center justify-center mb-6">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8 text-teal-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>

            </div>

            <h3 className="text-xl font-bold mb-3 text-white">
              Our Users
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed">
              Built for everyone — students, creators and businesses.
            </p>

          </div>

          {/* Card 4 */}
          <div className="bg-[#0A1424] border border-slate-800/80 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transition-transform duration-300 hover:-translate-y-1">

            <div className="w-16 h-16 rounded-full bg-[#351C2C] flex items-center justify-center mb-6">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8 text-rose-400 fill-rose-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.575-4.688-4.575-1.39 0-2.659.638-3.562 1.637-.903-.999-2.172-1.637-3.562-1.637B4.099 3.675 2 5.765 2 8.25c0 7.22 9 12 10 12s10-4.78 10-12Z"
                />
              </svg>

            </div>

            <h3 className="text-xl font-bold mb-3 text-white">
              Our Values
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed">
              Simplicity, reliability and user-first approach.
            </p>

          </div>

        </div>
      </section>
    </>
  );
};

export default Home;