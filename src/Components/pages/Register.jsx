// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import Image from "../images/Avatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    const res = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(res);

    const storageRef = ref(storage, displayName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // const cover = addOn+image.name;
    // const storage = getStorage();
    const upload = uploadBytesResumable(storageRef, displayName).then(() => {
      getDownloadURL(storageRef).then(async function (url) {
        console.log(url);

        await updateProfile(res.user, {
          displayName,
          photoURL: url
        });

        addDoc(collection(db, "users"), {
          displayName,
          photoURL: url
        });

        addDoc(collection(db, "userChats"), {});
      });
    });
    navigate("/");
  };

  return (
    <>
      <div className="formcontainer">
        <div className="formwrapper">
          <h4 className="text-center">LamaChat</h4>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Display Name" />
            <input type="email" name="" id="" placeholder="Email" />
            <input type="password" name="pwd" id="" placeholder="password" />
            <input type="file" name="" id="fileInput" />
            <label className="fileSection" htmlFor="fileInput">
              <img src={Image} alt="" />
              <p className="">Add an Avatar</p>
            </label>
            <button class="Navbar-button" type="submit">
              SignUp
            </button>
          </form>
          <p className="loginMsg">
            Already SignedUp?<Link to="/login">Login</Link>
          </p>
          {err && <span>Something Went Wrong</span>}
        </div>
      </div>
    </>
  );
}
