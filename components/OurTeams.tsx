const teams = [
    {
      title: "Research Team",
      description:
        "The Research Team is responsible for all technical and analytical work, from design through analysis. Team members are multidisciplinary experts who share a passion for data, intellectual curiosity, and a commitment to positive social impact.",
    },
    {
      title: "Data Team",
      description:
        "The Data Team is responsible for all data collection operations. Our full-time Data Team members have expertise in project management and field work coordination, complemented by a solid understanding of the country context. Our team includes both quantitative and qualitative data specialists.",
    },
    {
      title: "Data Quality Team",
      description:
        "The Data Quality Team designs and implements tools and processes to monitor and improve the quality of our work, including automating processes to ensure top data quality. Team members come from a range of different academic backgrounds, and share excellent analytical and operational skills, and a keen eye for detail.",
    },
    {
      title: "Program Team",
      description:
        "The Program Team is responsible for the day to day management of our research projects. Program Team members are multidisciplinary experts in project management, data collection, field logistics and the implementation of research projects.",
    },
    {
      title: "Economist and Innovations Team",
      description:
        "The Economist and Innovations Team provides cross-project support on the technical aspects of research projects, from research design to power calculations to econometric analysis techniques. This team also leads several innovations initiatives which focus on developing tools to help researchers carry out more efficient, impactful work.",
    },
    {
      title: "Field Team",
      description:
        "Field Team members are hired on a project basis and include enumerators, field coordinators, field supervisors, data auditors, moderators, and translators. Candidates for the field team must have a Bachelor's degree, be fluent in the local language and conversant in English. Candidates should also have the ability to work effectively in rural and remote areas, often for extended periods.",
    },
    {
      title: "Business Development and Communications Team",
      description:
        "The Business Development and Communications Team leads the development of proposals and partnerships at InsightNexus, as well as all internal and external communications. Based in InsightNexus's Amsterdam office, the team brings experience in science communications, public policy, and international development.",
    },
    {
      title: "Finance and People Team",
      description:
        "The Finance and People team keeps InsightNexus on track, leading all financial operations for the company including office registration, annual audits, tax compliance, and procurement. The People team leads InsightNexus's recruitment and career development policy, including overseeing InsightNexus's commitment to learning and supporting team members to develop and follow their chosen career paths.",
    },
  ]
  
  export default function OurTeams() {
    return (
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Our teams</h2>
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
                  <p className="text-muted-foreground leading-relaxed">{team.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  