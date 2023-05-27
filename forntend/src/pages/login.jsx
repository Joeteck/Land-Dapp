import styles from "../style"
import {login_image, view, metalogo} from '../assets';
import dotenv from 'dotenv';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import {Navbar, Footer2} from '../components';

// function ShowPassword() {
//   var x = document.getElementById("password");
//   if (x.type === "password") {
//     x.type = "text";
//   } else {
//     x.type = "password";
//   }2
// }

const login = ({state, account}) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  
  const checkUser = async (event) => {
    event.preventDefault();
    const {contract} = state;
    
    try {
      const users = await contract.getUsers();
      if (users && users.length > 0) {
        console.log("Hello")
        let userFound = false;
        for (let i = 0; i < users.length; i++) {
          if (users[i].walletAddress.toLowerCase() === account) {
            userFound = true;
            break;
          }
        }
        if (userFound) {
          // User is in the list
          console.log(users)
          console.log("User is authorized");
          navigate('/user dashboard', {replace: true});
          // Do something here
        } else {
          // User is not in the list
          console.log(users)
          console.log("User is not authorized");
          navigate('/user registration', {replace: true});
          // Do something here
        }
      }
      else{
        navigate(`/user registration`)
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const  checkCommissioner = async (event) => {
    event.preventDefault();  
    const contractAccount = "0x62ddc6b5926F1d9b2C8e55A73c9d84a697071a71";
    try {
      if (account === contractAccount.toLowerCase()) {
          // User is in the list
          console.log(account)
          console.log("User is authorized");
          navigate('/commissioner', {replace: true});
        } else {
          // Inspector is not in the list
          console.log(account)
          console.log("Account is not authorized");
          alert("Account is not authorized");
        }
      
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const checkLandInspector = async (event) => {
    event.preventDefault();
    const {contract} = state;
  
    try {
      const users = await contract.getInspectors();
      if (users && users.length > 0) {
        let userFound = false;
        for (let i = 0; i < users.length; i++) {
          if (users[i].walletAddress.toLowerCase() === account) {
            userFound = true;
            break;
          }
        }
        if (userFound) {
          // User is in the list
          console.log(users)
          console.log("User is authorized");
          navigate('/inspector dashboard', {replace: true});
        } else {
          // Inspector is not in the list
          console.log(users)
          console.log("User is not authorized");
          alert("Inspector is not authorized");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  
  return (
    <div className="bg-primary w-full flex flex-col overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter} z-[5]`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
  
      <section id='home' className={`flex flex-col items-center md:flex-row text-center mb-10`}>
        <div className={`flex flex-col ${styles.flexCenter} bg-primary ${styles.boxWidth}`}>
  
          <div className={`flex-1 flex  ${styles.flexCenter} md:my-0 my-10 relative z-[]`}>
            <img src={login_image} alt="Robot Hand Image" className="w-[400px] h-[250px] relative z-[5]"/>
  
            <div className='absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient'></div>
            <div className='absolute z-[1] w-[80%] h-[80%] bottom-40 white__gradient'></div>
            <div className='absolute z-[0] w-[50%] h-[50%] right-40 bottom-40 blue__gradient'></div>
          </div>
          <p className={` ${styles.paragraph} py-5`}>
            You can enter private key to your wallet here. Or enter your Metamask wallet
          </p>
  
          {/* ===========FORM=================== */}
          <form action={`#`} method="" className={`w-full ${styles.flexCenter} flex flex-col`}>
            {/* <div className={`flex flex-row bg-white px-[20px] py-[5px] border-radius mb-5 border-div border-dimWhite sm:w-[50%] md:w-[38%] w-[70%]`}>
              <input id="password" type="password" className={`text-[18px] font-poppins letterSpacing w-[100%] focus:outline-0`}  placeholder="Private Key"/>
              <img src={view} alt="Hid Password" className={`w-[30px] h-[30px]`} onClick={ShowPassword}/>
            </div> */}
            <div className={`${styles.flexCenter} flex flex-col`}>

              <div className="flex sm:flex-row flex-col gap-10 mb-10">

                {/* User Button */}
                <button id="user-btn" className={`bg-gray-300 w-full h-[100px] text-black font-poppins font-medium hover:bg-slate-500  py-2 px-4 rounded-md sm:mr-2 mb-2 sm:mb-0   sm:w-[100px]`} onClick={checkUser}>
                  User
                </button>

                {/* Land Inspector Button */}
                
                <button id="land-inspector-btn" className={`bg-gray-300 text-black font-poppins font-medium hover:bg-slate-500 py-2 px-4 rounded-md sm:mr-2 mb-2 sm:mb-0 w-full sm:w-auto h-[100px]`} onClick={checkLandInspector}>
                  Land Inspector
                </button>

                {/* Commissioner Button */}
                <button id="commissioner-btn" className={`bg-gray-300 text-black font-poppins font-medium hover:bg-slate-500 py-2 px-4 rounded-md w-full sm:w-auto h-[100px]`} onClick={checkCommissioner}>
                  Commissioner
                </button>
                
              </div>

              <p className={` ${styles.paragraph}`}>
                Or Click to Continue with Metamask <br />
                {/* {ethBalance} */}
                {/* Connected account : {account} */}
                {account ? (
                  <p className="text-secondary text-[20px]">You Are Connected</p>
                ):
                (
                  <p className="text-red-900 text-[20px]">You Are Not Connected, Please Connect your MetaMask Wallet</p>
                )}
              </p>
              <div id="meta-btn" className={`meta-btn`} >
                <img src={metalogo} alt="Meta Logo" className={`meta-img`}/>
                <p className={`meta-p`}>MetaMask</p>
              </div>
              {/* {
                !isConnected && (
                  
                )
              } */}
            </div>
          </form>
        </div>
      </section>
      <Footer2 />
    </div>
  );
  
}

export default login



// handleUserClick
// handleLandInspectorClick
// handleCommissionerClick