"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { ThreeDCardDemo } from "./experience-card";

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
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-8">
        <h2 className="mx-auto mb-4 max-w-4xl text-center text-lg text-white md:text-4xl">
          Changelog of my journey
        </h2>
        <p className="mx-auto max-w-sm text-center text-sm text-neutral-300 md:text-base">
        </p>
      </div>
      <div ref={ref} className="relative mx-auto max-w-7xl">
        {data.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={index}
              className={`relative flex justify-center ${index === 0 ? 'pt-10' : 'pt-10'} ${index === data.length - 1 ? 'pb-20' : ''} md:pt-10`}
            >
              {/* Timeline item container */}
              <div
                className={`flex w-full items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Content side */}
                <div className="w-5/12">
                  <ThreeDCardDemo />
                </div>

                {/* Center dot - aligned with the line */}
                <div className="flex w-2/12 items-center justify-center">
                  <div className="z-20 h-4 w-4 rounded-full border-4 border-white bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"></div>
                </div>

                {/* Empty side for spacing */}
                <div className="w-5/12"></div>
              </div>
            </div>
          );
        })}

        {/* Center vertical line - Spans from first to last dot */}
        <div
          className="absolute top-10 left-1/2 z-0 w-[4px] -translate-x-1/2 transform overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-600 to-transparent to-[99%]"
          style={{
            height: `calc(${height}px - 430px)`,
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
