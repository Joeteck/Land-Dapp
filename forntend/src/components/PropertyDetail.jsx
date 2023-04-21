import React, { useEffect } from 'react';
import styles from "../style"
import Button from './Button'
import { useState } from "react";
import BigNumber from 'bignumber.js';


const PropertyDetail = ({ state }) =>{
  const [landList, setLandList] = useState([])
  const {contract} = state;

  useEffect(() =>{
    const getLand = async (event) => {
      const data = await contract.getLands();
      setLandList(data)
      // console.log(data)
    };
    contract && getLand()


      // event.preventDefault();
        // try {
        //     setLandList(data)
        //     console.log("See Data:", data);
        //     alert("Transaction Is Successful.");
        //   } catch (error) {
        //   console.log(error);
        //   setErrorMessage("An error occurred while Getting lands");
        // }
      // checkForError()

  }, [contract])

  return (
    <div className="w-[100vw] mt-10">
    {landList.map((land) => (
      <>
    <div className=" flex flex-col gap-0 items-center">
      
      <div className="flex flex-col my-3 xs:w-[80%] w-[100vw] gap-y-2 xs:border-radius xs:border border-b  xs:pl-20 max-xs:px-5">
        <div key={Math.random()}>
          <div className={` flex flex-row items-center xs:gap-10 border-b border-cyan-900 w-[100%] xs:w-[75%] p-3`}>
            <div className=" font-bold text-[20px] w-[200px] ">
              Location
            </div>
            <div className="text-[18px] font-semibold max-xs:w-fit">
              {land.state}, {land.city}, {land.district}
            </div>
          </div>

          <div className={` flex flex-row items-center xs:gap-10 border-b border-cyan-900 w-[100%] xs:w-[75%] p-3`}>
            <div className=" font-bold text-[20px] w-[200px]">
              Property Number
            </div>
            <div className="text-[18px] font-semibold max-xs:w-fit">
              {land.landId.toString()}
            </div>
          </div>

          <div className={` flex flex-row items-center xs:gap-10 border-b border-cyan-900 w-[100%] xs:w-[75%] p-3`}>
            <div className=" font-bold text-[20px] w-[200px]">
              Market value
            </div>
            <div className="text-[18px] font-semibold max-xs:w-fit">
              {land.marketValue.toString()}
            </div>
          </div>

          <div className={` flex flex-row items-center xs:gap-10 border-b border-cyan-900 w-[100%] xs:w-[75%] p-3`}>
            <div className=" font-bold text-[20px] w-[200px]">
              Owner
            </div>
            <div className="text-[18px] font-semibold max-xs:w-fit">
              {land.owner}
            </div>
          </div>
        </div>

            <div className="text-[18px] font-semibold">
                  <a href="#" className="">
                    <button className={`login-btn hover:bg-blue-600 focus:bg-green-700 `}>
                      Place For Sell
                    </button>
                  </a>
            </div>
      </div>
        
    </div>
    <div className={` w-[100%] h-[1px] bg-black mt-[50px]`}>
    </div>
      
      </>
))};
  </div>
    
    
  );
};

export default PropertyDetail