import React, { useContext, useRef, useState } from "react";
import { userContext } from "../Context/userContext";
import firebase from "../firebase/clientApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";
import Link from "next/link";

function Chatroom() {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const messageRef = firestore.collection("message");
  const query = messageRef.orderBy("createdAt").limit(25);
  const { user } = useContext(userContext);
  const dummy = useRef();
  const [formValue, setFormValue] = useState("");
  const [message] = useCollectionData(query, { idField: "id" });

  const sendMessage = async (e) => {
    const { uid, photoURL } = auth.currentUser;
    e.preventDefault();
    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      name: user.displayName,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  const signOut = () => {
    auth.signOut();
  };
  return (
    <>
      {user && (
        <div className="flex bg-gray-900 justify-center min-h-screen">
          <div className="w-[60%] flex flex-col">
            <div className="h-16 bg-transparent text-gray-400 border-2 gap-2 p-2 border-gray-600 flex items-center mt-4 rounded">
              <div>
                <img className="h-12 rounded" src={user.photoURL} alt="" />
              </div>
              <p>{user.displayName}</p>
              <div className="justify-self-end ml-auto text-xl">
                <Link onClick={signOut} href="/">
                  <FontAwesomeIcon
                    className="w-5 p-3 hover:bg-slate-800 hover:text-red-500 duration-200 rounded-full h-5"
                    icon={faRightFromBracket}
                  />
                </Link>
              </div>
            </div>
            <div className="w-full h-[85vh] p-2 overflow-y-scroll scroll">
              {message &&
                message.map((msg, index) => {
                  return <Message message={msg} key={index} />;
                })}
              <span ref={dummy}></span>
            </div>
            <div
              onSubmit={sendMessage}
              className="w-full flex mt-auto mb-4 justify-self-end"
            >
              <form className="flex gap-2 w-full">
                <input
                  required
                  type="text"
                  className="
                    w-full
                    p-2
                    text-sm
                    font-normal
                    text-white
                    bg-transparent
                    rounded
                    transition
                    ease-in-out
                    focus:text-white outline-0
                    border-2
                    border-gray-600
                    h-10
                  "
                  onChange={(e) => setFormValue(e.target.value)}
                  value={formValue}
                  placeholder="Message"
                />
                <button
                  type="submit"
                  className="text-gray-600 h-10 w-10 hover:bg-slate-300 duration-200 hover:text-gray-900 cursor-pointer border-gray-600 rounded border-2 p-2"
                >
                  <FontAwesomeIcon icon={faAngleUp} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatroom;
