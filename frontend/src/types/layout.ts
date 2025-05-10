import React from "react";
import type { LucideProps } from "lucide-react";

export interface SidebarContent {
  path: string;
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}
