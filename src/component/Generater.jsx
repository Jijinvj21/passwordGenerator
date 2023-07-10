import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import generatePassword from "../utilitie/passwordGenerator";
import Copy from "../utilitie/coupClipBoard";
import { auth, provider } from "../utilitie/firebaseApiConfiguration";
import { signInWithPopup } from "firebase/auth";
import { createDB } from "../utilitie/firebaseCreateCollection";
import { toast } from "react-hot-toast";

function Generater() {
  const [value, setValue] = useState(1);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [abc, setAbc] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [password, setPassword] = useState(null);
  const [Userlogin, setUserLogin] = useState("");

  const navigate = useNavigate();
  const email  = localStorage.getItem("Useremail")
 const submitNewSaveHandler = (e) => {
   
   const passwordName = e.target.passwordName.value.toLowerCase().trim();
     
   createDB(email, passwordName,password)
      
    };

  const saveHandler = () =>
    toast(
      (t) => (
       
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!e.target.passwordName.value) {
              return false;
            }
            toast.dismiss(t.id);
            return submitNewSaveHandler(e);
          }}
          className="flex flex-col items-center "
        >
          <span className="font-bold mb-4">Save Password</span>
          <span className="flex flex-col gap-2">
            <input
              type="text"
              value={password}
              name="password"
              id="password"
              disabled
              className="text-sm border rounded-md p-2"
            />
            <input
              type="text"
              placeholder="Name"
              name="passwordName"
              id="passwordName"
              className="text-sm border rounded-md p-2 text-black"
            />
          </span>
          <div className="flex gap-2 mt-2">
            <button
              className="border rounded-md text-white bg-green-400 p-2"
              type="submit"
            >
              Save
            </button>
            <button
              type="button"
              className="border rounded-md text-white bg-red-400 p-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </form>
      ),
      {
        position: "top-center",
      }
    );

   






  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlenumber = () => {
    setNumber(true);
  };
  const handleCharacter = () => {
    setCharacter(true);
  };

  const Lowercase = () => {
    setAbc(true);
  };
  const Uppercase = () => {
    setUppercase(true);
  };
  const handilGenerate = () => {
    setPassword(generatePassword(value, character, abc, uppercase, number));
  };
  const handilcopy = () => {
    Copy(password);
    toast.success( "Password Copyed" ,{ autoClose: 1 });
  };

  const handilLogin = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserLogin(data.user.email);
        localStorage.setItem("Useremail", data.user.email);
      })
      .catch((error) => {
        console.error("Error during login:", error);
        // Handle the error and provide appropriate feedback to the user
      });
  };
  

  useEffect(() => {
    setUserLogin(localStorage.getItem("Useremail"));
  }, []);

  const handilLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  

  return (
    <div className="w-9/12 mt-10   bg-slate-800 px-5 rounded-lg shadow-2xl">
      <p className="text-white font-extrabold tracking-widest text-2xl text-center m-3">
        PASSWORD GENERATOR
      </p>
      <div className="bg-indigo-400 flex justify-center my-3  rounded-md">
        <input
          value={password}
          readOnly
          className="outline-none text-white text-xl  bg-indigo-400  w-full p-2 rounded-md my-3 font-extrabold tracking-widest"
        />
        <button onClick={handilcopy}>
          <img
            className="w-8 h-8 my-auto mr-4"
            src="assets/clipboard.png"
            alt="copy"
          />
        </button>
      </div>

      <div className="range-slider flex flex-col my-1">
        <p className="rs-label font-extrabold tracking-wider text-white mb-2 text-right  ">
          Password Length {value}
        </p>
        <input
          id="rs-range-line"
          className="rs-range  accent-indigo-400 "
          type="range"
          value={value}
          min={1}
          max={20}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="cbx-3"
          className="w-5 h-5 accent-indigo-400 my-5"
          onChange={handlenumber}
        />
        <label
          htmlFor="cbx-3"
          className="p-2 text-white font-semibold tracking-wider"
        >
          Numbers ( 0-9 )
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="cbx-1"
          className="w-5 h-5 accent-indigo-400 my-5"
          onChange={handleCharacter}
        />
        <label
          htmlFor="cbx-1"
          className="p-2 text-white font-semibold tracking-wider"
        >
          Symbles ( ~!@#$%^&*()_+ )
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="cbx-2"
          className="w-5 h-5 accent-indigo-400 my-5"
          onChange={Lowercase}
        />
        <label
          htmlFor="cbx-2"
          className="p-2 text-white font-semibold tracking-wider"
        >
          Lowercase ( a-z )
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="cbx-4"
          className="w-5 h-5 accent-indigo-400 my-5 "
          onChange={Uppercase}
        />
        <label
          htmlFor="cbx-4"
          className="p-2 text-white font-semibold tracking-wider"
        >
          Uppercase ( A-Z )
        </label>
      </div>

      <button
        onClick={handilGenerate}
        className="w-full md:w-9/12 md:mx-auto flex justify-center bg-indigo-400 rounded-md my-2  md:my-10"
      >
        <img
          src="assets/generater.png"
          alt="generater"
          className="w-6 h-7 my-auto animate-spin-slow "
        />
        <p className=" px-2  text-center text-xl text-white font-semibold tracking-wider py-2  ">
          Generate
        </p>
      </button>

      <>
        {Userlogin ? (
          <>
            <div className="w-full flex justify-center">
              <button
                onClick={saveHandler}
                className="w-9/12 flex justify-center bg-indigo-400 rounded-md my-2  "
              >
                <img
                  src="assets/downlod.png"
                  alt="saved"
                  className="w-5 h-5 my-auto animate-pulse"
                />

                <p className=" px-2    text-center text-lg text-white font-semibold tracking-wider py-1  ">
                  Save Password
                </p>
              </button>
            </div>
            <div className="w-full flex-row  justify-center items-center  mb-7 md:my-10">
              <button
                onClick={() => navigate("/Saved")}
                className=" flex w-9/12 justify-center mx-auto bg-indigo-400 rounded-md my-2 px-1 "
              >
                <img
                  src="assets/saves.png"
                  alt="saved"
                  className="w-5 h-7 my-auto animate-pulse "
                />
                <p className=" pl-1    text-center text-lg  text-white font-semibold tracking-wider py-1  ">
                  Saved Passwords
                </p>
              </button>
              <button
                onClick={handilLogout}
                className=" flex w-9/12 justify-center mx-auto bg-indigo-400 rounded-md my-4 md:my-10 px-1 "
              >
                <p className=" pl-1    text-center text-lg text-white font-semibold tracking-wider py-1  ">
                  LogOut
                </p>
              </button>
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center">
            {" "}
            <button
              onClick={handilLogin}
              className="  bg-indigo-400 my-5 px-2 py-3 w-9/12 rounded-lg text-center text-lg text-white font-semibold tracking-wider"
            >
              Sign in with Google
            </button>
          </div>
        )}
      </>
    </div>
  );
}

export default Generater;
