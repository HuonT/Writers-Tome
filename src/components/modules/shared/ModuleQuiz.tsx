import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useProgress } from '../../../contexts/ProgressContext';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { calculateBadgeProgress } from '../../../lib/badges';
import { saveUserBadge } from '../../../lib/utils/badgeUtils';

export interface QuizQuestion {
  id: string;
  question: string;
  answer: string;
}

interface ModuleQuizProps {
  questions: QuizQuestion[];
  title?: string;
}

export const ModuleQuiz: React.FC<ModuleQuizProps> = ({ questions, title = 'Module Quiz' }) => {
  const { moduleId } = useParams();
  const { currentUser } = useAuth();
  const { saveQuizResponse, getQuizResponses } = useProgress();
  const [expandedAnswers, setExpandedAnswers] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([]);

  useEffect(() => {
    if (moduleId) {
      const responses = getQuizResponses(moduleId);
      const submitted = responses.map(r => r.questionId);
      setSubmittedQuestions(submitted);

      const savedAnswers: Record<string, string> = {};
      responses.forEach(r => {
        savedAnswers[r.questionId] = r.userAnswer;
      });
      setUserAnswers(savedAnswers);
    }
  }, [moduleId, getQuizResponses]);

  const toggleAnswer = (questionId: string) => {
    setExpandedAnswers(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleAnswerSubmit = async (questionId: string) => {
    if (!moduleId || !userAnswers[questionId] || !currentUser) return;

    try {
      await saveQuizResponse(moduleId, {
        questionId,
        userAnswer: userAnswers[questionId],
        isCorrect: true
      });

      setSubmittedQuestions(prev => [...prev, questionId]);

      // Award badge when all questions are answered
      if (submittedQuestions.length + 1 === questions.length) {
        const newBadges = calculateBadgeProgress(moduleId, questions.length, questions.length, true);
        for (const badge of newBadges) {
          if (badge.earned) {
            await saveUserBadge(currentUser.uid, badge);
          }
        }
      }
    } catch (error) {
      console.error('Error saving quiz response:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {index + 1}. {question.question}
              </h3>
            </div>

            {!submittedQuestions.includes(question.id) ? (
              <div className="space-y-4">
                <textarea
                  value={userAnswers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Write your answer here..."
                />
                <button
                  onClick={() => handleAnswerSubmit(question.id)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 mb-4">Your answer:</p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-800">{userAnswers[question.id]}</p>
                </div>
                <button
                  onClick={() => toggleAnswer(question.id)}
                  className="flex items-center text-emerald-600 hover:text-emerald-700"
                >
                  {expandedAnswers.includes(question.id) ? (
                    <>
                      <ChevronUp className="w-5 h-5 mr-1" />
                      Hide Answer
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5 mr-1" />
                      Show Answer
                    </>
                  )}
                </button>
                {expandedAnswers.includes(question.id) && (
                  <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                    <p className="text-emerald-800">{question.answer}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};