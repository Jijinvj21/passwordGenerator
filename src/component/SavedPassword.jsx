import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { getData } from "../utilitie/firebaseGetData";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../utilitie/firebasePasswordDelete";
import { toast } from "react-hot-toast";

function SavedPassword() {
  const [passwordData, setPasswordData] = useState();

  const [passwordgetData, setPasswordGetData] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem("Useremail");
    getData(email)
      .then((data) => {
        const allpost = data.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setPasswordData(allpost);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [passwordgetData]);

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "13px",
        fontWeight: "bold",
        background: "#818cf8",
      },
    },
  };

  createTheme(
    "solarized",
    {
      text: {
        primary: "white",
        secondary: "white",
      },
      background: "transparent",
      divider: {
        default: "grey",
      },
    },
    "dark"
  );
  const handilDelete = (id) => {
    const email = localStorage.getItem("Useremail");
    deleteData(email, id).then((data) => {
      setPasswordGetData(true);
    });
    setPasswordGetData(false);
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.passwordName,
    },
    {
      name: "Password",
      selector: (row) => row.Password,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <button
            onClick={() =>
              toast(
                () => (
                  <div className="flex flex-col gap-2">
                    <span className="font-bold">Delete Password</span>
                    <span className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={row.passwordName}
                        name="name"
                        id="name"
                        disabled
                        className="text-sm border rounded-md p-2"
                      />
                    </span>
                    <div className="flex justify-between gap-2 mt-2">
                      <button
                        className="border rounded-md text-white bg-green-400 p-2"
                        type="submit"
                        onClick={() => {
                          handilDelete(row.id);
                          toast.dismiss();
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="border rounded-md text-white bg-red-400 p-2"
                        onClick={() => toast.dismiss()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ),
                {
                  position: "top-center",
                }
              )
            }
            className="p-2 bg-violet-400 rounded"
          >
            Delete
          </button>
        </>
      ),
    },
  ];


  return (
    <div className="flex justify-center">
      <div className="w-9/12 m-5 px-1 bg-slate-800 rounded-lg shadow-2xl">
        <p className="p-3 tracking-widest text-xl text-white font-semibold text-center">
          Saved Password
        </p>

      
        <DataTable
          
          className={`min-w-max `}
          columns={columns}
          data={passwordData}
          fixedHeader
          customStyles={tableCustomStyles}
          responsive
          highlightOnHover
          persistTableHead
          pagination
          theme="solarized"
          noDataComponent={
            <p className="my-8 font-semibold">No saved passwords.</p>
          }
        />
        
        <div
          onClick={() => navigate("/")}
          className="w-full p-3 flex justify-center"
        >
          <button className="text-white text-lg font-extrabold tracking-widest bg-violet-400 p-3 w-5/12 rounded-xl  ">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default SavedPassword;
