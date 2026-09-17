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
    refreshAccessToken
  } = useAuth();


  const [form, setform] = useState({
    originalUrl: "",
  });


  const [responce, setresponce] = useState(null);


  // Get latest shortened URL from localStorage
  useEffect(() => {

    const latest = localStorage.getItem("latestShortUrl");

    if (latest) {
      try {
        setresponce(JSON.parse(latest));
      } catch (error) {
        console.log("Error reading latest URL:", error);
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

      console.log("Copy error:", error);

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


      console.log("Shorten response:", data);


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

      console.log("Error:", error);

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


      {/* Main section */}

      <section className="mt-6">

        <div className="text-7xl text-gray-200 text-center">

          Shorten Your

          <span className="text-sky-500 pl-4">
            Links.
          </span>

        </div>


        <div className="text-7xl text-gray-200 text-center">

          Simplify Your

          <span className="text-sky-500 pl-4">
            World
          </span>

        </div>


        <div className="min-h-80 bg-sky-500 m-2 mt-8 rounded-4xl pb-20">

          <form
            onSubmit={handleSubmit}
            className="flex-col items-center justify-center gap-2"
          >

            <div className="w-full min-h-20 flex justify-center gap-2">

              <input
                type="text"
                name="originalUrl"
                placeholder="Paste your long form here..."
                required
                value={form.originalUrl}
                onChange={handleChange}
                className="text-black size-1/2 mt-4 rounded-2xl h-10 border border-2"
              />


              <button
                type="submit"
                disabled={loading}
                className="hover:text-stone-800 hover:bg-gray-200 bg-stone-800 p-2 pl-4 pr-4 h-11 text-2xl rounded-full mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {loading ? "CHECKING..." : "SHORTEN!"}

              </button>

            </div>



            <div className="flex">


              {/* Short URL Card */}

              <div className="flex flex-col w-1/2 min-h-80 bg-stone-800 mr-5 rounded-4xl border-gray-200 border-2 ml-10 p-6">

                <p className="text-4xl text-gray-200">
                  Here's your short link!
                </p>


                <div className="flex-col">


                  {responce &&
                    responce.data && (

                      <div className="flex items-center gap-10 mt-4">

                        <a
                          href={responce.data.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-2xl text-sky-500 cursor-pointer hover:underline"
                        >

                          {responce.data.shortUrl}

                        </a>


                        <button
                          type="button"
                          className="hover:text-stone-800 hover:bg-gray-200 bg-sky-500 text-center pl-4 pr-4 h-8 text-2xl rounded-full cursor-pointer"
                          onClick={() =>
                            copyText(
                              responce.data.shortUrl
                            )
                          }
                        >

                          Copy

                        </button>

                      </div>
                    )}


                  {responce && (

                    <div className="mt-6 text-gray-200">

                      Your latest shortened link is saved here
                      for easy access. For all your previously
                      created links, visit the History section.

                    </div>

                  )}


                  {!responce && (

                    <>

                      <div className="flex items-center gap-10 mt-4">

                        <p className="text-2xl text-sky-500 cursor-pointer hover:underline">

                          https://example.com/very/long/url

                        </p>


                        <button
                          type="button"
                          className="hover:text-stone-800 hover:bg-gray-200 bg-sky-500 text-center pl-4 pr-4 h-8 text-2xl rounded-full cursor-pointer"
                        >

                          Copy

                        </button>

                      </div>


                      <div className="mt-6 text-gray-200">

                        Your shortened link will appear here.
                        To view all your saved links, visit the
                        History section.

                      </div>

                    </>

                  )}

                </div>

              </div>



              {/* QR Card */}

              <div className="flex flex-col text-center text-gray-200 w-1/2 bg-stone-800 text-2xl rounded-4xl border-gray-200 border-2 ml-5 mr-10">

                <p className="pt-4">
                  Here's your short QR code:
                </p>


                {responce &&
                  responce.data && (

                    <div className="flex justify-center items-center mt-4">

                      <div className="w-1/3">

                        <img
                          src={responce.data.qrCode}
                          alt="QR Code"
                          className="w-full h-auto"
                        />

                      </div>

                    </div>

                  )}


                {!responce && (

                  <div className="flex justify-center items-center">

                    <div className="w-1/3 mt-3">

                      <img
                        src="/DummyQR.jpeg"
                        alt="QR"
                      />

                    </div>

                  </div>

                )}

              </div>

            </div>

          </form>

        </div>

      </section>



      {/* About section */}

      <section className="bg-[#050B14] min-h-90 text-white flex flex-col items-center rounded-4xl px-4 py-16 font-sans">


        {/* Header Section */}

        <div className="text-center max-w-3xl mb-12">

          <h2 className="text-4xl md:text-5xl font-bold mb-4">

            Why

            <span className="text-sky-400">
              {" "}Shrinkit.io?
            </span>

          </h2>


          <p className="text-slate-400 text-4xl md:text-base leading-relaxed max-w-2xl mx-auto">

            We built Shrinkit.io to make link sharing simple,
            fast and reliable. Whether you're a student,
            professional or a business, our platform helps
            you shorten, manage and track your links with ease.

          </p>

        </div>



        {/* Cards Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">


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