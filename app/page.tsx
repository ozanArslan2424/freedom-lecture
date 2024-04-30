"use client";
import { AddBoundary } from "@/components/add-boundary";
import { Boundary } from "@/components/boundary";
import { Lecture } from "@/components/lecture";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Universe } from "@/components/universe";
import { BoundaryProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [boundaryList, setBoundaryList] = useState<BoundaryProps[]>([]);
  const [topBoundary, setTopBoundary] = useState<BoundaryProps | null>(null);

  const [bgShown, setBgShown] = useState(false);
  const [lectureShown, setLectureShown] = useState(false);

  function changeTopBoundary(boundary: BoundaryProps) {
    setTopBoundary(boundary);
    setBoundaryList((prev) => [...prev, boundary]);
  }

  function handleReset() {
    setTopBoundary(null);
    setBoundaryList([]);
  }

  return (
    <div className="h-screen w-full page-grid bg pb-8 pt-4 px-16">
      <header className="header">
        <h1 className="text-4xl font-bold text-neutral-100">Özgürlük Sunum Aracı</h1>
        <Link
          href="https://github.com/ozanArslan2424"
          className="text-neutral-100 px-3 py-1 mr-16 h-max text-2xl font-semibold"
        >
          Ozan Arslan
        </Link>
        <div className="aspect-square flex flex-col gap-2 items-center size-14 absolute right-16 top-4 hover:pt-12 transition-all z-10 hover:size-80 group">
          <Image
            src={"https://github.com/ozanArslan2424.png"}
            alt="Ozan Arslan"
            width={320}
            height={320}
            className="aspect-square rounded-full"
          />
        </div>
      </header>
      <div className="buttons">
        <Toggle onClick={() => setBgShown(!bgShown)} className="bg-background border hover:text-foreground">
          Arka Planı {bgShown ? "Gizle" : "Göster"}
        </Toggle>
        <Toggle onClick={() => setLectureShown(!lectureShown)} className="bg-background border hover:text-foreground">
          Eğitimi {lectureShown ? "Gizle" : "Göster"}
        </Toggle>
        <div></div>
        <div></div>
        <AddBoundary changeTopBoundary={changeTopBoundary} />
        <Button variant="destructive" onClick={handleReset}>
          Sıfırla
        </Button>
      </div>

      <Universe bg={bgShown} lecture={lectureShown} topBoundary={topBoundary}>
        {boundaryList.map((boundary, index) => (
          <Boundary key={index} zIndex={index} name={boundary.name} color={boundary.color} radius={boundary.radius} />
        ))}
      </Universe>
      {lectureShown && <Lecture />}
    </div>
  );
}
