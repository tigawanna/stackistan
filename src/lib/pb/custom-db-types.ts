export const industries = [
  "Education",
  "Research",
  "Construction",
  "Design",
  "Accounting",
  "Environmental Services",
  "Human Resources",
  "Consulting",
  "Trading",
  "Energy & Mining",
  "Manufacturing",
  "Automotive",
  "Aviation & Aerospace",
  "Chemicals",
  "Food Production",
  "Healthcare",
  "Finance",
  "Hospitality",
  "Sports",
  "Arts & Entertainment",
  "Real Estate",
  "Legal",
  "Consumer Goods",
  "Agriculture",
  "Media & Communications",
  "Software & IT Services",
  "Transportation & Logistics",
] as const;

export interface StackistanResumeProfileEducation {
  school: string;
  qualification: "Certificate" | "Bachelors" | "Masters" | "PhD" | "other";
  fieldOfStudy: string;
  from: string;
  to: string;
}

export interface StackistanResumeProfileProjects {
name: string;
description: string;
link: string
}

export interface StackistanResumeProfileSkills{
  name: string;
  level: number;
}

export interface StackistanResumeProfileActivities{
  name: string;
  description: string;
  link: string
}

export interface StackistanResumeProfileExperience {
  company: string;
  job_title: string;
  job_description: string;
  location: string;
  achievements: string;
  from: string;
  to: string;
}

export interface StackistanCompaniesTechstack {}
