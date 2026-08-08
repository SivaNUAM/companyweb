import Hero from "../components/home/Hero";
import SelectedWorks from "../components/home/SelectedWorks";
import ImpactStrip from "../components/home/ImpactStrip";
import StoryTeaser from "../components/home/StoryTeaser";
import WhatWeDo from "../components/home/WhatWeDo";
import HowWeWork from "../components/home/HowWeWork";
import Industries from "../components/home/Industries";
import ClientMarquee from "../components/home/ClientMarquee";
import Voices from "../components/home/Voices";
import HomeCTA from "../components/home/HomeCTA";

const Home = () => {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <ImpactStrip />
      <StoryTeaser />
      <WhatWeDo />
      <HowWeWork />
      <Industries />
      <ClientMarquee />
      <Voices />
      <HomeCTA />
    </>
  );
};

export default Home;
