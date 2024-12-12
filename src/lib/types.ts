// Module types
export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  totalTopics: number;
  totalExercises: number;
  stage: number;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  sections?: TopicSection[];
  exercise?: Exercise;
}

export interface TopicSection {
  id: string;
  title: string;
  content: string;
  sections?: TopicSection[];
  exercise?: Exercise;
  answer?: string;
  component?: string;
}

export interface Exercise {
  id: string;
  instructions: string;
  isCompleted: boolean;
  component?: string;
}

// Project types
export interface Project {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  lastModified: string;
  progress: CourseProgress;
}

export interface ProjectState {
  projects: Project[];
  currentProjectId: string | null;
}

export interface CourseProgress {
  completedModules: string[];
  currentModule: string | null;
  moduleProgress: {
    [key: string]: ModuleProgress;
  };
  earnedBadges?: Badge[];
}

export interface ModuleProgress {
  completedTopics: string[];
  completedExercises: string[];
  exerciseResponses: ExerciseResponse[];
  progress: number;
  quizResponses?: QuizResponse[];
}

export interface ExerciseResponse {
  exerciseId: string;
  response: string | Record<string, any>;
}

export interface QuizResponse {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
}

export interface Badge {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

// User types
export interface UserProfile {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isActive: boolean;
  lastActive: any;
  createdAt: any;
  emailPreferences?: {
    marketing: boolean;
    communityNews: boolean;
  };
}

// Post types
export type PostCategory = 'plot' | 'characters' | 'themes' | 'worldbuilding' | 'workshop' | 'self-publishing' | 'traditional-publishing' | 'writers-chatter' | 'writing-tips';

export interface CategoryInfo {
  id: PostCategory;
  label: string;
  description: string;
  icon: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userPhotoURL?: string | null;
  title: string;
  content: string;
  category: PostCategory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  commentCount: number;
  requestingFeedback?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userPhotoURL?: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
}

export interface FeedbackRequest {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  createdAt: string;
  expiresAt: string;
  status: 'pending' | 'received' | 'expired';
}

export interface Notification {
  id: string;
  type: 'feedback_request' | 'feedback_received';
  userId: string;
  postId: string;
  message: string;
  createdAt: string;
  read: boolean;
}