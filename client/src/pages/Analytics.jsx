import React from "react";
import TopSection from "../components/TopSection";
import SubjectCard from "../components/SubjectCard";

const subjects = [
  { name: "D.B.M.S.", score: 75, attended: 24, total: 32 },
  { name: "Operating System", score: 85, attended: 24, total: 28 },
  { name: "Theory Of Computation", score: 53, attended: 16, total: 30 },
  { name: "S.D.P", score: 75, attended: 18, total: 24 },
  { name: "AI/ML", score: 75, attended: 24, total: 32 },
  { name: "D.B.M.S. Lab", score: 85, attended: 24, total: 28 },
  { name: "OS LAB", score: 53, attended: 16, total: 30 },
  { name: "E.S.P", score: 75, attended: 18, total: 24 },
];

const Analytics = () => {
  const getColor = (score) => {
    if (score >= 75) return "#4CAF50"; // Green for scores >= 75%
    if (score >= 50) return "#FFC107"; // Yellow for scores between 50% and 74%
    return "#F44336"; // Red for scores < 50%
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <TopSection title="Analytics" name="Swapnamoy Midya" role="Student" />

      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold">Subject Breakdown</h2>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <SubjectCard subject={subject} key={subject.name} />
        ))}
      </div>
    </div>
  );
};

export default Analytics;
