"use client";

import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import React, { useEffect, useState } from "react";

const page = () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://bursting-gelding-24.hasura.app/api/rest/profile",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": "user",
      "x-hasura-user-id": "1",
    },
  };

  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        setUserDetails(response.data["users"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const user = userDetails[0];
  return (
    <div className=" flex  h-screen">
      <div className=" w-max">
        <Sidebar />
      </div>

      <div className=" flex-1">
        <Header />
        {userDetails.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <div className="flex p-5 gap-6">
            <div className=" ">
              <img
                src="/debit.png"
                alt=""
                srcset=""
                className=" rounded-full object-cover  h-40 w-40"
              />
            </div>
            <div className="flex flex-1">
              <div className="flex-1 p-5 flex flex-col gap-3 text-gray-500">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Your Name</label>
                  <input
                    value={user.name}
                    id="name"
                    className=" p-1 px-3 border-[2px] rounded-lg border-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    value={user.email}
                    id="email"
                    type="email"
                    className=" p-1 px-3 border-[2px] rounded-lg border-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    value={user["date_of_birth"]}
                    id="dob"
                    type="date"
                    className=" p-1 px-3 border-[2px] rounded-lg border-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="address1">Permanent Address </label>
                  <input
                    value={user["permanent_address"]}
                    id="address1"
                    className=" p-1 px-3 border-[2px] rounded-lg border-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="postal">Postal Code</label>
                  <input
                    value={user["postal_code"]}
                    id="postal"
                    type="number"
                    className=" p-1 px-3 border-[2px] rounded-lg border-gray-300"
                  />
                </div>
              </div>
              <div className=" flex-1">
                <div className="flex-1 p-5 flex flex-col gap-3 text-gray-500">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">User Name</label>
                    <input
                      value={user.name}
                      id="username"
                      className=" p-1 px-3 border-[2px] rounded-lg border-gray-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password">password</label>
                    <input
                      value={"hello there!"}
                      id="password"
                      type="password"
                      className=" p-1 px-3 border-[2px] rounded-lg border-gray-300"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="address1">Permanent Address </label>
                    <input
                      value={user["permanent_address"]}
                      id="address1"
                      className=" p-1 px-3 border-[2px] rounded-lg border-gray-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="city">City </label>
                    <input
                      value={user.city}
                      id="city"
                      type="text"
                      className=" p-1 px-3 border-[2px] rounded-lg border-gray-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="country">country</label>
                    <input
                      value={user.country}
                      id="country"
                      type="text"
                      className=" p-1 px-3 border-[2px] rounded-lg border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
