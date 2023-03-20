import { useState } from 'react';
import { db } from '../firebase';
import 'firebase/firestore';
import { addDoc, collection, Timestamp } from "firebase/firestore";

interface PostInputProps {
  userId: string;
  username: string;
}

const PostInput: React.FC<PostInputProps> = ({ userId, username }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    const postRef = collection(db, "posts");
    await addDoc(postRef, {
      userId,
      text,
      username,
      timestamp: Date.now(),
    });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's happening?"
        maxLength={280}
      />
      <button type="submit">Tweet</button>
    </form>
  );
};

export default PostInput;
