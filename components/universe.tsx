"use client";
import { BoundaryProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Person } from "./person";

type Props = {
  children?: React.ReactNode;
  topBoundary?: BoundaryProps | null;
  bg: boolean;
  lecture: boolean;
};

export const Universe = ({ children, topBoundary, bg, lecture }: Props) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const movement = 50;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (topBoundary) {
        const boundaryRadius = topBoundary.radius * 2;
        let newTop = position.top;
        let newLeft = position.left;
        switch (event.key) {
          case "ArrowUp":
            newTop = position.top + movement;
            break;
          case "ArrowLeft":
            newLeft = position.left + movement;
            break;
          case "ArrowDown":
            newTop = position.top - movement;
            break;
          case "ArrowRight":
            newLeft = position.left - movement;
            break;
          default:
            break;
        }
        // Check if the new position is within the circular boundary
        if (newTop ** 2 + newLeft ** 2 <= boundaryRadius ** 2) {
          setPosition({ top: newTop, left: newLeft });
        }
      } else if (!topBoundary) {
        switch (event.key) {
          case "ArrowUp":
            setPosition((pos) => ({ ...pos, top: pos.top + movement }));
            break;
          case "ArrowLeft":
            setPosition((pos) => ({ ...pos, left: pos.left + movement }));
            break;
          case "ArrowDown":
            setPosition((pos) => ({ ...pos, top: pos.top - movement }));
            break;
          case "ArrowRight":
            setPosition((pos) => ({ ...pos, left: pos.left - movement }));
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [position.top, position.left, movement, topBoundary]);

  return (
    <div className="universe relative rounded-lg shadow-sm border overflow-hidden">
      <Person />
      <div
        className={cn("w-[1000vw] h-[1000vh] transition-all duration-75w relative", bg ? "circles" : "bg-background")}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: "translate(-45.38%, -45.8%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};
