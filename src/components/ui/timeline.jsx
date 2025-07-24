"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 text-center">
        <h2 className="mb-4 max-w-4xl text-lg text-white md:text-4xl mx-auto text-center">
          Changelog of my journey
        </h2>
        <p className="max-w-sm text-sm text-neutral-300 md:text-base mx-auto text-center">
          I&apos;ve been working on Aceternity for the past 2 years. Here&apos;s
          a timeline of my journey.
        </p>
      </div>
      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={index}
              className="relative flex justify-center pt-10 md:pt-40"
            >
              {/* Timeline item container */}
              <div
                className={`flex w-full items-center justify-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Content side */}
                <div
                  className={`w-5/12 ${isLeft ? "pr-8 text-right" : "pl-8 text-left"}`}
                >
                  <div className="rounded-lg border border-neutral-700 p-6 shadow-lg">
                    <h3 className="mb-3 text-xl font-bold text-neutral-200 md:text-2xl">
                      {item.title}
                    </h3>
                    <div className="text-neutral-600">{item.content}</div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="flex w-2/12 items-center justify-center">
                  <div className="z-20 h-4 w-4 rounded-full border-4 border-white bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"></div>
                </div>

                {/* Empty side for spacing */}
                <div className="w-5/12"></div>
              </div>
            </div>
          );
        })}

        {/* Center vertical line - Spans full timeline height */}
        <div
          className="absolute left-1/2 top-0 z-0 w-[4px] -translate-x-1/2 transform overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-600 to-transparent to-[99%]"
          style={{
            height: height + "px",
          }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[4px] rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-blue-500 via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
