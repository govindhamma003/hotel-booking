import Navbar from "./components/navBar";
import HeroSection from "./components/HeroSection";
import RoomsSection from "./components/RoomSection";
import ServicesSection from "./components/services";
import BookingSection from "./components/booking";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <RoomsSection />
      <ServicesSection />
      <BookingSection />
      <Footer />
    </div>
  );
};

export default App;