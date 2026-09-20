import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";

import Scrims from "./pages/public/Scrims";
import ScrimDetails from "./pages/public/ScrimDetails";
import OrganizerProfile from "./pages/public/OrganizerProfile";
import Home from "./pages/public/Home";
import Organizers from "./pages/organizer/Organizers";
import CreateScrim from "./pages/admin/CreateScrim";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import CreateOrganizer from "./pages/admin/CreateOrganizer";
import ScrimPreview from "./pages/public/ScremPreview";
import Create from "./pages/public/Create";
import UpdateScrim from "./pages/admin/UpdateScrim";
import UpdateOrganizer from "./pages/admin/UpdateOrganizer";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageScrims from "./pages/admin/ManageScrims";
import ManageOrganizers from "./pages/admin/ManageOrganizers";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/scrims" element={<Scrims />} />
        <Route path="/scrims/:id" element={<ScrimDetails />} />

        <Route path="/organizers" element={<Organizers />} />
        <Route path="/organizers/:id" element={<OrganizerProfile />} />
        <Route path="/preview" element={<ScrimPreview />} />
        <Route path="/create" element={<Create />} />
      </Route>




      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute />}>

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/scrims" element={<ManageScrims />} />
        <Route path="/admin/organizers" element={<ManageOrganizers />}/>
        <Route path="/admin/organizers/create" element={<CreateOrganizer />} />
        <Route path="/admin/scrims/create" element={<CreateScrim />} />
        <Route path="/admin/scrims/:id/edit" element={<UpdateScrim />} />
        <Route path="/admin/organizers/:id/edit" element={<UpdateOrganizer />} />

      </Route>
    </Routes>
  );
}

export default App;