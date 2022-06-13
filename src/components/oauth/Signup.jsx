// import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// // import { Link, useHistory } from "react-router-dom";
// import {
//   auth,
//   registerWithEmailAndPassword,
//   signInWithGoogle,
// } from "../../firebase/firebase";
// import axios from "axios";
// const SERVER_URL = "https://village-backend-finalproject.herokuapp.com/";

// function Signup(props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [user, loading, error] = useAuthState(auth);

//   const register = () => {
//     if (!name) alert("Please enter name");
//     registerWithEmailAndPassword(name, email, password);
//     if (email && password) {
//       axios
//         .post(`${SERVER_URL}/auth/newlogin`, {
//           google_id: "05f134da-b614-11ec-af3d-52146bdd15d0",
//           email: email,
//           displayName: name,
//         })
//         .then((res) => {
//           console.log("res", res);
//         })
//         .catch((err) => console.log(err));
//     }
//   };
//   useEffect(() => {
//     if (loading) return <h1>loading</h1>;

//     // if (user) props.history.push("/registerSuccee");
//   }, [user, loading]);
//   return (
//     <div className="register">
//       <div className="register__container">
//         <input
//           type="text"
//           className="register__textBox"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Full Name"
//         />
//         <input
//           type="text"
//           className="register__textBox"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="E-mail Address"
//         />
//         <input
//           type="password"
//           className="register__textBox"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button className="register__btn" onClick={register}>
//           Register
//         </button>
//         <button
//           className="register__btn register__google"
//           onClick={signInWithGoogle}
//         >
//           Register with Google
//         </button>
//         {/* <div>
//           Already have an account? <Link to="/">Login</Link> now.
//         </div> */}
//       </div>
//     </div>
//   );
// }
// export default Signup
