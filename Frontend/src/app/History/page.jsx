
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
    <div className="min-h-screen w-full px-4 py-6 sm:px-6 lg:px-10">
      {/* Heading */}
      <h1 className="mt-4 text-center text-3xl font-bold text-cyan-500 sm:text-4xl lg:text-5xl">
        Link History
      </h1>

      {/* Responsive Table */}
      <div className="mt-8 w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-[750px] w-full border-collapse">
          <thead className="bg-stone-800 text-sm text-white sm:text-base lg:text-xl">
            <tr>
              <th className="border border-gray-600 p-3">
                Short URL
              </th>

              <th className="border border-gray-600 p-3">
                Original URL
              </th>

              <th className="border border-gray-600 p-3">
                Created Date
              </th>

              <th className="border border-gray-600 p-3">
                Click
              </th>

              <th className="border border-gray-600 p-3">
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
                  className="border border-gray-200 transition hover:bg-stone-800"
                >
                  {/* Short URL */}
                  <td className="max-w-[180px] border border-gray-200 p-3">
                    <a
                      href={fullShortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-sm text-sky-500 hover:underline sm:text-base"
                    >
                      {item.shortenUrl}
                    </a>
                  </td>

                  {/* Original URL */}
                  <td className="max-w-[280px] border border-gray-200 p-3">
                    <a
                      href={item.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-sm text-blue-400 hover:underline sm:text-base"
                    >
                      {item.originalUrl}
                    </a>
                  </td>

                  {/* Created Date */}
                  <td className="whitespace-nowrap border border-gray-200 p-3 text-sm sm:text-base">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Clicks */}
                  <td className="border border-gray-200 p-3 text-center text-sm sm:text-base">
                    {item.clicks || 0}
                  </td>

                  {/* Delete Button */}
                  <td className="border border-gray-200 p-3">
                    <button className="rounded bg-red-500 px-3 py-2 text-sm text-white transition hover:scale-105 hover:bg-red-600 sm:text-base">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;