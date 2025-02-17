import React from "react";
import Link from "next/link";

interface FooterLinkItem {
  name: string;
  link: string;
}

interface FooterLinkSection {
  title: string;
  items: FooterLinkItem[];
}

interface Props {
  links: FooterLinkSection[];
}

const GroupedLinks: React.FC<Props> = ({ links }) => {
  return (
    <div className='w-full justify-between items-start flex max-lg:flex flex-wrap gap-6'>
      {links.map((section, index) => (
        <div key={index} className='flex flex-col gap-[24px] max-lg:w-[45%]'>
          <h3 className='text-[#000912] font-semibold text-xl max-sm:text-lg'>
            {section.title}
          </h3>
          <div>
            <ul className='flex flex-col gap-[12px] max-sm:gap-[8px]'>
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.link}
                    className='text-[#000912]/50 max-sm:text-sm'
                    {...(section.title === "Social" && item.link !== "#"
                      ? { target: "_blank" }
                      : {})}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupedLinks;
