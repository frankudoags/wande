import Hero from 'components/Hero';
import Mint from 'components/Mint'
import About from 'components/About';
import Artist from 'components/Artist';
import Roadmap from 'components/RoadMap';
import Faq from 'components/Faq';
import Staking from 'components/Staking'
import { useEffect } from 'react';
//
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <main>
      <Hero />
      {/* <Mint /> */}
      <About />
      <Roadmap />
      <Artist />
      <Staking />
      <Faq />
    </main>
  );
};

export default Home;
