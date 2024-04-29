"use client";
import { AddBoundary } from "@/components/add-boundary";
import { Boundary, BoundaryProps, TopBoundary } from "@/components/boundary";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Universe } from "@/components/universe";

import { useEffect, useState } from "react";

export default function Home() {
  const [boundaries, setBoundaries] = useState<BoundaryProps[]>([]);
  const [boundaryValues, setBoundaryValues] = useState<BoundaryProps | null>(null);
  const [universeBGShown, setUniverseBGShown] = useState(false);
  const [showLecture, setShowLecture] = useState(false);

  useEffect(() => {
    let localItem = localStorage.getItem("boundary");
    if (localItem === "undefined" || localItem === undefined) {
      localStorage.clear();
    }
    if (localItem === null) {
      return;
    } else {
      setBoundaryValues(JSON.parse(localItem));
    }
  }, []);

  function handleStorageChange() {
    let boundary = localStorage.getItem("boundary");
    if (boundary === null) return;
    setBoundaryValues(JSON.parse(boundary!));
  }

  function changeTopBoundary(boundary: BoundaryProps) {
    setBoundaries((prev) => [...prev, boundary]);
    setBoundaryValues(boundary);
  }

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function handleReset() {
    localStorage.clear();
    setBoundaryValues(null);
    setBoundaries([]);
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="h-screen w-full absolute -z-10 bg"></div>
      <div className="custom-grid w-[75vw] justify-center items-center">
        <Toggle
          onClick={() => setUniverseBGShown(!universeBGShown)}
          className="button1 bg-background border hover:text-foreground"
        >
          Arka Planı {universeBGShown ? "Gizle" : "Göster"}
        </Toggle>

        <AddBoundary changeTopBoundary={changeTopBoundary} />

        {/* <h1 className="text-2xl font-bold tracking-tight col-start-3 col-end-5 mx-auto">Davranış Özgürlüğü</h1> */}

        <Toggle
          onClick={() => setShowLecture(!showLecture)}
          className="button5 bg-background border hover:text-foreground"
        >
          Eğitimi {showLecture ? "Gizle" : "Göster"}
        </Toggle>

        <Button variant="destructive" className="button6" onClick={handleReset}>
          Sıfırla
        </Button>

        <Universe
          showLecture={showLecture}
          universeBGShown={universeBGShown}
          className="universe"
          boundaryValues={boundaryValues}
        >
          {boundaryValues && <TopBoundary color={boundaryValues.color} radius={boundaryValues.radius} />}
          {boundaries.map((boundary, index) => (
            <Boundary key={index} name={boundary.name} color={boundary.color} radius={boundary.radius} />
          ))}
        </Universe>
      </div>
    </div>
  );
}
