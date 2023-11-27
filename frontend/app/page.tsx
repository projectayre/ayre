"use client";
import { Divider, Textarea } from "@nextui-org/react";
import { SketchfabModel } from "../components/SketchfabModel";
import { AnswerCard } from "@/components/answer-card";
import { RadarChart } from "@/components/chart";
import DragDrop from "@/components/drap-drop";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import formSubmit from "@/components/formSubmit";

const responseData = {
  // image: "https://example.com/image.jpg",
  // description: "This is the description of the answer.",
};

export default function Home() {
  return (
    <section className="grid justify-items-center">
      <div className=" grid grid-flow-col items-center gap-10 p-6 pr-40">
        <div className="grid justify-items-center max-w-full">
          <SketchfabModel />
        </div>
        <div className="">
          <AnswerCard responseData={responseData} />
        </div>
      </div>
      <Divider />
      <div className="grid items-center">
        <DragDrop />
      </div>
    </section>
  );
}
