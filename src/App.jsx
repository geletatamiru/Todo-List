import React, { useEffect, useState } from 'react';
import { getDoc } from 'firebase/firestore';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, createUserProfileDocument } from './firebase/firebase';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (!userRef) return;  // Prevent errors if userRef is null/undefined

        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const createdAt = userData.createdAt ? userData.createdAt.toDate().toISOString() : null;
          setUser({ id: userSnap.id, ...userData, createdAt });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);  // ✅ Run only once to prevent infinite loops

  return (
    <div className='todo-app'>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}
