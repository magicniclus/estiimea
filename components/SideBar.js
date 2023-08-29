import React from "react";

const SideBar = (props) => {
  const toogle = props.toogle;
  const valueToogle = props.valueToogle;

  const handleSideBar = () => {
    toogle(!valueToogle);
  };

  return (
    <div className="h-content min-h-[665px] w-ull bg-gray-200">
      <button onClick={handleSideBar} className="text-gray-700">
        test
      </button>
    </div>
  );
};

export default SideBar;
