import React, { useEffect } from 'react';
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";


const PropertyDetail = ({ state }) =>{
  const [landList, setLandList] = useState([])
  const {contract} = state;
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() =>{
    const getLand = async (event) => {
      // const data = await contract.getLands();
      const data2 = await contract.getOwnerLands();
      setLandList(data2)
      console.log(data2)
    };
    contract && getLand()

  }, [contract])

  const putNotForSell = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const _forSell = document.querySelector("#forsell").value;

    try {
      if (_forSell) {
        console.log("Transaction Is In Progress.");
        alert("Transaction Is In Progress.")
        const transaction = await contract.cancelSale(_forSell);
        await transaction.wait();
        console.log("Transaction Is Successful.");
        alert("Transaction Is Successful.");
      }
      else{
        setErrorMessage("All fields are required for registering your land");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while registering the land");
    }
  checkForError()
  }
  const putForSell = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const _forSell = document.querySelector("#forsell").value;

    try {
      if (_forSell) {
        console.log("Transaction Is In Progress.");
        alert("Transaction Is In Progress.")
        const transaction = await contract.setLandForSale(_forSell);
        await transaction.wait();
        console.log("Transaction Is Successful.");
        alert("Transaction Is Successful.");
      }
      else{
        setErrorMessage("All fields are required.");
      }
    } catch (error) {
      // console.log(error);
      setErrorMessage("An error occurred while putting land for Sale");
    }
  checkForError()
  }

  const [isError, setError] = useState(false);
  function checkForError() {
    if(errorMessage){
      setError(true);
    }
  }

  return (
    <div className="w-[100vw] mt-10">
    {isError && 
      <>
      <ErrorMessage message={errorMessage}/>
      </>
      }
      {errorMessage && (
        <ErrorMessage message={errorMessage}/>  
    )}
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
              {land.propertyNumber}
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
              {land.verified.toString()}
            </div>
          </div>
        </div>

            <div className="text-[18px] font-semibold">
              {land.forSell.toString()=="true"?
              <button id="forsell" className={`cancel-btn hover:bg-red-400 focus:bg-blue-600 `} onClick={putNotForSell} value={land.landId.toString()}>
                Cancel For Sell
              </button>
              :
              <button id="forsell" className={`login-btn hover:bg-blue-600 focus:bg-green-700 `} onClick={putForSell} value={land.landId.toString()}>
                Place For Sell
              </button>
              }
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