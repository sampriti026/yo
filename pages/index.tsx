import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  db,
  googleProvider,
  logout,
} from "../firebase";
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import PostInput from "../components/postinput";
import PostList from "../components/postlist";

type User = {
  uid: string;
  name: string;
  email: string;
};

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName || "",
          email: user.email || "",
        });
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex coloumn ">
      {user ? (
        <>
          <p>{user.name}</p>
          <button onClick={logout}>Sign Out</button>
          <PostInput userId={user.uid}  username={user.name}/>
      <PostList userId={user.uid} />
        </>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}


    </div>
  );
};

export default Home;
