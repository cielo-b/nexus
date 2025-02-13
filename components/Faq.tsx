import React, { useState, useEffect } from "react";
import Header from "./Header";
import Question from "./Question";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { Fade } from "react-awesome-reveal";
import { fetchFaqs } from "@/sanity/queries/others";
import { Content } from "./RichContent";

const Faq = () => {
  const [questions, setQuestions] = useState<
    { question: string; answer: Content[]; panel: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const faqs = await fetchFaqs();
        const formattedFaqs = faqs.map((faq: any, index: number) => ({
          question: faq.title,
          answer: faq.answer,
          panel: `panel${index + 1}`,
        }));
        setQuestions(formattedFaqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFaqs();
  }, []);

  const handleChange = (panel: string) => (isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col items-center relative pt-20 pb-20 gap-10 lg:px-[20%] px-6 overflow-hidden bg-[#f2f4fa]">
      <img
        src="/images/gradient.svg"
        alt="zigs"
        className="absolute w-2/5 -top-1/3 -left-1/4 z-30"
      />
      <img
        src="/images/gradient.svg"
        alt="zigs"
        className="absolute w-2/5 -bottom-1/3 -right-1/4 z-30"
      />
      <Fade>
        <div className="flex flex-col items-center justify-center gap-10 w-full max-sm:gap-6">
          <Header
            title="FAQs"
            icon={
              <QuestionMarkCircleIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />
            }
          />
          <h1 className="text-[#000912] font-bold text-5xl text-center max-md:text-4xl max-sm:text-3xl">
            Maybe Your <span className="text-[#2563eb]">Question</span> Is One
            Of These
          </h1>
          <p className="text-md text-[#000912]/70 text-center md:text-md max-sm:text-xs lg:text-center">
            Find answers to commonly asked questions about our services here.
            Can't find what you're looking for? Feel free to reach out to us for
            personalized assistance.
          </p>
        </div>
      </Fade>

      <div className="flex flex-wrap justify-center gap-5 w-full">
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse w-full bg-white p-4 rounded-xl shadow-md"
            >
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))
          : questions.map((question, idx) => (
            <Question
              key={idx}
              expanded={expanded === question.panel}
              handleChange={handleChange(question.panel)}
              question={question.question}
              panel={question.panel}
              answer={question.answer}
            />
          ))}
      </div>
    </div>
  );
};

export default Faq;
