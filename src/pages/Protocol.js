import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import Header from "../components/Header";
import "../assets/card.css";
import { useParams } from "react-router-dom";

const Protocol = () => {
  const [protocol, setProtocol] = useState();
  let { id } = useParams();
  console.log(id);
  const docRef = doc(db, "protocols", id);

  const getInfo = async () => {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProtocol(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      <Header />
      
    </div>
  );
};

export default Protocol;
