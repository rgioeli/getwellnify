"use client";
import { dateToElapsedTimeAgo } from "@/utils/dateToElapsedTime";
import { useEffect, useState } from "react";

export default function TimePassed({ date }: { date: Date }) {
  const [time, setTime] = useState<string | null>();

  useEffect(() => {
    setTime(dateToElapsedTimeAgo(date instanceof Date ? date : new Date(date)));
  }, []);

  return <p>{time}</p>;
}
