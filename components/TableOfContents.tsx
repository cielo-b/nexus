import React from 'react';

// Define the type for each section
interface Section {
    id: string;
    title: string;
}

// Define the type for the props
interface TableOfContentsProps {
    sections: Section[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
    return (
        <nav className="bg-gray-100 p-4 rounded-md shadow-md w-[27%] sticky max-lg:w-full max-lg:bottom-12  max-lg:relative align-middle lg:right-36 lg:bottom-10">
            <h2 className="text-xl font-bold mb-2">Table of Contents</h2>
            <ul className=" list-inside space-y-2">
                {sections.map(section => (
                    <li key={section.id} className=' w-full'>
                        <a href={`#${section.id}`} className="hover:text-[#2563eb] h-full w-full hover:bg-[#2563eb13] rounded-md p-2">{section.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TableOfContents;
