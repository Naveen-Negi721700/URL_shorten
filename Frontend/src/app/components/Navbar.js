import React from 'react'
import Link from "next/link";

const Navbar = () => {
    return (
        <>

            <div className='bg-stone-900 h-20 flex justify-between  pl-40 pr-20 sticky top-0 '>
                <div className='flex text-5xl font-bold text-gray-200 items-center justify-center'>
                    Shrinkit
                    <span className="text-sky-500">.io</span>

                </div>

                <div className='flex  gap-75 justify-end text-gray-200  ' >
                    <ul className="flex gap-5 items-center text-xl gap-10">
                        <Link href={"/"} className="inline-block hover:text-sky-500 hover:scale-125 transition-transform duration-200 cursor-pointer">
                            Home</Link>

                        <Link href={"/About"} className="inline-block hover:text-sky-500 hover:scale-125 transition-transform duration-200 cursor-pointer">
                            About</Link>
                        <Link href={"/History"} className="inline-block hover:text-sky-500 hover:scale-125 transition-transform duration-200 cursor-pointer">
                            History</Link>

                        <Link href={"/Pricing"} className="inline-block hover:text-sky-500 hover:scale-125 transition-transform duration-200 cursor-pointer">
                            Pricing</Link>
                    </ul>
                    <div className='flex  text-xl gap-1 items-center bg-sky-500 pl-4 pr-4 mt-2 mb-2 rounded-3xl justify-center'>

                        <button className='hover:text-black  transition-transform duration-200 cursor-pointer inline-block hover:scale-125'>LogIn

                        </button>
                        <div className='text-4xl text-black'>/</div>
                        <button className='hover:text-black  transition-transform duration-200 cursor-pointer inline-block hover:scale-125'>SignIn </button>


                    </div>
                </div>
            </div>

            <div className='h-1 bg-sky-500 '>

            </div>
        </>

    )
}

export default Navbar
