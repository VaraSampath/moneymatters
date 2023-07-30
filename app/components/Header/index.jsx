import Popup from "reactjs-popup";
import { activeTab } from "../../../utils/constants";
import CustomBtn from "../customBtn/CustomBtn";
import AddModal from "../addModal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";

const headerLookUp = {
  1: "accounts",
  2: "transactions",
  3: "profile",
};

const handleAdd = async (bodyData) => {
  console.log(bodyData);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://bursting-gelding-24.hasura.app/api/rest/add-transaction",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role": "user",
      "x-hasura-user-id": "1",
    },
    params: {
      user_id: 1,
      name: bodyData["transaction_name"],
      type: bodyData.type,
      category: bodyData.category,
      amount: bodyData.amount,
      date: bodyData.date,
    },
  };
  const response = await axios.request(config);
  console.log(response);
};

const Header = () => {
  const currentActiveTab = activeTab()[0];

  return (
    <div className="flex justify-between p-6">
      <span className=" text-xl font-semibold capitalize">
        {headerLookUp[currentActiveTab.id]}
      </span>
      <button>
        <Popup
          className=""
          trigger={
            <button className="py-1 px-2 bg-blue-500 text-white rounded-lg">
              + Add Transaction
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="modal flex justify-between">
              <div className="content ">
                <AddModal
                  close={close}
                  handleAdd={handleAdd}
                />
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
  );
};

export default Header;
