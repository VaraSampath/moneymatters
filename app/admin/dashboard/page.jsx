"use client";

import { useRouter } from "next/navigation";
import AdminSidebar from "../../components/adminSidebar";
import { useEffect } from "react";
import AdminDashboard from "../../components/adminDashboard";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <div className=" flex  h-[85vh] overflow-y-auto">
      <div className="w-max">
        <AdminSidebar />
      </div>
      <div className="flex-1">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default page;
