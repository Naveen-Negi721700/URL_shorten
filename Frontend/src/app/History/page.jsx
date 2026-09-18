
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import apiFetch from "../utils/apiFetch";

const History = () => {
  const [url, seturl] = useState([]);
  const { refreshAccessToken } = useAuth();

  const backendUrl = process.env.NEXT_PUBLIC_FETCH_URI.replace(
    "/api/v1/url",
    ""
  );


useEffect(() => {
    let interval;

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
                const urls = data.data || [];

                const urlsWithClicks = await Promise.all(
                    urls.map(async (item) => {
                        try {
                            const analyticsResponse = await apiFetch(
                                `/analytics/${item.shortenUrl}`,
                                {
                                    method: "GET",
                                },
                                refreshAccessToken
                            );

                            const analyticsData =
                                await analyticsResponse.json();

                            return {
                                ...item,
                                clicks: analyticsResponse.ok
                                    ? analyticsData.data
                                    : 0,
                            };
                        } catch (error) {
                            console.log(
                                "Error fetching analytics:",
                                error
                            );

                            return {
                                ...item,
                                clicks: 0,
                            };
                        }
                    })
                );

                seturl(urlsWithClicks);
            }
        } catch (error) {
            console.log(
                "Error fetching history:",
                error
            );
        }
    };

    // Fetch immediately when page opens
    getUrl();

    // Automatically refresh every 2 seconds
    interval = setInterval(() => {
        getUrl();
    }, 2000);

    // Cleanup when leaving the page
    return () => {
        clearInterval(interval);
    };

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

            </tr>
          </thead>

          <tbody>

            {url.map((item, index) => {

              const fullShortUrl =
                `${backendUrl}/${item.shortenUrl}`;

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
                      ? new Date(
                          item.createdAt
                        ).toLocaleDateString()
                      : "N/A"}

                  </td>

                  {/* Clicks */}
                  <td className="border border-gray-200 p-3 text-center text-sm sm:text-base">

                    {item.clicks ?? 0}

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