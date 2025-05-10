import { useThemeStyles } from "@/utils";
import type { ReactNode } from "react";

interface TitleProps {
  icon: ReactNode;
  title: string;
}

export const TitleSection: React.FC<TitleProps> = ({ icon, title }) => {
  // Get theme styles
  const themeStyles = useThemeStyles();

  return (
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${themeStyles.lightBg}`}>
        <div className={`h-6 w-6 ${themeStyles.text}`}>{icon}</div>
      </div>
      <h1 className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
        {title}
      </h1>
    </div>
  );
};
