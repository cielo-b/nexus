import React, { useState, useEffect } from "react";
import Header from "./Header";
import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import { Fade } from "react-awesome-reveal";
import { fetchMembers } from "@/sanity/queries/others";


const Members = () => {
  const [members, setMembers] = useState<
    { name: string; description: string; image: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const fetchedMembers = await fetchMembers();
        setMembers(fetchedMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  return (
    <div
      className="flex flex-row items-center relative pt-20 pb-20 max-md:pt-5 max-md:pb-5 gap-36 px-[20%] max-lg:px-6 max-md:gap-10 overflow-hidden"
      id="members"
    >
      <img
        src="/images/dots.svg"
        alt="dots"
        className="absolute -left-7 bottom-4 z-30"
      />

      <div className="w-full flex flex-col items-center justify-center gap-5 z-40">
        <Fade>
          <Header
            title="Members"
            icon={
              <RectangleGroupIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />
            }
          />
          <h1 className="text-black font-bold text-5xl text-center max-md:text-4xl max-sm:text-3xl">
            Meet The <span className="text-[#2563eb]">Team</span>
          </h1>
          <p className="tmd:text-md max-sm:text-xs text-black/60 font-normal z-10 text-center lg:w-full max-sm:w-11/12">
            Meet the team behind all the work
          </p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse w-full rounded-3xl border border-[#2563eb] bg-gray-100 overflow-hidden"
              >
                <div className="h-64 bg-gray-300"></div>
                <div className="flex flex-col gap-2 p-5">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))
            : members.map((member, index) => (
              <div
                key={index}
                className="w-full  relative rounded-2xl h-64 "
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full rounded-2xl h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-2xl font-bold mb-2 text-white">{member.name}</h3>
                  <p className="text-lg text-white/70">{member.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
