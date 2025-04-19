"use client";

import React from "react";
import TableOfContents from "../../components/TableOfContents";
import PrivacyPolicySection from "../../components/PrivacyPolicySection";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

const privacyPolicySections = [
  {
    id: "general-information",
    title: "1. General Information",
    content: (
      <div>
        <p>Company Name and Contact Information:</p>
        <p>
          <strong>Company Name:</strong> Nexus Insights LTD
        </p>
        <p>
          <strong>Address:</strong> Rwanda, Kigali City, Kicukiro
        </p>
        <p>
          <strong>Email:</strong> team.nexusinsights@gmail.com
        </p>
        <p>
          <strong>Phone:</strong> +250790603658
        </p>
      </div>
    ),
  },
  {
    id: "data-collection",
    title: "2. Data Collection",
    content: (
      <div>
        <p>
          <strong>Types of Data Collected:</strong>
        </p>
        <ul className="list-disc list-inside ">
          <li>
            Personal Identification Information: This includes your name, email
            address, and phone number, which are collected when you register or
            use our services.
          </li>
          <li>
            Real-Time Location: We collect your real-time location to analyze
            insights and enhance the contextual relevance of the data provided.
          </li>
          <li>
            Insights Interaction History: We maintain records of your
            interactions with the app, such as the insights accessed, queries
            made, and preferences to provide tailored recommendations.
          </li>
          <li>
            IP Address: Your IP address is collected to monitor usage trends,
            troubleshoot technical issues, and ensure the app's security.
          </li>
          <li>
            Device Information: We collect details about the device you use,
            such as the model, operating system, and unique identifiers to
            optimize performance and improve your app experience.
          </li>
          <li>
            App Usage Data: This includes data on the frequency, duration, and
            nature of your engagement with the app, helping us optimize content
            and services.
          </li>
          <li>
            Cookies and Tracking Technologies: We use cookies and similar
            technologies to track your activity and enhance functionality while
            using the app.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "data-usage",
    title: "3. Data Usage",
    content: (
      <div>
        <p>We use the collected data for the following purposes:</p>
        <ul className="list-disc list-inside">
          <li>
            To Provide and Enhance the Service: Ensuring the app functions
            optimally and improves over time.
          </li>
          <li>
            To Personalize Insights: Tailoring the data and recommendations
            based on your usage and interaction history to provide relevant
            insights.
          </li>
          <li>
            To Send Notifications and Updates: Informing you about new features,
            data trends, and app updates.
          </li>
          <li>
            To Improve Customer Service: Enhancing the support provided to users
            through feedback and assistance.
          </li>
          <li>
            For Analytics and Research: Using aggregated data to refine and
            develop new features and improve the user experience.
          </li>
          <li>
            For Legal and Regulatory Compliance: Meeting legal requirements and
            responding to law enforcement requests if applicable.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "data-sharing",
    title: "4. Data Sharing",
    content: (
      <div>
        <p>
          We share data with the following third parties for specific purposes:
        </p>
        <ul className="list-disc list-inside">
          <li>
            Rwanda National Police: We may share relevant data to assist in
            national security and analytics for regulatory purposes.
          </li>
          <li>
            Research Partners: In certain cases, we may share anonymized data
            with research partners for the development of insights and reports.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "data-storage-security",
    title: "5. Data Storage and Security",
    content: (
      <div>
        <p>
          <strong>Data Storage:</strong> All collected data is stored securely
          on government-monitored servers in Rwanda, designed with robust
          security measures.
        </p>
        <p>
          <strong>Data Retention:</strong> We retain data for as long as
          necessary to provide services. Users may request data deletion, and we
          will comply as per legal and regulatory requirements.
        </p>
        <p>
          <strong>Security Measures:</strong> We implement state-of-the-art
          encryption, firewalls, and monitoring systems to safeguard your data.
        </p>
      </div>
    ),
  },
  {
    id: "user-rights",
    title: "6. User Rights",
    content: (
      <div>
        <p>
          <strong>Access and Correction:</strong> You have the right to access
          and update your personal data. If you need corrections or want to view
          the data we have, contact us at team.nexusinsights@gmail.com.
        </p>
        <p>
          <strong>Data Deletion:</strong> You may request the deletion of your
          personal data at any time. We will act on your request unless
          obligated by law to retain certain information.
        </p>
        <p>
          <strong>Data Portability:</strong> You can request a copy of your
          personal data in a standard, machine-readable format.
        </p>
        <p>
          <strong>Opt-Out:</strong> You can opt-out of data collection for
          non-essential services by adjusting settings in the app or by
          contacting us.
        </p>
      </div>
    ),
  },
  {
    id: "cookies-tracking",
    title: "7. Cookies and Tracking Technologies",
    content: (
      <div>
        <p>
          <strong>Cookies:</strong> We use cookies to enhance the user
          experience and track activity within the app to personalize insights.
        </p>
        <p>
          <strong>Tracking Technologies:</strong> We use additional tracking
          technologies, including pixels, for gathering and analyzing user data
          to improve service delivery.
        </p>
      </div>
    ),
  },
  {
    id: "children-privacy",
    title: "8. Children's Privacy",
    content: (
      <div>
        <p>
          Our app is intended for users aged 13 and above. We do not knowingly
          collect personal information from children under the age of 13. If we
          are notified of such data collection, we will promptly remove the
          information. Parents or guardians can contact us at
          team.nexusinsights@gmail.com if they believe their child’s data has
          been collected.
        </p>
      </div>
    ),
  },
  {
    id: "changes-policy",
    title: "9. Changes to the Privacy Policy",
    content: (
      <div>
        <p>
          We may update our Privacy Policy to reflect changes in our practices.
          We will notify users via email about significant updates and post the
          new policy with the revised effective date. We encourage you to review
          it periodically.
        </p>
      </div>
    ),
  },
  {
    id: "legal-compliance",
    title: "10. Legal Compliance",
    content: (
      <div>
        <p>
          This Privacy Policy is governed by the laws of Rwanda. Disputes will
          be resolved under Rwandan law, and if you use our services from
          outside Rwanda, your data will be transferred and processed within
          Rwanda.
        </p>
      </div>
    ),
  },
  {
    id: "contact-information",
    title: "11. Contact Information",
    content: (
      <div>
        <p>
          If you have questions regarding this Privacy Policy or wish to
          exercise your rights, please contact us:
        </p>
        <p>
          <strong>Email:</strong> team.nexusinsights@gmail.com
        </p>
        <p>
          <strong>Phone:</strong> +250790603658
        </p>
      </div>
    ),
  },
];

const page = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className=" w-full h-full pt-24 flex flex-col bg-[#F8FCFA]">
      <button
        onClick={handleBackClick}
        className="absolute top-10 left-10 p-2 rounded-full justify-center items-center bg-[#2563eb17] text-[#2563eb] hover:bg-[#2563eb] flex flex-row transition-all duration-200 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        Back
      </button>
      <div className="w-full  flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center gap-3">
          <img
            src="images/logo.png"
            alt="logo"
            width={1000}
            height={1000}
            className="w-[150px] max-sm:w-24"
          />
          <h1 className="text-6xl max-sm:text-4xl font-bold ">
            Privacy Policy
          </h1>
          <p className="text-xl max-sm:text-ld font-medium">
            Last updated on 14th June 2024
          </p>
        </div>
        <div className="flex flex-row pt-20 px-36 max-lg:px-10 h-fit relative max-lg:flex-col-reverse items-end justify-between">
          <div className="w-[70%] max-lg:w-full h-fit">
            {privacyPolicySections.map((section) => (
              <PrivacyPolicySection
                key={section.id}
                id={section.id}
                title={section.title}
              >
                {section.content}
              </PrivacyPolicySection>
            ))}
          </div>
          <TableOfContents sections={privacyPolicySections} />
        </div>
      </div>
    </div>
  );
};

export default page;
