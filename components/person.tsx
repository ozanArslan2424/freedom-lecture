"use client";
import { useEffect, useState } from "react";

type Props = {};

export const Person = (props: Props) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowRight"
      ) {
        event.preventDefault();
        setRotation((r) => {
          if (r >= 5) {
            return r - 10;
          } else {
            return r + 5;
          }
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <PersonSVG size={96} rotation={rotation} />;
};
// --------------------------------------------------------------------------------------------

const PersonSVG = ({ size, rotation }: { size: number; rotation: number }) => {
  return (
    <svg
      width={size + "px"}
      height={size + "px"}
      viewBox="0 0 210 297"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute z-[9999] w-min h-min transition-all duration-75"
      style={{
        rotate: `${rotation}deg`,
        transformOrigin: "left top",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <defs id="defs1" />
      <g id="layer1">
        <path
          d="M 104.99979,151.72149 A 69.933304,70.516075 0 0 0 35.066593,222.2376 H 174.93351 a 69.933304,70.516075 0 0 0 -69.93372,-70.51611 z"
          style={{ strokeWidth: 1.276, strokeLinecap: "round", strokeLinejoin: "round" }}
          id="path2"
        />
        <ellipse
          style={{
            fill: "#000000",
            fillOpacity: 1,
            strokeWidth: 0.724749,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          id="path1-2"
          cx="105"
          cy="103.20293"
          rx="39.721081"
          ry="40.052086"
        />
      </g>
    </svg>
  );
};
