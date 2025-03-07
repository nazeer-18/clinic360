import { Navigate, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorSeach from './pages/DoctorsSearch';
import SearchedDoctors from "./pages/SearchedDoctors";
import DoctorProfile from "./pages/DoctorProfile";
import ViewAppointments from "./pages/ViewAppointments";
import BookAppointment from './pages/BookAppointment';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectRoute from './components/RedirectRoute';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 mt-16">
            <Routes>
              <Route element={<RedirectRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search-doctors" element={<DoctorSeach />} />
                <Route path="/searched-doctors" element={<SearchedDoctors />} />
                <Route path="/doctor-profile/" element={<DoctorProfile />} />
                <Route path="/view-appointments/" element={<ViewAppointments />} />
                <Route path="/book-appointment/" element={<BookAppointment />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
