"use client";
import { Divider, Textarea } from "@nextui-org/react";
import { SketchfabModel } from "../components/SketchfabModel";
import { AnswerCard } from "@/components/answer-card";
import { RadarChart } from "@/components/chart";
import DragDrop from "@/components/drap-drop";

// import { Model } from '../components/New_surface_study_2';

export default function Home() {
  return (
    <section className="grid gap-4 justify-center">
      <div className=" grid grid-row-3 grid-flow-col items-center gap-2 p-8">
        <div>
          <AnswerCard />
        </div>
        <div className=" items-center justify-center max-w-full">
          <SketchfabModel />
        </div>
        <div className=" grid justify-center gap-14">
          {/* <AnswerCard /> */}
          <RadarChart />
          <DragDrop />

          {/* <AnswerCard /> */}
          {/* <Divider /> */}
        </div>
      </div>
      <div>
        <Divider />
        <Textarea
          className="p-1 font-size-md"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
          size="full"
        />
      </div>
    </section>
  );
}
