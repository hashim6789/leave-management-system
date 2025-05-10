// Footer.tsx
import type { Role } from "@/types";
import { useThemeStyles } from "@/utils";
import React from "react";

interface FooterProps {
  role: Role;
}

export const Footer: React.FC<FooterProps> = ({ role }) => {
  const userRole = role === "admin" ? "Admin" : "Mentor";
  // Get styles based on current theme
  const styles = useThemeStyles();

  return (
    <footer
      className={`
        h-16 
        border-t
        flex items-center justify-center
        ${styles.navBg}
        ${styles.border}
        ${styles.textSecondary}
        text-sm
      `}
    >
      © 2025 {userRole} Dashboard. All rights reserved.
    </footer>
  );
};
