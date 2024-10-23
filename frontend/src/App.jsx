import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Home } from './Components';
import { About, Contact, ReportForm, NotFound, Header, Footer } from './Components';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Profile from "./Components/Profile";
import Donate from "./Components/Donate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import ItemDetails from "./Components/ItemDetails";
import Listings from "./Components/Listings";
import OwnerInfo from "./Components/OwnerInfo";
import LostItemReportForm from "./Components/ReportLost";
import FoundItemReportForm from "./Components/ReportFound";
import ListDetail from "./Components/ListDetail";
import Protected from "./Components/ProtectedRoute";
import Chatroom from "./Components/ChatRoom";
import UserChats from "./Components/UserChats";

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <Header />

        <Routes>
          <Route path="/" element={
            <Protected>
              <Home />
            </Protected>
            
          } />
          <Route path="signup" element={
            <SignUp />
          } />
          <Route path="signin" element={
            <SignIn />
          } />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="profile" element={
            <Profile />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/report-lost" element={<LostItemReportForm type="lostitem" method="POST" />} />
          <Route path="/report-found" element={<FoundItemReportForm type="founditem" method="POST" />} />
          <Route path="resetPassword"
            element={<ResetPassword />}
          />
          <Route path="/donate" element={<Donate/>}/>
          <Route path="/item-detail/:type/:id" element={<ItemDetails/>}/>
          <Route path="/myListings" element={<Listings/>}/>
          <Route path="/conversation/:ownerId" element={<OwnerInfo/>}/>
          <Route path="/list-detail/:type/:id" element={<ListDetail/>}/>
          <Route path='/chat/:room/:otherUser' element={<Chatroom/>}/>
          <Route path="/all-chats" element={<UserChats/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>

    </>
  );
}

function App() {
  
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
