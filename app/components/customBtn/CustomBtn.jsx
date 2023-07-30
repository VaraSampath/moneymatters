import React from "react";

const CustomBtn = (props) => {
  const { title, extraStyling } = props;
  return (
    <button
      name="button"
      type="button"
      className=" bg-blue-600 text-white px-3 py-1 rounded-lg"
    >
      {title}
    </button>
  );
};

export default CustomBtn;
