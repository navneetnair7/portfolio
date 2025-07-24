import { BackgroundLines } from "~/components/ui/macbook-scroll";
import { NameTitle } from "~/components/ui/name-title";
import { LoadingScreen } from "~/components/ui/loading-screen";
import { FloatingNav } from "~/components/ui/floating-navbar";
import { Timeline } from "~/components/ui/timeline";
import { TextGenerateEffect } from "~/components/ui/about-reveal";

export default function HomePage() {
  return (
    <LoadingScreen duration={6000}>
      <BackgroundLines className="" svgOptions={{}}>
        <FloatingNav
          navItems={[
            { name: "About", link: "/#" },
            { name: "Experience", link: "/experience" },
            { name: "Projects", link: "/projects" },
            { name: "Contact", link: "/contact" },
          ]}
          className={"fixed top-0 left-0 z-50 w-full bg-transparent backdrop-blur-md border-b border-gray-200 dark:border-gray-800"}
        />
        <div className="flex min-h-screen items-center justify-center" id="about">
          <div className="h-96 w-full max-w-4xl">
            <NameTitle text={"navneet nair"} duration={0.3} />
          </div>
        </div>
        <div className="flex flex-col min-h-auto mb-96 items-center justify-center px-4">
          <div className="text-white text-center">about me</div>
          <div className="w-full max-w-4xl">
            <TextGenerateEffect
              words={
                "I am a passionate front-end developer. I love creating interactive web applications. I enjoy learning new technologies. I strive to write clean and maintainable code"
              }
              className="text-center text-2xl text-white"
            />
          </div>
        </div>
        <Timeline
          data={[
            {
              title: "Started Learning React",
              content:
                "I began my journey with React in 2020, building small projects and learning the fundamentals.",
            },
            {
              title: "Joined a Tech Community",
              content:
                "In 2021, I joined a local tech community where I met other developers and participated in hackathons.",
            },
            {
              title: "Contributed to Open Source",
              content:
                "I started contributing to open source projects on GitHub, which helped me gain real-world experience.",
            },
            {
              title: "Landed My First Job",
              content:
                "In 2022, I landed my first job as a front-end developer, working on a large-scale web application.",
            },
          ]}
        />
      </BackgroundLines>
    </LoadingScreen>
  );
}
