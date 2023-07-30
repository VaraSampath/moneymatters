"use client";

import { useSelector, useDispatch } from "react-redux";

import { updateLogin } from "../store/loginSlice";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch();

  const login = useSelector((state) => state.loginSlice);
  const navToUser = async () => {
    dispatch(updateLogin("user"));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-8 justify-center items-center">
        <img
          src="/Logo.png"
          alt=""
          className="w-[200px]"
        />
        <Link
          className="py-2 px-3 bg-blue-500 text-white"
          href={"/dashboard"}
          onClick={navToUser}
        >
          User Log In
        </Link>
      </div>
    </div>
  );
}
