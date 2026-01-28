export const USER_PROGRAMS = [
  {
    id: 1,
    first_name: "Sarah",
    profilePic: "https://randomuser.me/api/portraits/women/74.jpg",
    study_goal: "Exam Preparation",
    age: 20,
    study_days: 5,
    level: "Beginner",

    study_plan: {
      title: "Intro to Biology Study Plan",
      subjects: ["Cell Biology", "Genetics", "Ecology"],
      weekly_schedule: [
        { day: "Monday", focus: "Cell Biology", duration: "60 min" },
        { day: "Tuesday", focus: "Genetics", duration: "60 min" },
        { day: "Wednesday", focus: "Ecology", duration: "45 min" },
        { day: "Thursday", focus: "Revision & Diagrams", duration: "60 min" },
        { day: "Friday", focus: "Mock Test", duration: "90 min" },
      ],
      description:
        "A beginner-friendly biology plan focused on concept clarity, diagrams, and exam-oriented practice.",
    },

    nutrition_plan: {
      title: "Study Focus Routine",
      highlights: ["Pomodoro Sessions", "Short Daily Revision", "Weekly Mock Tests"],
      description:
        "Designed to help biology students improve memory retention and recall through structured study routines.",
    },

    learning_support: {
      title: "Learning Tips & Resources",
      features: [
        "Concept-based summaries",
        "Diagram practice sheets",
        "Previous year question analysis",
      ],
      description:
        "Guided resources focused on exam scoring strategies and weak-area improvement.",
    },
  },

  {
    id: 2,
    first_name: "Michael",
    profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
    study_goal: "Skill Improvement",
    age: 25,
    study_days: 4,
    level: "Intermediate",

    study_plan: {
      title: "Full Stack Web Development",
      subjects: ["HTML", "CSS", "JavaScript", "React"],
      weekly_schedule: [
        { day: "Monday", focus: "HTML & CSS", duration: "90 min" },
        { day: "Tuesday", focus: "JavaScript Core", duration: "90 min" },
        { day: "Wednesday", focus: "React Fundamentals", duration: "120 min" },
        { day: "Thursday", focus: "Project Building", duration: "150 min" },
      ],
      description:
        "Hands-on coding plan focused on building real-world projects and strengthening JavaScript fundamentals.",
    },

    nutrition_plan: {
      title: "Productivity & Coding Routine",
      highlights: ["Deep Work Blocks", "Daily Coding Practice", "Weekly Mini Projects"],
      description:
        "Optimized learning routine for developers to stay consistent and avoid burnout.",
    },

    learning_support: {
      title: "Learning Tips & Resources",
      features: [
        "Code challenges & exercises",
        "Project-based learning",
        "Best practices & clean code tips",
      ],
      description:
        "Developer-focused guidance to improve problem-solving and real-world coding skills.",
    },
  },

  {
    id: 3,
    first_name: "Elena",
    profilePic: "https://randomuser.me/api/portraits/women/76.jpg",
    study_goal: "Career Advancement",
    age: 30,
    study_days: 3,
    level: "Advanced",

    study_plan: {
      title: "Data Science & Machine Learning",
      subjects: ["Python", "Statistics", "Machine Learning", "Data Visualization"],
      weekly_schedule: [
        { day: "Monday", focus: "Python & Data Handling", duration: "120 min" },
        { day: "Wednesday", focus: "Statistics & ML Models", duration: "150 min" },
        { day: "Friday", focus: "Projects & Case Studies", duration: "180 min" },
      ],
      description:
        "Advanced learning track focused on real datasets, ML models, and portfolio-ready projects.",
    },

    nutrition_plan: {
      title: "Advanced Learning Strategy",
      highlights: ["Long Focus Sessions", "Case Study Analysis", "Research Reading"],
      description:
        "Designed for professionals balancing learning with work responsibilities.",
    },

    learning_support: {
      title: "Learning Tips & Resources",
      features: [
        "Industry-level projects",
        "Interview preparation topics",
        "Portfolio & resume guidance",
      ],
      description:
        "Career-focused guidance to transition into data-driven roles.",
    },
  },
];
