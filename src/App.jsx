import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CreateTicket from './pages/CreateTicket';
// import MyTickets from './pages/MyTickets';
import AllTickets from './pages/AllTickets';
import TicketDetails from './pages/TicketDetails';
// import Profile from './pages/Profile';
// import About from './pages/About';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import ModeratorDashboard from './pages/ModeratorDashboard';
import Footer from './components/Footer';
import About from './pages/About'; // Ensure this import is correct

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path = "/about" element={<About />} />

          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/my-tickets" element={<AllTickets />} />
          <Route path="/all-tickets" element={<AllTickets />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/moderator-dashboard" element={<ModeratorDashboard />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
