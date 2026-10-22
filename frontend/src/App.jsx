import Navbar from "./components/navBar";
import HeroSection from "./components/HeroSection";
import RoomsSection from "./components/RoomSection";
import ServicesSection from "./components/services";
import BookingSection from "./components/booking";
import Footer from "./components/Footer";
import ChatBot from "./components/chatBot";
const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <RoomsSection />
      <ServicesSection />
      <BookingSection />
      <ChatBot/>
      <Footer />

    </div>
  );
};

export default App;