import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Avatar from "./Avatar";

function Navbar() {
  const [authData, setAuthData] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const getProfilePhotoSrc = (base64Image) => {
    if (!base64Image) return null;
    if (base64Image.startsWith("/9j/"))
      return `data:image/jpeg;base64,${base64Image}`;
    if (base64Image.startsWith("iVBORw0KGgo"))
      return `data:image/png;base64,${base64Image}`;
    return null; 
  };
  useEffect(() => {
    const storedAuthData = localStorage.getItem("authdata");
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      const base64Image = getProfilePhotoSrc(parsedAuthData.profilePhoto);
      console.log(parsedAuthData);
      setAuthData({
        ...parsedAuthData,
        profilePhoto: base64Image,
      });
    }
  }, [params]);

  const handleLogout = () => {
    localStorage.removeItem("authdata");
    setAuthData(null); 
    navigate("/");
  };


  return (
    <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-14 py-1">
      <div>
        <Link to={"/"}>
          <h1 className="text-2xl text-dustyrose font-bold">Your TO-DO</h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {authData ? (
          <>
            {/* Avatar for logged-in user */}
            <Avatar
              src={authData.profilePhoto}
              alt={authData.username || "fs"}
              fallback={authData.username}
            />
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-dustyrose text-white px-4 py-2 rounded-lg hover:bg-freshbasil"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/signup"
            className="bg-freshbasil text-white px-4 py-2 rounded-lg hover:bg-dustyrose"
          >
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
