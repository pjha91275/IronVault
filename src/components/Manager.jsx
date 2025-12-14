import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const notify = () => toast("Wow so easy !");

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast('Copied to Clipboard!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length >3){
    setpasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    console.log([...passwordArray, {...form, id: uuidv4()}]);
    setform({ site: "", username: "", password: "" });
    toast('Saved password!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
  }
  else{
    toast('Error: Minimum length is 4 for all the fields!');
  }
};

  const editPassword = (id) => {
    console.log("Editing password with id ", id)
    setform(passwordArray.find((item) => item.id === id));
    setpasswordArray(passwordArray.filter((item) => item.id !== id))
  };

  const deletePassword = (id) => {
    console.log("Deleting password with id ", id)
    let c = confirm("Do you really want to delete this password?");
    if(c){
        setpasswordArray(passwordArray.filter((item) => item.id !== id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)));
    toast('Password Deleted!', {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
    }
    
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

      <div className=" p-3 md: mycontainer min-h-[88.2vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          <span>Iron</span>
          <span className="text-green-500">Vault/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eyecross.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save 
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="blank">
                            {item.site}
                          </a>
                          <div
                            className="icons8copy size-7 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy.gif"
                              alt="copy icon"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div
                          className="flex items-center justify-center"
                          onClick={() => copyText(item.username)}
                        >
                          <span>{item.username}</span>
                          <div className="icons8copy size-7 cursor-pointer">
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy.gif"
                              alt="copy icon"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div
                          className="flex items-center justify-center"
                          onClick={() => copyText(item.password)}
                        >
                          <span>{item.password}</span>
                          <div className="icons8copy size-7 cursor-pointer" onClick={()=>{copyText(item.password)}}>
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy.gif"
                              alt="copy icon"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border border-white text-center ">
                          <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                            <img
                              style={{
                                width: "25px",
                                height: "25px"
                              }}
                              src="icons/edit.gif"
                              alt="edit icon"
                            />
                            </span>
                            <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                            <lord-icon
    src="https://cdn.lordicon.com/xyfswyxf.json"
    trigger="hover"
    style={{"width":"25px","height":"25px"}}>
</lord-icon>
                            </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
