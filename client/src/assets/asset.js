import java from "./java.svg";
import c from "./c.svg";
import python from "./python.svg";
import profile_icon from "./profile_icon.png";
export const assets = {
  java,
  c,
  python,
  profile_icon,
};
export const courseCategories = [
  {
    text: "DSA with java",
    path: "dsa-java",
    image: java,
    bgColor: "#FEF6DA",
  },
  {
    text: "DSA with C++",
    path: "dsa-cpp",
    image: c,
    bgColor: "#FEE0E0",
  },
  {
    text: "Python",
    path: "python",
    image: python,
    bgColor: "#F0F5DE",
  },
  {
    text: "Full Frontend",
    path: "frontend",
    image: java,
    bgColor: "#E1F5EC",
  },
  {
    text: "Mern Stack",
    path: "mern",
    image: python,
    bgColor: "#FEE6CD",
  },
  {
    text: "Full Stack",
    path: "fullstack",
    image: c,
    bgColor: "#E0F6FE",
  },
  {
    text: "App Development",
    path: "appD",
    image: java,
    bgColor: "#F1E3F9",
  },
];

export const dummyCourses = [
  {
    title: "Aptitude for Placement",
    tags: ["Aptitude", "Reasoning", "Verbal"],
    category: "python",
    image: python,
    duration: "1 year",
    price: "1,270",
    originalPrice: "2,998",
    discount: "50",
    finalPrice: "1,499",
    gst: "229",
    description:
      "Master the essential skills for job placements with our comprehensive Aptitude course. Covering quantitative aptitude, reasoning, and verbal ability, this course is designed to equip you with the tools needed to excel in competitive exams and interviews.",
  },
  {
    title: "DSA with Java",
    tags: ["DSA", "Java", "Coding"],
    category: "dsa-java",
    image: java,
    duration: "6 months",
    price: "999",
    originalPrice: "1,999",
    discount: "50",
    finalPrice: "1,199",
    gst: "200",
    description:
      "Dive deep into Data Structures and Algorithms using Java. This course covers everything from basic data structures to advanced algorithms, preparing you for coding interviews and competitive programming.",
  },
];
