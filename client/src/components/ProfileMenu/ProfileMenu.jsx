import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="profile-menu">
      <div
        onClick={toggleMenu}
        className="avatar"
        aria-expanded={menuOpen}
        aria-haspopup="true"
      >
        <img src={user?.picture} alt="user profile" />
      </div>
      {menuOpen && (
        <div className="dropdown">
          <div
            className="menu-item"
            onClick={() => {
              navigate("./favourites", { replace: true });
              closeMenu();
            }}
          >
            Favourites
          </div>
          <div
            className="menu-item"
            onClick={() => {
              navigate("./bookings", { replace: true });
              closeMenu();
            }}
          >
            Bookings
          </div>
          <div
            className="menu-item"
            onClick={() => {
              localStorage.clear();
              logout();
              closeMenu();
            }}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
