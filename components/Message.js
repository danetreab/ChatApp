import React, { useContext } from "react";
import { userContext } from "../Context/userContext";
import firebase from '../firebase/clientApp';
import 'firebase/compat/auth';
function Message(props) {
  const { user } = useContext(userContext);
  const { text, name, photoURL, uid } = props.message;
  const auth = firebase.auth();
  const messageClass = uid === auth.currentUser.uid ? 'send' : 'received'
  return (
    <div className={`flex  items-center m-2 gap-2 ${messageClass === 'send' ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="w-10 h-10"><img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} className="rounded-full" alt="" /></div>
      <div className="w-fit max-w-xs h-fit bg-slate-700 px-2 py-1 rounded-r-lg rounded-tl-lg flex flex-col flex-wrap text-gray-200">
        <p className="text-gray-200">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Message;
