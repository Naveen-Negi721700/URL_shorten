"use client";
import { useState } from "react";

import { ToastContainer, toast, Bounce } from 'react-toastify';
import React from 'react'

const Home = () => {
      const [form, setform] = useState({ originalUrl: "" })
      const [responce, setresponce] = useState(null)
    
      const copyText = async (text) => {
    
          toast('🦄 copy to clipboard', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
          });
          await navigator.clipboard.writeText(text);
       
    };
    
    const handleChange = (e) => {
      setform({
        ...form,
        [e.target.name]: e.target.value
      });
    }
    
    
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();                           //it is writtin because brouser refresh page automatacaly after submiting the form 
    
      try {
        const res = await fetch("http://localhost:8000/api/v1/url/url_shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
    
        const result = await res.json()
        setresponce(result)
        console.log("API response:", result);
    
    
        if (res.ok) {
               toast('🦄 url uploded successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
          });
          setform({
            originalUrl: "",
          });
        }
        else {
          alert("Fail to recive your url");
        }
    
    
    
      } catch (error) {
        console.log("Fail to fetch api", error);
    
      }
    }
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

    <div className="bg-sky-500 ">
    </div>

    <section className="mt-6">
      <div className="text-7xl  text-gray-200  text-center">Shorten Your
        <span className="text-sky-500 pl-4">

          forms.
        </span>
      </div>
      <div className="text-7xl  text-gray-200  text-center">Simplify Your
        <span className="text-sky-500 pl-4">

          Links.
        </span>
      </div>

      <div className="min-h-80 bg-sky-500 m-2 mt-8 rounded-4xl  pb-20">
        <form action="" className="flex-col items-center justify-center gap-2 ">
          <div className="w-full min-h-20  flex justify-center gap-2">



            <input type="text" name="originalUrl" placeholder="Past your long form here..." required value={form.originalUrl} onChange={handleChange} className="text-black  size-1/2 mt-4 rounded-2xl h-10 border border-2 " />


            <button onClick={handleSubmit} className='hover:text-stone-800 hover:bg-gray-200 bg-stone-800 p-2 pl-4 pr-4 h-11 text-2xl rounded-full  mt-4 cursor-pointer '>SHORTEN! </button>
          </div>

          <div className="flex">

            {/* Short URL Card */}
            <div className="flex flex-col w-1/2 min-h-80 bg-stone-800 mr-5 rounded-4xl border-gray-200 border-2 ml-10 p-6">

              <p className="text-2xl text-gray-200">
                Here's your short link:
              </p>

              <div className="flex-col">

                {responce && (
                  <>
                 <div className="flex  items-center gap-10 mt-4">


                
                    <a
                      href={responce.data.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-sky-500 cursor-pointer hover:underline"
                    >
                      {responce.data.shortUrl}
                    </a>

                    <button className='hover:text-stone-800 hover:bg-gray-200 bg-sky-500 text-center  pl-4 pr-4 h-8 text-2xl rounded-full  mt- cursor-pointer ' onClick={() => copyText(responce.data.shortUrl)}>
                      Copy
                    </button>
                     </div>
                  </>
                )}
               
               {responce && (
                <div className="mt-6">
                  Your shortened link is available for this session only. It will disappear when you refresh the page. To view all your saved links, visit the History section.
                </div>
               )}



              </div>

            </div>


            {/* QR Card */}
            <div className="flex flex-col text-center text-gray-200 w-1/2 bg-stone-800 text-2xl rounded-4xl border-gray-200 border-2 ml-5 mr-10">

              <p className="pt-4">
                Here's your short QR code:
              </p>

              <div>
                QR
              </div>

            </div>

          </div>

        </form>
      </div>
    </section>
  </>
  )
}

export default Home
