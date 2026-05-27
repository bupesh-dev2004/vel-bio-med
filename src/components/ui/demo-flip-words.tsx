import React from "react";
import { FlipWords } from "./flip-words.js";

export function FlipWordsDemo() {
  const words = ["better", "clinical", "beautiful", "modern"];

  return (
    <div className="h-[20rem] flex justify-center items-center px-4 bg-slate-950 text-white rounded-3xl">
      <div className="text-2xl md:text-4xl mx-auto font-normal text-neutral-400">
        Build
        <FlipWords words={words} className="text-amber-500 font-bold" /> <br />
        websites with Aceternity UI
      </div>
    </div>
  );
}
