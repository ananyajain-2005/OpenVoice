'use client';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserContext from "../context/userContext";
import axios from "axios";

const Dashboard = ({ userName }) => {
  const { user, loading } = useContext(UserContext);
  const [accept, setAccept] = useState(true);
  const router = useRouter();
  const [message, setMessage] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/message/${user.userName}`);
        setMessage(res.data.message || []);
      } catch (err) {
        console.log("Error fetching messages:", err.message);
      };
    }
    fetchData();
  }, [user])

  if (loading) return <p className="flex justify-center items-center h-screen text-lg font-medium">Wait a mintue...</p>;

  if (!user) return <p>Loading dashboard...</p>;

  const profile = typeof window !== "undefined"
    ? `${window.location.origin}/u/${user.userName}`
    : "";

  const copyLink = () => {
    navigator.clipboard.writeText(profile);
    alert("Link copied ✅");
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-4xl mt-10 font-bold">User Dashboard</h1>
      <p className="text-[#0B2E33] text-xl mt-4">Copy Your Unique Link</p>
      <div className="flex items-center gap-3 w-[40vw]">
        <input
          value={profile}
          readOnly
          className="flex-grow p-3 border rounded-lg bg-gray-200"
        />
        <button
          onClick={copyLink}
          className="bg-black text-white px-5 py-2 rounded-lg flex-shrink-0"
        >
          Copy
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold my-5">Your Voices Is Here...</h1>
        <div className="flex flex-wrap gap-4 items-center">
          {message.map((msg) => (
            <div
              key={msg._id}
              className="bg-[#B8E3E7] rounded-xl px-4 py-3 shadow-md max-w-full w-fit break-words">
              <p className="text-sm">
                {msg.message}
              </p>
              <span className="block text-xs text-gray-800 mt-3 text-right">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;