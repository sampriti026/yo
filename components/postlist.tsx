import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';


interface Post {
  id: string;
  userId: string;
  text: string;
  timestamp: number;
  username: string;
}

interface PostListProps {
  userId: string;
}

const PostList: React.FC<PostListProps> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(unsubscribe, (snapshot: any) => {
      setPosts(
        snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  return (

       <div className="w-full max-w-md mx-auto">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="px-4 py-2">
            <p className="text-gray-700 text-base">{post.text}</p>
            <p className="text-gray-500 text-sm mt-1">{post.username}</p>
          </div>
          <div className="px-4 py-2">
          <button>
  <FontAwesomeIcon icon={faReply} />
</button>

          </div>
        </div>
      ))}
   </div>
  );
};

export default PostList;
