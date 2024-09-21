/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  LayoutDashboard,
  Settings,
  ChevronRight,
  Blocks,
  BookOpenCheck,
  MessageCircleQuestion,
  Puzzle,
  BarChart
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className={`relative ${isCollapsed ? 'min-w-[80px]' : 'min-w-[220px]'} border-r px-3  pb-10 pt-24 `}>
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2 bg-red-500"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={
          [
            {
              title:"Dashboard",
              href:"/",
              icon: LayoutDashboard,
              variant : "default"
            },
          {
            title:"Rationale",
            href:"/rationale",
            icon: Blocks,
            variant : "default"
          },
          {
            title:"Specialty",
            href:"/specialty",
            icon: BookOpenCheck,
            variant : "default"
          },
          {
            title:"Decision",
            href:"/decision",
            icon: MessageCircleQuestion,
            variant : "default"
          },
          {
            title:"Modifier",
            href:"/modifier",
            icon: Puzzle,
            variant : "default"
          },
          {
            title:"Procedure",
            href:"/procedure",
            icon: BarChart,
            variant : "default"
          },
        ]
      }
      />
    </div>
  );
}
