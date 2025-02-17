import { FC } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import RichContent, { Content } from "./RichContent";

interface QuestionProps {
  question: string;
  answer: Content[];
  handleChange: (isExpanded: boolean) => void;
  panel: string;
  expanded: boolean;
}

const Question: FC<QuestionProps> = ({
  question,
  answer,
  handleChange,
  panel,
  expanded,
}) => {
  return (
    <section className={`flex h-full w-full flex-wrap box rounded-xl items-center justify-center gap-4 transition-all duration-1000 overflow-hidden ${expanded ? "shadow-xl shadow-[#2563eb]/20" : "shadow-md shadow-[#080F34]/5"}`}>
      <Accordion
        expanded={expanded}
        onChange={(event, isExpanded) => handleChange(isExpanded)}
        style={{
          boxShadow: `none`,
          background: "#ffffff",
          borderRadius: 16,
        }}
        className={`miniTablet:pb-[2rem] w-full rounded-none p-2 shadow-none`}
      >
        <AccordionSummary
          expandIcon={
            expanded ? (
              <AiOutlineMinusCircle className={`text-3xl fill-[#2563eb]`} />
            ) : (
              <AiOutlinePlusCircle className={`text-3xl fill-[#2563eb]`} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <span className="flex w-full text-[#000912] rounded-xl items-center justify-between text-lg font-medium transition-all duration-700 3xl-400:text-lg lg-max:text-base lg-max:tracking-normal lg-max:font-semibold md-min:text-sm md-min2:text-base md-min2:p-0 sm-min:text-sm xsm-min:text-xs max-md:text-md max-sm:text-sm">
            {question}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <span className="font-normal text-[#000912]/50 lg:text-md max-md:text-sm">
            <RichContent content={answer} />
          </span>
        </AccordionDetails>
      </Accordion>
    </section>
  );
};

export default Question;
