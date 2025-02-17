import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import RichContent from "./RichContent";
import Link from "next/link";

interface CareerProps {
  title: string;
  description: any;
  panel: string;
  expanded: boolean;
  link: string;
  handleChange: (isExpanded: boolean) => void;
}

const Career = ({
  title,
  description,
  panel,
  expanded,
  link,
  handleChange,
}: CareerProps) => {
  return (
    <div className="w-full">
      <div
        className={`bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 ${
          expanded ? "shadow-lg" : "hover:shadow-md"
        }`}
      >
        <button
          className="w-full px-6 py-4 text-left flex items-center justify-between group transition-all duration-300"
          onClick={() => handleChange(!expanded)}
          aria-expanded={expanded}
          aria-controls={`${panel}-content`}
        >
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 group-hover:border-blue-600 transition-all duration-300">
            {expanded ? (
              <MinusIcon className="w-4 h-4 text-blue-600 transition-transform duration-300 transform scale-100" />
            ) : (
              <PlusIcon className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-transform duration-300 transform scale-100" />
            )}
          </div>
        </button>
        
        <div
          id={`${panel}-content`}
          className={`grid transition-all duration-300 ease-in-out ${
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className={`px-6 pb-4 transition-all duration-300 ${
              expanded ? "translate-y-0" : "-translate-y-4"
            }`}>
              <div className="prose max-w-none text-gray-600 mb-6">
                <RichContent content={description} />
              </div>
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Apply Now
                <svg 
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;