import React from "react";
import { Fade } from "react-awesome-reveal";
import CustomButton from "./CustomButton";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Header from "./Header";
import { RectangleGroupIcon } from "@heroicons/react/24/outline";
import RichContent from "./RichContent";

type ArticlesListingsProps = {
  title: string;
  items: any[];
  isLoading: boolean;
  handleItemClick?: (item: any) => void;
};

const ArticlesListings: React.FC<ArticlesListingsProps> = ({
  title,
  items,
  isLoading,
  handleItemClick,
}) => {
  return (
    <div
      className="flex flex-col items-center relative pt-20 pb-20 max-md:pt-5 max-md:pb-5 gap-36 px-[10%] max-lg:px-6 max-md:gap-10 overflow-hidden bg-[#f2f4fa]"
      id="ArticlesListings"
    >
      <div className="w-full flex flex-col items-center justify-center gap-10 z-40">

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse w-full rounded-3xl border border-gray-300 bg-gray-200 p-6"
              >
                <div className="w-14 h-14 rounded-full bg-gray-300 mb-3"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full ">
            {items.map((item) => (
              <div
                key={item._id}
                className="w-full  transition-all duration-300 ease-out  backdrop-blur-xl overflow-hidden flex flex-col items-center justify-center "
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 "
                />
                <div className="py-2 ">
                  <h1 className="font-semibold text-lg text-[#2563eb]">
                    {item.title}
                  </h1>
                  <RichContent content={item.excerpt} />
                  <p className="text-sm text-gray-600">
                    {item.authors.join(",")}
                  </p>
                  <div className="flex justify-end">
                    <div onClick={() => {
                      if (item.link) {
                        window.open(item.link, "_blank");
                      } else if (item.pdf) {
                        window.open(item.pdf, "_blank");
                      } else {
                      }
                    }} className="flex items-center gap-2 hover:text-[#2563eb] cursor-pointer"><p>{
                      item.link ? "View Article" : "Read More (PDF File)"
                    }</p>  <ChevronRightIcon
                        className={`w-5 h-5`}
                      /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 font-medium">
            No Articles available at the moment. Please check back later.
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesListings;
