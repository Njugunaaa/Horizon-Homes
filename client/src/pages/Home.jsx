import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from '../components/Layouts/HeroSection'
import Services from '../components/Layouts/Services'
import PopularProperties from '../components/Layouts/PopularProperty'
import Footer from '../components/Layouts/Footer'
import HomeNavbar from '../components/Layouts/HomeNavbar'

const Home = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5555/check_session", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((userData) => {
        setUser(userData);
      })
      .catch(() => {
        setUser(null);
        navigate("/login");
      });
  }, []);

  return (
    <>
  <HomeNavbar/>
   <HeroSection/>
   <Services/>
   <PopularProperties/>
   <Footer/>
  </>
  )
}

export default Home