'use client';
import { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { username } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/message/send", {
        userName:username,
        message,
      });
      toast.success("Message sent anonymously 🎉");
      setMessage("");
    } catch (err) {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#B8E3E9] flex flex-col justify-center items-center gap-9">
        <h1 className="text-4xl font-bold -my-[10px]">Public Profile Link</h1>
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">

        <h1 className="text-3xl font-semibold mb-2 text-center">
          Send Anonymous Message
        </h1>

        <p className="text-center text-gray-600 mb-5">
          to <span className="font-semibold">@{username}</span>
        </p>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your anonymous message here..."
          className="w-full h-32 border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#0B2E33]"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="w-full mt-4 bg-[#0B2E33] text-white py-2 rounded-lg hover:opacity-90"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          Your identity will remain hidden
        </p>
      </div>
    </div>
  );
};

export default Profile;
