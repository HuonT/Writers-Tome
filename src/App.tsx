import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ModulePage } from './pages/ModulePage';
import { ProfilePage } from './pages/ProfilePage';
import { CommunityPage } from './pages/CommunityPage';
import { PostDetail } from './components/community/PostDetail';
import { ProgressProvider } from './contexts/ProgressContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { AuthProvider } from './contexts/AuthContext';
import { AuthForm } from './components/auth/AuthForm';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { LandingPage } from './components/landing/LandingPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <ProgressProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AuthForm isLogin />} />
                <Route path="/signup" element={<AuthForm />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                <Route path="/community" element={<PrivateRoute><CommunityPage /></PrivateRoute>} />
                <Route path="/community/post/:postId" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
                <Route path="/module/:moduleId" element={<PrivateRoute><ModulePage /></PrivateRoute>} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminPage />} />
                </Route>
              </Routes>
            </div>
          </Router>
        </ProgressProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;