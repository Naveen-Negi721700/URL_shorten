"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import apiFetch from "../utils/apiFetch";

const History = () => {
  const [url, seturl] = useState([]);
  const { refreshAccessToken } = useAuth();

  const backendUrl = "https://shrinkit-backend-3f4e.onrender.com";
  useEffect(() => {
    const getUrl = async () => {
      try {
        const responce = await apiFetch(
          "/history",
          {
            method: "GET",
          },
          refreshAccessToken
        );
        const data = await responce.json();

        if (responce.ok) {
          seturl(data.data || []);
        }
      } catch (error) {
        console.log("Error fetching history:", error);
      }
    };
    getUrl();
  }, [refreshAccessToken]);
  return (
    <>
      <h1 className="text-cyan-500 text-5xl ml-15 mt-4">
        Link History
      </h1>

      <table className="w-11/12 ml-15 mt-10 border-2 border-gray-200">
        <thead className="text-white text-2xl border-2 border-gray-200">
          <tr>
            <th className="border-2 border-gray-200 p-3">
              Short URL
            </th>

            <th className="border-2 border-gray-200 p-3">
              Original URL
            </th>

            <th className="border-2 border-gray-200 p-3">
              Created Date
            </th>

            <th className="border-2 border-gray-200 p-3">
              Click
            </th>

            <th className="border-2 border-gray-200 p-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {url.map((item, index) => {
            const fullShortUrl = `${backendUrl}/${item.shortenUrl}`;

            return (
              <tr
                key={item._id || index}
                className="border-2 border-gray-200"
              >
                <td className="pl-4 border-2 border-gray-200">
                  <a
                    href={fullShortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-sky-500 cursor-pointer hover:underline"
                  >
                    {item.shortenUrl}
                  </a>
                </td>

                <td className="pl-4 border-2 border-gray-200">
                  <a
                    href={item.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {item.originalUrl}
                  </a>
                </td>

                <td className="pl-4 border-2 border-gray-200">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="pl-4 border-2 border-gray-200">
                  {item.clicks || 0}
                </td>

                <td className="pl-4 border-2 border-gray-200">
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default History;