import React from 'react'
import { signOut, auth } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import "./Header.css";
export default function Header({user}) {
  console.log(user);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      console.log("User signed out successfully!");
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };
  return (
    <div className='header'>
      <h1>{user.displayName}</h1>
      <button onClick={handleSignOut} className="logout-btn">
        Logout
      </button>
    </div>
  )
}
