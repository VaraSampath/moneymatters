import { sideTabs } from "../store/sidebarSlice";
import { useSelector } from "react-redux";

export const sidebarTabs = [
  {
    id: "1",
    name: "dashboard",
    active: true,
  },
  {
    id: "2",
    name: "transactions",
    active: false,
  },
  {
    id: "3",
    name: "profile",
    active: false,
  },
];

export const activeTab = () => {
  const tabs = useSelector(sideTabs);
  const x = tabs.filter((each) => {
    if (each.active) {
      return true;
    }
  });
  return x;
};
