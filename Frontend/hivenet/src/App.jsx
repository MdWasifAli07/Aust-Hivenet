// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layouts
import PublicLayout from "./layouts/PublicLayout.jsx";
import StudentLayout from "./layouts/StudentLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

// Public pages
import Home from "./pages/public/Home.jsx";
import About from "./pages/public/About.jsx";
import Clubs from "./pages/public/Clubs.jsx";
import Events from "./pages/public/Events.jsx";
import Contact from "./pages/public/Contact.jsx";
import Login from "./pages/public/Login.jsx";
import Signup from "./pages/public/Signup.jsx";
import CheckIn from "./pages/public/CheckIn.jsx";

// Student pages
import StudentDashboard from "./pages/student/Dashboard.jsx";
import StudentEvents from "./pages/student/Events.jsx";
import StudentClubs from "./pages/student/Clubs.jsx";
import ClubDetails from "./pages/student/ClubDetails.jsx";
import Resources from "./pages/student/Resources.jsx";
import AIAssistant from "./pages/student/AIAssistant.jsx";
import MyEvents from "./pages/student/MyEvents.jsx";
import Forum from "./pages/student/Forum.jsx";
import PostDetails from "./pages/student/PostDetails.jsx";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import ManageEvents from "./pages/admin/ManageEvents.jsx";
import AdminEventDetails from "./pages/admin/EventDetails.jsx";
import Analytics from "./pages/admin/Analytics.jsx";
import ManageClubs from "./pages/admin/ManageClubs.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ForumModeration from "./pages/admin/ForumModeration.jsx";

// Route guards
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import RoleRoute from "./routes/RoleRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public (with navbar/footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/check-in" element={<CheckIn />} />
          </Route>

          {/* Auth (full-screen) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private */}
          <Route element={<ProtectedRoute />}>
            {/* Student-only */}
            <Route element={<RoleRoute allow={["student"]} />}>
              <Route element={<StudentLayout />}>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/events" element={<StudentEvents />} />
                <Route path="/student/clubs" element={<StudentClubs />} />
                <Route path="/student/club/:id" element={<ClubDetails />} />
                <Route path="/student/resources" element={<Resources />} />
                <Route path="/student/ai-assistant" element={<AIAssistant />} />
                <Route path="/student/my-events" element={<MyEvents />} />
                {/* Step-10 */}
                <Route path="/student/forum" element={<Forum />} />
                <Route path="/student/post/:id" element={<PostDetails />} />
              </Route>
            </Route>

            {/* Admin-only */}
            <Route element={<RoleRoute allow={["admin"]} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/manage-events" element={<ManageEvents />} />
                <Route path="/admin/event/:id" element={<AdminEventDetails />} />
                <Route path="/admin/manage-clubs" element={<ManageClubs />} />
                <Route path="/admin/manage-users" element={<ManageUsers />} />
                <Route path="/admin/analytics" element={<Analytics />} />
                {/* Step-10 */}
                <Route path="/admin/forum-moderation" element={<ForumModeration />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
