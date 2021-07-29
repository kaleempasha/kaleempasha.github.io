import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Services } from "./components/services";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import { About } from "./components/about"
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [siteData, setSiteData] = useState({});
  useEffect(() => {
    setSiteData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={siteData.Header} />
      <About data={siteData.About} />
      <Services data={siteData.Services} />
      <Team data={siteData.Team} />
      <Contact data={siteData.Contact} />
    </div>
  );
};

export default App;
