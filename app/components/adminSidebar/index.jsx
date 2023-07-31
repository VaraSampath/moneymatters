import Image from "next/image";
import { BiSolidHome } from "react-icons/bi";
import { RiMoneyDollarBoxFill } from "react-icons/Ri";
import { CgProfile } from "react-icons/Cg";
import { FiLogOut } from "react-icons/Fi";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { sideTabs, updateTab } from "../../../store/adminSidebarSlice";
import Link from "next/link";
import LogoutModal from "../logoutModal";
import Popup from "reactjs-popup";
import { AiOutlineCloseCircle } from "react-icons/ai";

const AdminSidebar = () => {
  const sidebarTabs = useSelector(sideTabs);
  const dispatch = useDispatch();

  return (
    <div className="p-5 pl-0 border-r-2 flex flex-col justify-between  border-r-gray-50  pr-4 h-[100vh] ">
      <div>
        <Image
          src="/Logo.png"
          alt="logo"
          height={40}
          width={160}
          className="pl-5 w-full"
        />
        <div className="w-100   flex flex-col justify-start items-start   gap-5 mt-5">
          {sidebarTabs.map((each) => (
            <Link
              href={`/admin/${each.name.toLowerCase()}`}
              key={each.id}
              className={`${
                each.active ? " border-blue-700 border-l-4" : ""
              } p-3 pl-5 cursor-pointer`}
              onClick={() => {
                dispatch(updateTab(each.id));
              }}
            >
              <p
                className={`${
                  each.active ? "text-blue-800" : "text-black"
                } capitalize flex gap-4 items-center`}
              >
                <span className=" font-bold text-xl">
                  {each.name === "dashboard" ? (
                    <BiSolidHome />
                  ) : each.name === "transactions" ? (
                    <RiMoneyDollarBoxFill />
                  ) : (
                    <CgProfile />
                  )}
                </span>
                <span>{each.name}</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Image
          src="/credit.png"
          height={50}
          width={50}
          alt="user"
          className=" rounded-full"
        />
        <div className="flex flex-col">
          <span className=" font-bold text-sm">Varasampath</span>
          <span className=" text-xs text-gray-500">
            varasampath753@gmail.com
          </span>
        </div>
        <button
          name="logout"
          type="button"
        >
          <Popup
            className=""
            trigger={
              <button>
                <FiLogOut />
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modal flex justify-between">
                <div className="content ">
                  <LogoutModal close={close} />
                </div>
                <div>
                  <button onClick={() => close()}>
                    <AiOutlineCloseCircle className="text-2xl" />
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
