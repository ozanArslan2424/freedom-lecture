"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { BoundaryProps } from "./boundary";
import { Lecture } from "./lecture";
import { Person } from "./person";

type Props = {
  boundaryValues?: BoundaryProps | null;
  children: React.ReactNode;
  className?: string;
  universeBGShown?: boolean;
  showLecture?: boolean;
};

export const Universe = ({ children, boundaryValues, className, universeBGShown, showLecture }: Props) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const movement = 50;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (boundaryValues) {
        const boundaryRadius = boundaryValues.radius * 2;
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
      } else if (!boundaryValues) {
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
  }, [position.top, position.left, movement, boundaryValues]);

  return (
    <div
      className={cn(
        "relative rounded-lg border overflow-hidden bg-transparent text-card-foreground shadow-sm p-6 w-full h-full",
        className
      )}
    >
      <Person />
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -z-10 w-[1000vw] h-[1000vh] transition-all duration-75w bg-background",
          universeBGShown && "circles"
        )}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: "translate(-46.25%, -45.5%)",
        }}
      >
        {children}
      </div>
      {showLecture && <Lecture />}
    </div>
  );
};
