import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // Adding both click and touch event listeners for better support
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="profile-menu">
      <div
        onClick={toggleMenu}
        className="avatar"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
      >
        <img src={user?.picture} alt="user profile" />
      </div>
      {menuOpen && (
        <div className="dropdown" role="menu">
          <div
            className="menu-item"
            role="menuitem"
            onClick={() => {
              navigate("/favourites", { replace: true });
              closeMenu();
            }}
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate("/favourites", { replace: true })
            }
          >
            Favourites
          </div>
          <div
            className="menu-item"
            role="menuitem"
            onClick={() => {
              navigate("/bookings", { replace: true });
              closeMenu();
            }}
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate("/bookings", { replace: true })
            }
          >
            Bookings
          </div>
          <div
            className="menu-item"
            role="menuitem"
            onClick={() => {
              localStorage.clear();
              logout();
              closeMenu();
            }}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && logout()}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
