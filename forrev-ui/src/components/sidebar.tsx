import NavItem from "./NavItem";
import { useEffect, useRef, useState } from "react";

interface SideBarProps {
  currentUser: string | null;
  onLogout: () => void;
  onLogin: () => void;
}

export default function SideBar({
  currentUser,
  onLogout,
  onLogin,
}: SideBarProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    };

    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen]);

  const handleProfileClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleViewProfile = () => {
    setIsDropDownOpen(false);
    window.location.href = `/profile/${currentUser}`;
  };

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
        color: "white",
        padding: "32px 20px",
        boxShadow: "4px 0 20px rgba(0,0,0,0.5)",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Header Section */}
      <div
        style={{
          marginBottom: "32px",
          paddingBottom: "24px",
          borderBottom: "2px solid #333",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px",
          }}
        >
          {" "}
          ForRev
        </h1>
        <p style={{ color: "#666", fontSize: "13px", marginBottom: "20px" }}>
          ANYTHING
        </p>

        {/* User Profile Section */}
        {currentUser ? (
          <div
            ref={dropdownRef}
            style={{
              marginTop: "20px",
              position: "relative",
            }}
          >
            <div
              onClick={handleProfileClick}
              style={{
                padding: "12px",
                background: "rgba(0,198,255,0.1)",
                borderRadius: "10px",
                border: "1px solid rgba(0,198,255,0.3)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,198,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,198,255,0.1)";
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {currentUser.charAt(0).toUpperCase()}
                </div>
                <div style={{ overflow: "hidden", flex: 1 }}>
                  <p style={{ color: "#999", fontSize: "11px", margin: 0 }}>
                    {" "}
                    Welcome Back!
                  </p>
                  <p
                    style={{
                      color: "#f5f5f5",
                      fontSize: "14px",
                      fontWeight: "600",
                      margin: "2px 0 0 0",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {currentUser}
                  </p>
                </div>
                {/* Dropdown arrow */}
                <div
                  style={{
                    fontSize: "12px",
                    color: "#999",
                    transform: isDropDownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  ▼
                </div>
              </div>
            </div>

            {/* Dropdown Menu */}
            {isDropDownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  background: "#1a1a1a",
                  border: "1px solid rgba(0,198,255,0.3)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                  zIndex: 1000,
                  overflow: "hidden",
                }}
              >
                {/* View Profile Option */}
                <div
                  onClick={handleViewProfile}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "#f5f5f5",
                    fontSize: "14px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0,198,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span>👤</span>
                  <span>View Profile</span>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "#333",
                    margin: "4px 0",
                  }}
                />

                {/* Logout Button in Dropdown */}
                <div
                  onClick={() => {
                    setIsDropDownOpen(false);
                    onLogout();
                  }}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "#dc3545",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(220,53,69,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onLogin}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "10px 16px",
              background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(0,198,255,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0,198,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,198,255,0.3)";
            }}
          >
            {" "}
            Login
          </button>
        )}
      </div>
      {/* Navigation Tab */}
      <nav>
        <NavItem label="Event" icon="📅" onClick={() => window.location.href = '/'}/>
        <NavItem label="Invite" icon="✉️" />
      </nav>
    </div>
  );
}
