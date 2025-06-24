import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NavItem = ({ icon, text, to, active = false, darkMode }) => {
  const handleHover = (e) => {
    e.target.style.backgroundColor = darkMode ? "#495057" : "#C5E4F3";
  };

  const handleLeave = (e) => {
    e.target.style.backgroundColor = "transparent";
  };

  return (
    <li className="nav-item">
      <RouterLink
        className={`nav-link ${active ? 'active' : ''} ${darkMode ? 'text-light' : 'text-dark'}`}
        to={to}
        style={{ borderRadius: "4px", transition: "background-color 0.3s" }}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <i className={`fas fa-${icon} me-2`}></i> {text}
      </RouterLink>
    </li>
  );
};

const Sidebar = ({ darkMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 992) {
      setIsMobile(true);
      setIsSidebarOpen(false);  // Initially collapse the sidebar on mobile
    } else {
      setIsMobile(false);
      setIsSidebarOpen(true);   // Keep the sidebar open on larger screens
    }
  };

  useEffect(() => {
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(dark => !dark);
  };

  const navItems = [
    { icon: 'chart-line', text: 'Dashboard', to: '/dashboard', active: true },
    { icon: 'list', text: 'My Listings', to: '/properties' },
    { icon: 'house', text: 'Home', to: '/' }
  ];

  return (
    <>
      {/* Toggle Button (only shows on mobile/tablet) */}
      {isMobile && (
        <button
          className="btn btn-primary"
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 2000,
            background: "transparent",
            border: "none",
            fontSize: "36px",  // Increase the size
            color: "black",    // Make the icon black
            transition: "color 0.3s"
          }}
        >
          {isSidebarOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`sidebar p-3 min-vh-100 ${isSidebarOpen ? 'show' : 'hide'} col-8 col-md-4 col-lg-2`}
        style={{
          backgroundColor: darkMode ? "#343a40" : "#E2F4FE",
          color: darkMode ? "#f8f9fa" : "#212529",
          transition: "transform 0.3s ease-in-out, background-color 0.3s",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1500,
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)"
        }}
      >
        <h5 className="mb-4 p-2">{darkMode ? "La Maison 🖤" : "La Maison 💙"}</h5>
        <hr className="mb-3" style={{ borderColor: darkMode ? "#6c757d" : "#000" }} />
        <ul className="nav flex-column">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              text={item.text}
              active={item.active}
              to={item.to}
              darkMode={darkMode}
            />
          ))}
        </ul>
      </div>

      {/* Background Overlay when sidebar is open on small screens */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1400
          }}
        />
      )}
    </>
  );
};

export default Sidebar;


