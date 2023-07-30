"use client";

import Dashboard from "../components/dashboard";
import Sidebar from "../components/Sidebar";

import React from "react";

const page = () => {
  return (
    <div className=" flex  h-[85vh]">
      <div className=" w-max">
        <Sidebar />
      </div>
      <div className=" flex-1">
        <Dashboard />
      </div>
    </div>
  );
};

export default page;
