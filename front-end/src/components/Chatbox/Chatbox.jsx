import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import Login from "./Login";
// import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";
const SERVER_URL = "http://localhost:8080";

function Chatbox() {
  //   const [id, setId] = useLocalStorage("id");
  const [id, setId] = useState("");
  const loginFunction = () => {
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setId(res.data.id);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loginFunction();
  }, []);
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <div>test</div>;
}

export default Chatbox;
