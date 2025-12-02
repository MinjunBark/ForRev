import { useState } from 'react';

interface NavItemProps {
    label: string;
    icon?: string;
    onClick?: () => void;
}

export default function NavItem({ label, icon, onClick } : NavItemProps){
    const [isHovered, setIsHovered] = useState(false);


    return (
        <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        style={{
            padding: "14px 16px",
            marginBottom: "8px",
            background: isHovered
            ? "linear-gradient(135deg, rgba(0,198,255,0.2) 0%, rgba(0,114,255,0.2) 100%)"
            : "transparent",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            transform: isHovered ? "translateX(8px)" : "translateX(0)",
            border: isHovered ? "1px solid #00c6ff" : "1px solid transparent",
            display: "flex",
            alignItems: "center",
            gap: "12px",
        }}
        >
        {icon && <span style={{ fontSize: "20px" }}>{icon}</span>}
        <span style={{ fontSize: "15px", fontWeight: "500", color: "#f5f5f5" }}>
            {label}
        </span>
        </div>
    );
}