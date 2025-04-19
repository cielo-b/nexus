const teams = [
  {
    title: "📊 Research & Innovation Team",
    description:
      "The Research & Innovation Team leads the development of high-impact studies from design to insight. They transform complex policy and development challenges into evidence that guides real-world decisions. Combining interdisciplinary expertise with curiosity and rigor, they ensure each project delivers practical, ethical, and meaningful outcomes that advance social progress and inform smarter strategies.",
  },
  {
    title: "🧪 Data Quality & Systems Team",
    description:
      "This team safeguards the accuracy, integrity, and efficiency of our research operations. They develop quality assurance systems, implement automated monitoring tools, and troubleshoot data issues in real time. With strong technical and analytical skills, they ensure Insight Nexus consistently delivers data that is reliable, valid, and ready to drive confident decision-making.",
  },
  {
    title: "🧠 Analytics & Technical Support Team",
    description:
      "Experts in statistical modeling, impact evaluation, and econometrics, this team supports technical excellence across projects. They advise on methodology, build analytical tools, and turn raw data into evidence-rich narratives. Their innovations strengthen how we measure change, unpack outcomes, and ensure that research findings are both precise and policy-relevant.",
  },
  {
    title: "🔍 Research Operations Team",
    description:
      "Our Research Operations Team ensures seamless fieldwork execution, managing logistics, workflows, and research protocols. They coordinate teams, train staff, and maintain ethical standards on the ground. Their understanding of local dynamics and data collection realities bridges research design with field delivery—ensuring all studies are conducted smoothly, professionally, and with community respect.",
  },
  {
    title: "📋 Program Management Team",
    description:
      "The Program Management Team oversees the full life cycle of research projects, ensuring all activities meet deadlines, standards, and objectives. They coordinate internal teams, partners, and client expectations, while proactively managing risks. Their leadership keeps Insight Nexus agile, responsive, and always focused on delivering impactful, on-time, and ethically sound work.",
  },
  {
    title: "🧭 Field Engagement Team",
    description:
      "This team forms the human connection between Insight Nexus and the communities we serve. Made up of highly trained enumerators, supervisors, moderators, and translators, they collect high-quality data in diverse environments. Their professionalism, cultural sensitivity, and deep local knowledge ensure ethical, respectful engagement and accurate, trustworthy information gathering across all contexts.",
  },
  {
    title: "📢 Partnerships & Communications Team",
    description:
      "From building donor relationships to shaping strategic proposals, this team grows our reach and influence. They communicate our research clearly and persuasively to diverse stakeholders. Their expertise in partnership-building, messaging, and storytelling ensures our work resonates with policymakers, funders, and the public, turning results into actionable insights and lasting collaborations.",
  },
  {
    title: "💼 Finance & People Team",
    description:
      "This team manages Insight Nexus’s financial health and organizational growth. They oversee audits, budgeting, procurement, and regulatory compliance, while also leading recruitment and talent development. Their dual focus ensures operational excellence and employee wellbeing, creating a work culture where teams thrive, careers grow, and the organization stays transparent, resilient, and people-centered.",
  },
];


export default function OurTeams() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          Our teams
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {teams.map((team) => (
            <div
              key={team.title}
              className="group p-6 md:p-8 rounded-xl bg-card hover:bg-accent/50 transition-colors duration-300 border shadow-sm hover:shadow-md"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                  {team.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {team.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
