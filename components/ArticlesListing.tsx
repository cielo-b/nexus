import React from "react";
import { Fade } from "react-awesome-reveal";
import CustomButton from "./CustomButton";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Header from "./Header";
import { RectangleGroupIcon } from "@heroicons/react/24/outline";

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
        <Fade>
          <Header
            title={title}
            icon={
              <RectangleGroupIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />
            }
          />
        </Fade>

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
                <h1 className="font-semibold text-lg text-[#2563eb] m-3">
                  {item.title}
                </h1>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-contain"
                />
                <div className="p-3 space-y-4">
                  <p className="font-semibold text-base text-black line-clamp-1">
                    {item.excerpt}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.authors.join(",")}
                  </p>
                  <div className="flex justify-end">
                    <CustomButton
                      handleClick={() => {
                        if (item.link) {
                          window.open(item.link, "_blank");
                        } else if (item.pdf) {
                          window.open(item.pdf, "_blank");
                        } else {
                        }
                      }}
                      title={
                        item.link ? "View Article" : "Read More (PDF File)"
                      }
                      containerStyles="max-h-fit"
                      rightIcon={
                        <ChevronRightIcon
                          className={`group-hover:stroke-[#2563eb] w-6 h-6 stroke-white max-md:hidden `}
                        />
                      }
                    />
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
