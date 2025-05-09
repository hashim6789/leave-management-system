import React from "react";
import { useTime } from "react-timer-hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CurrentTimeDisplay: React.FC = () => {
  const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });

  return (
    <Card className="w-fit mx-auto p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Current Time
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center gap-2 text-3xl font-bold">
        <span>{hours.toString().padStart(2, "0")}:</span>
        <span>{minutes.toString().padStart(2, "0")}:</span>
        <span>{seconds.toString().padStart(2, "0")} </span>
        <span className="uppercase">{ampm}</span>
      </CardContent>
    </Card>
  );
};

export default CurrentTimeDisplay;
