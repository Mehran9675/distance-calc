"use client";
import usePost from "@/lib/hooks/usePost";
import END_POINTS from "@/lib/constants/endPonts";
import { DotsVerticalIcon, ValueIcon } from "@radix-ui/react-icons";
import UnionIcon from "@/lib/icons/union.svg";
import Show from "@/lib/show";
import { ReactNode, useEffect } from "react";
import { Button, LoadingOverlay, Tooltip } from "@mantine/core";
import Link from "next/link";
import ROUTES from "@/lib/constants/routes";

export default function Results() {
  const { post, response, isPosting } = usePost<{
    distances: Record<string, any>;
    totalDistance: number;
  }>(END_POINTS.DISTANCES);

  const params =
    typeof window !== "undefined" ? new URLSearchParams(location.search) : null;

  useEffect(() => {
    if (!params) return;
    const body: { journey: Record<string | number, string> } = { journey: {} };
    for (const key of params.keys()) {
      if (key !== "date" && key !== "count")
        body.journey[key] = params.get(key) || "";
    }
    post(body);
  }, []);

  const renderDots = () => {
    if (!response) return;
    const renders: ReactNode[] = [];
    const arr = Object.keys(response.distances);
    arr.forEach((key, index) => {
      return renders.push(
        <>
          <ValueIcon />
          <Tooltip
            withArrow
            opened
            position="left"
            color="gray"
            offset={20}
            label={`${response.distances[key].distance.toFixed(2)} Km`}
          >
            <DotsVerticalIcon className="my-2" />
          </Tooltip>
          <Show if={index == arr.length - 1}>
            <UnionIcon />
          </Show>
        </>
      );
    });

    return renders;
  };

  const renderDestinations = () => {
    if (!response) return;
    const renders = [];
    let index = 0;
    for (const key in response.distances) {
      const isLast = !response.distances[index + 1];
      renders.push(
        <>
          <span key={key}>{response.distances[key].from}</span>
          <Show if={isLast}>
            <span key={key}>{response.distances[key].to}</span>
          </Show>
        </>
      );
      ++index;
    }
    return renders;
  };

  return (
    <div className="relative flex flex-col items-center w-full min-h-full">
      <LoadingOverlay visible={isPosting} overlayBlur={10} />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {renderDots()}
        </div>
        <div className="flex flex-col justify-between space-y-[22px] ml-4">
          {renderDestinations()}
        </div>
      </div>
      <span className="text-blue-400 mt-10">
        {response?.totalDistance.toFixed(2) || ""}
        <span className="text-slate-700"> Km is total distance</span>
      </span>
      <span className="text-blue-400 mt-5">
        {(params && (params as any).get("count")) || ""}
        <span className="text-slate-700"> passengers</span>
      </span>
      <span className="text-blue-400 mt-5">
        {new Date(
          (params && (params as any).get("date")) || ""
        ).toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
      <Link href={ROUTES.HOME}>
        <Button color="dark" className="mt-5 bg-stone-800">
          Back
        </Button>
      </Link>
    </div>
  );
}
