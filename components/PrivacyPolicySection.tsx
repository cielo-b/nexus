import React, { ReactNode } from 'react';

// Define the type for the props
interface PrivacyPolicySectionProps {
    id: string;
    title: string;
    children: ReactNode;
}

const PrivacyPolicySection: React.FC<PrivacyPolicySectionProps> = ({ id, title, children }) => {
    return (
        <section id={id} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            {children}
        </section>
    );
};

export default PrivacyPolicySection;
