"use client";
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from "../Context/AuthContext";
import apiFetch from "../utils/apiFetch";

const History = () => {
  const [url, seturl] = useState([])
  const { refreshAccessToken } = useAuth();

  useEffect(() => {
    const getUrl = async () => {
      try {


        const responce = await apiFetch(
          "/history",
          {
            method: "GET"
          },
          refreshAccessToken
        );
        console.log("responce is ", responce)
        const data = await responce.json();
        seturl(data.data)
      } catch (error) {
        console.log("Error fetching history:", error);
      }
    }
    getUrl();
  }, [refreshAccessToken]);


  return (
    <>
      <h1 className='text-cyan-500 text-5xl ml-15 mt-4'>Link History</h1>

      <table className='w-11/12 ml-15 mt-10 border-2 border-gray-200 rounded-3xl '>
        <thead className='text-white text-2xl pl-10 mt-4 border-2 border-gray-200'>
          <tr>
            <th className='border-2 border-gray-200'>Short URL</th>
            <th className='border-2 border-gray-200'>Original URL</th>
            <th className='border-2 border-gray-200'>Created Data</th>
            <th className='border-2 border-gray-200'>Click</th>
            <th className='border-2 border-gray-200'>Action</th>
          </tr>
        </thead>
        {url && (<tbody>
          {url.map((item, index) => {
            return (<tr key={index} className='border-2 border-gray-200'>
              <td className="pl-4 border-2 border-gray-200">
                <a
                  href={`http://localhost:8000/${item.shortenUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-sky-500 cursor-pointer hover:underline"
                >
                  {`http://localhost:8000/${item.shortenUrl}`}
                </a>
              </td>
              <td className='pl-4 border-2 border-gray-200'>
                {item.originalUrl}
              </td>
              <td className='pl-4 border-2 border-gray-200'>
                nothing
              </td>
              <td className='pl-4 border-2 border-gray-200'>
                null
              </td>
            </tr>)
          })}


        </tbody>)}

      </table>

    </>
  )
}

export default History
