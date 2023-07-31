"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { updateLogin } from "../store/loginSlice";
import Link from "next/link";
import { useState } from "react";
import { fetchAllTransactions } from "../store/allTransactionsSlice";
import axios from "axios";

const Home = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const validateLogin = async () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bursting-gelding-24.hasura.app/api/rest/get-user-id",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      },
      params: loginDetails,
    };

    const response = await axios.request(config);
    if (!response.data["get_user_id"][0]) {
      alert("invalid login");
      return;
    }
    const id = response.data["get_user_id"][0].id;

    if (id) {
      if (id !== 3) navToUser(id, "dashboard");
      else navToUser(id, "admin/dashboard");
    }
  };

  const router = useRouter();

  const handleClick = (e) => {
    router.push(e);
  };

  const login = useSelector((state) => state.loginSlice);
  const navToUser = async (id, path) => {
    localStorage.setItem("userID", id);
    handleClick(`/${path}`);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-8 justify-center items-center">
        <img
          src="/Logo.png"
          alt=""
          className="w-[200px]"
        />
        <form className=" w-[350px]">
          <div className="my-4 flex justify-between">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="border-2 border-gray-400 ml-4"
              onChange={(e) =>
                setLoginDetails((prevState) => {
                  return { ...prevState, email: e.target.value };
                })
              }
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="border-2 border-gray-400 ml-4"
              onChange={(e) =>
                setLoginDetails((prevState) => {
                  return { ...prevState, password: e.target.value };
                })
              }
            />
          </div>
        </form>
        <button
          className="py-2 px-3 bg-blue-500 text-white rounded-lg"
          onClick={validateLogin}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Home;
