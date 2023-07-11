import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "./Header";
import { getAuth, updateProfile } from "firebase/auth";
import { Footer } from "./Footer";

const Account = () => {
  const { user, logout } = UserAuth();
  const [displayName, setDisplayName] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Account;


// const uploadFiles = async (images) => {
//   const imageUrls = []; // Array to store the image URLs
//   for (let i = 0; i < images.length; i++) {
//     const imageRef = ref(
//       storage,
//       `/images/${username}/${getTimestampInSeconds()}`
//     );
//     try {
//       await uploadBytes(imageRef, images[i]);
//       console.log("success");
//       const imageUrl = await getDownloadURL(imageRef);
//       imageUrls.push(imageUrl); // Store the image URL in the array
//       console.log(imageUrl);
//       console.log(imageUrls);
//     } catch (error) {
//       console.log("error:", error);
//     }
//   }
//   return setimageURLS(imageUrls);
// };