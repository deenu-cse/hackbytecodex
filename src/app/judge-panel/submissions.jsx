"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gavel, Trophy, Star, FileText, Download, Eye } from "lucide-react";

export default function JudgeSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading submissions
    setTimeout(() => {
      const mockSubmissions = [
        {
          id: 1,
          teamName: "Team Alpha",
          projectName: "AI-Powered Chatbot",
          description: "An intelligent chatbot that can assist with customer service queries",
          technologies: ["React", "Node.js", "OpenAI API"],
          githubUrl: "https://github.com/team-alpha/chatbot",
          demoUrl: "https://demo.chatbot.com",
          submittedAt: "2024-01-15T10:30:00Z",
          status: "PENDING"
        },
        {
          id: 2,
          teamName: "Tech Innovators",
          projectName: "Smart Agriculture System",
          description: "IoT-based solution for monitoring soil conditions and optimizing irrigation",
          technologies: ["Arduino", "Python", "Firebase"],
          githubUrl: "https://github.com/tech-innovators/agriculture",
          demoUrl: "https://demo.agriculture.com",
          submittedAt: "2024-01-14T15:45:00Z",
          status: "PENDING"
        },
        {
          id: 3,
          teamName: "Code Masters",
          projectName: "Healthcare Management Portal",
          description: "Comprehensive portal for managing patient records and appointments",
          technologies: ["Vue.js", "Express", "MongoDB"],
          githubUrl: "https://github.com/code-masters/healthcare",
          demoUrl: "https://demo.healthcare.com",
          submittedAt: "2024-01-13T09:20:00Z",
          status: "SCORED"
        }
      ];
      setSubmissions(mockSubmissions);
      setLoading(false);
    }, 1000);
  }, []);

  const handleScoreChange = (submissionId, criteria, value) => {
    setScores(prev => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        [criteria]: parseInt(value) || 0
      }
    }));
  };

  const calculateTotalScore = (submissionId) => {
    const submissionScores = scores[submissionId] || {};
    return Object.values(submissionScores).reduce((sum, score) => sum + score, 0);
  };

  const handleSaveScore = (submissionId) => {
    const totalScore = calculateTotalScore(submissionId);
    alert(`Scores saved for ${submissions.find(s => s.id === submissionId)?.teamName}. Total: ${totalScore}/50`);
    
    // Update submission status
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId ? {...sub, status: "SCORED"} : sub
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Review Submissions</h1>
          <p className="text-gray-400 mt-1">Evaluate and score project submissions</p>
        </div>
        <div className="text-sm text-gray-400">
          {submissions.filter(s => s.status === "SCORED").length}/{submissions.length} reviewed
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-6">
        {submissions.map((submission) => (
          <div 
            key={submission.id} 
            className={`p-6 rounded-2xl border ${
              submission.status === "SCORED" 
                ? "bg-green-500/5 border-green-500/20" 
                : "bg-[#0a0a0a] border-white/10"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{submission.projectName}</h2>
                <p className="text-gray-400">by {submission.teamName}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  submission.status === "SCORED" 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {submission.status}
                </span>
                {submission.status === "SCORED" && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                    Score: {calculateTotalScore(submission.id)}/50
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-300 mb-4">{submission.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {submission.technologies.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 rounded-full text-xs bg-white/10 text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mb-6">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <FileText className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Download Files
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Eye className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </div>

            {/* Scoring Criteria */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-medium text-white mb-4">Scoring Criteria (Max: 50 points)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Innovation & Creativity (0-10)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <button
                          key={num}
                          onClick={() => handleScoreChange(submission.id, 'innovation', num)}
                          className={`w-8 h-8 rounded-full border ${
                            (scores[submission.id]?.innovation || 0) >= num
                              ? 'bg-yellow-500 border-yellow-500 text-black'
                              : 'border-white/20 text-gray-400 hover:border-yellow-500'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Technical Complexity (0-10)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <button
                          key={num}
                          onClick={() => handleScoreChange(submission.id, 'complexity', num)}
                          className={`w-8 h-8 rounded-full border ${
                            (scores[submission.id]?.complexity || 0) >= num
                              ? 'bg-yellow-500 border-yellow-500 text-black'
                              : 'border-white/20 text-gray-400 hover:border-yellow-500'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Functionality & Performance (0-15)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(num => (
                        <button
                          key={num}
                          onClick={() => handleScoreChange(submission.id, 'functionality', num)}
                          className={`w-8 h-8 rounded-full border ${
                            (scores[submission.id]?.functionality || 0) >= num
                              ? 'bg-yellow-500 border-yellow-500 text-black'
                              : 'border-white/20 text-gray-400 hover:border-yellow-500'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Impact & Relevance (0-15)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(num => (
                        <button
                          key={num}
                          onClick={() => handleScoreChange(submission.id, 'impact', num)}
                          className={`w-8 h-8 rounded-full border ${
                            (scores[submission.id]?.impact || 0) >= num
                              ? 'bg-yellow-500 border-yellow-500 text-black'
                              : 'border-white/20 text-gray-400 hover:border-yellow-500'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="text-lg font-semibold text-white">
                  Total Score: {calculateTotalScore(submission.id)}/50
                </div>
                <Button
                  onClick={() => handleSaveScore(submission.id)}
                  disabled={submission.status === "SCORED"}
                  className={
                    submission.status === "SCORED" 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-purple-600 hover:bg-purple-700"
                  }
                >
                  {submission.status === "SCORED" ? "Score Saved" : "Save Score"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}