"use client";

import React from "react";
import TableOfContents from "../../components/TableOfContents";
import PrivacyPolicySection from "../../components/PrivacyPolicySection";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

const privacyPolicySections = [
    {
        id: "introduction",
        title: "1. Introduction",
        content: (
          <div>
            <p>
              Welcome to Nexus, operated by Nexus LTD. These Terms of Use govern your use of our mobile application ("Nexus") and web application. By accessing or using our services, you agree to comply with and be bound by these terms. If you do not agree to these terms, please do not use our services.
            </p>
          </div>
        ),
      },
      {
        id: "definitions",
        title: "2. Definitions",
        content: (
          <div>
            <p>
              <strong>"Nexus," "we," "our," "us":</strong> Refers to Nexus LTD and its services.
            </p>
            <p>
              <strong>"User," "you," and "your":</strong> Refer to anyone accessing or using our services.
            </p>
            <p>
              <strong>"Services":</strong> Refers to the mobile application, web application, and any other related services provided by Nexus LTD.
            </p>
          </div>
        ),
      },
      {
        id: "eligibility",
        title: "3. Eligibility",
        content: (
          <div>
            <p>
              To use Nexus, you must be at least 10 years old. By using our services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into a binding agreement.
            </p>
          </div>
        ),
      },
      {
        id: "account-registration",
        title: "4. Account Registration",
        content: (
          <div>
            <p>
              <strong>Account Creation:</strong> To access certain features of Nexus, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update this information as necessary.
            </p>
            <p>
              <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>
          </div>
        ),
      },
      {
        id: "use-of-services",
        title: "5. Use of the Services",
        content: (
          <div>
            <p>
              <strong>License:</strong> Nexus grants you a limited, non-exclusive, non-transferable, revocable license to use the services for personal, non-commercial purposes, subject to these Terms of Use.
            </p>
            <p>
              <strong>Prohibited Conduct:</strong> You agree not to:
            </p>
            <ul className="list-disc list-inside">
              <li>Use the services for any illegal or unauthorized purpose.</li>
              <li>Engage in any activity that interferes with or disrupts the services or servers.</li>
              <li>Attempt to gain unauthorized access to any part of the services or systems.</li>
              <li>Use the services to collect or store personal data about others without their consent.</li>
              <li>Reproduce, modify, distribute, or create derivative works based on the services without our express written permission.</li>
            </ul>
          </div>
        ),
      },
      {
        id: "data-collection-privacy",
        title: "6. Data Collection and Privacy",
        content: (
          <div>
            <p>
              Our Privacy Policy, which is incorporated by reference into these Terms of Use, explains how we collect, use, and protect your personal data. By using our services, you agree to the terms of our Privacy Policy.
            </p>
          </div>
        ),
      },
      {
        id: "intellectual-property",
        title: "7. Intellectual Property",
        content: (
          <div>
            <p>
              <strong>Ownership:</strong> All content, features, and functionality of the services, including but not limited to text, graphics, logos, icons, and software, are the exclusive property of Nexus LTD and are protected by intellectual property laws.
            </p>
            <p>
              <strong>Restrictions:</strong> You may not copy, modify, distribute, sell, or lease any part of our services or included software, nor may you reverse engineer or attempt to extract the source code of that software unless laws prohibit those restrictions or you have our written permission.
            </p>
          </div>
        ),
      },
      {
        id: "third-party-services-links",
        title: "8. Third-Party Services and Links",
        content: (
          <div>
            <p>
              Nexus may contain links to third-party websites or services that are not owned or controlled by Nexus LTD. We have no control over and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that Nexus LTD shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
            </p>
          </div>
        ),
      },
      {
        id: "disclaimers-liability",
        title: "9. Disclaimers and Limitation of Liability",
        content: (
          <div>
            <p>
              <strong>Disclaimers:</strong> The services are provided "as is" and "as available" without any warranties of any kind, either express or implied. Nexus LTD does not warrant that the services will be uninterrupted or error-free, that defects will be corrected, or that the services are free of viruses or other harmful components.
            </p>
            <p>
              <strong>Limitation of Liability:</strong> To the fullest extent permitted by applicable law, Nexus LTD shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the services; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; (iii) any interruption or cessation of transmission to or from the services; (iv) any bugs, viruses, trojan horses, or the like that may be transmitted to or through the services by any third party; (v) any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the services; and/or (vi) the defamatory, offensive, or illegal conduct of any third party.
            </p>
          </div>
        ),
      },
      {
        id: "indemnification",
        title: "10. Indemnification",
        content: (
          <div>
            <p>
              You agree to defend, indemnify, and hold harmless Nexus LTD, its affiliates, and their respective directors, officers, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from your use of and access to the services, or your violation of these Terms of Use.
            </p>
          </div>
        ),
      },
      {
        id: "termination",
        title: "11. Termination",
        content: (
          <div>
            <p>
              We may terminate or suspend your account and access to the services immediately, without prior notice or liability, if you breach any of the terms or conditions of these Terms of Use. Upon termination, your right to use the services will immediately cease. If you wish to terminate your account, you may simply discontinue using the services.
            </p>
          </div>
        ),
      },
      {
        id: "governing-law",
        title: "12. Governing Law",
        content: (
          <div>
            <p>
              These Terms of Use shall be governed and construed in accordance with the laws of Rwanda, without regard to its conflict of law provisions. You agree to submit to the personal jurisdiction of the courts located in Rwanda for the purpose of litigating all such claims or disputes.
            </p>
          </div>
        ),
      },
      {
        id: "changes-terms",
        title: "13. Changes to the Terms of Use",
        content: (
          <div>
            <p>
              At our sole discretion, we reserve the right to modify or replace these Terms of Use at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our services after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </div>
        ),
      },
      {
        id: "contact-information",
        title: "14. Contact Information",
        content: (
          <div>
            <p>
              If you have any questions about these Terms of Use, please contact us:
            </p>
            <p>Email: <a href="mailto:team.nexus@gmail.com">team.nexus@gmail.com</a>
        </p>
        <p>
          Phone: <a href="tel:+250790603658">+250790603658</a>
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
        className="absolute top-10 items-center justify-center left-10 p-2 rounded-full bg-[#2563eb17] text-[#2563eb] hover:bg-[#2563eb] flex flex-row transition-all duration-200 hover:text-white"
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
            src="images/logodark.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="w-[150px] max-sm:w-24"
          />
          <h1 className="text-6xl max-sm:text-4xl font-bold ">Terms & Conditions</h1>
          <p className="text-xl max-sm:text-ld font-medium">Last updated on 14th June 2024</p>
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
