"use client"

import { motion } from "framer-motion"
import { Briefcase, Users, Clock, GraduationCap } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function RecruitmentProcess() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Equal Opportunity Statement */}
      <motion.div
        className="text-gray-700 bg-gray-50 p-4 rounded-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p>
          InsightNexus is committed to creating a diverse environment and is proud to be an equal opportunities
          employer. All qualified applicants will receive consideration for employment without regard to race, religion,
          gender, gender identity or expression, sexual orientation, national origin, genetics, disability, age or
          veteran status.
        </p>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        className="text-3xl font-bold text-center flex  text-gray-900 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Recruitment process
      </motion.h1>

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Full-time Positions */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <div className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Full-time positions</h2>
          </div>
          <p className="text-gray-600">
            The process varies according to the team we are recruiting for. In general, the process has four steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-4">
            <li>
              We ask candidates to complete online multiple choice questionnaires to assess general numeracy and
              literacy skills.
            </li>
            <li>
              Successful candidates are then invited to complete a job application form and upload their CV and cover
              letter.
            </li>
            <li>
              Candidates applying for research team positions are also requested to analyze a dataset and write a short
              memo as a test of their analytical skills.
            </li>
            <li>Successful applicants are then invited to a series of interviews.</li>
          </ol>
        </motion.div>

        {/* Field Team */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Field team</h2>
          </div>
          <p className="text-gray-600">
            The recruitment process for enumerator and moderator roles is conducted in three steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-4">
            <li>
              We first screen candidates on their CV, cover letters and written samples. We are looking for excellent
              academic credentials (a Bachelor&apos;s degree is a minimum requirement) and relevant professional
              experience.
            </li>
            <li>
              Next, we ask candidates to complete an online logic and aptitudes test and a short essay in English to
              assess language skills.
            </li>
            <li>Finally, we invite successful candidates for an interview.</li>
          </ol>
        </motion.div>

        {/* Rolling Applications */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Rolling applications</h2>
          </div>
          <p className="text-gray-700">
            Full-time vacancies are typically managed on a rolling basis, and they may be advertised more than once if
            they are live. We review applications and invite candidates to participate in our assessment and interview
            process in the order in which they apply. We accept applications until we have a candidate succeed in all
            stages of the assessment process.
          </p>
          <p className="text-gray-700">
            At that point, we close applications and progress all other candidates who are not in the last round with
            this assessment process. When we have one or more successful candidates, we select our new colleague from
            this pool. Everyone who applies has their application reviewed and is given a fair chance.
          </p>
        </motion.div>

        {/* Open Applications */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <div className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Open applications</h2>
          </div>
          <p className="text-gray-700">
            Open applications are an integral part of InsightNexus&apos;s recruitment process. We monitor open
            applications often and we have hired candidates that reach us via this path.
          </p>
          <p className="text-gray-700">
            Successful open application candidates are added to InsightNexus&apos;s shortlist and fast-tracked through
            the recruitment process as vacancies become available. InsightNexus considers open applications for these
            profiles: Research Analyst, Research Associate and Senior Research Associate.
          </p>
          <p className="text-gray-700">
            For more information and details on how to apply, please refer to the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Job Description
            </a>
            .
          </p>
        </motion.div>
      </motion.div>

      {/* Internships Section - Full width, aligned right */}
      <motion.div variants={fadeInUp} className="mt-8 md:w-1/2 md:text-left space-y-4">
        <div className="flex items-start gap-3">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Internships</h2>
        </div>
        <div className="space-y-4 text-gray-700">
          <p>
            Internships in our Research and Innovations teams are suited to candidates who are completing or have
            recently completed a Master&apos;s degree in a relevant discipline (such as international development,
            economics, statistics or computer science), and have a working knowledge of data.
          </p>
          <p>
            Internships in the Data Quality team are suited to candidates who have recently completed a relevant
            Bachelor&apos;s degree and are motivated to work in research for social impact.
          </p>
          <p>
            All our internships are paid and they are advertised in our vacancies page. The recruitment process is
            similar to that followed for hiring core team members.
          </p>
          <p>
            Internships in our East African offices are reserved for candidates who are East African nationals or
            studying in the region. In the Netherlands, we can only offer internships to candidates with an existing
            right to work in the EU.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

