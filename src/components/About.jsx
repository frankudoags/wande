import gif from "assets/images/arts/gif.gif";
import castleImg from "assets/images/others/castleBg.jpg";
import { Slide } from "react-reveal";

const About = () => {
  return (
    <>
      {/* about us */}
      <section className="about sections" id="about">
        <div className="container">
          <div className="row align-items-center mb-md-5 mb-2 mt-0">
            <div className="col-lg-6">
              <Slide bottom>
                <div className="about-content">
                  <h2>
                    ABOUT <span> US </span>
                  </h2>
                  <p>
                    LEGENDARY Owls  is a limited collection of  unique owls categorized by level of rarity and generated with over 200 hand drawn traits, including background, eyes, beak, feathers, clothes, expression, and more other rare traits. Owls are NFTs - digital collectibles stored as ERC-721 tokens on the Ethereum blockchain and hosted on an interplanetary file system (IPFS).
                  </p>
                  <h3>
                    We were driven by creativity and we are sure we’ve managed to do
                    something magical, unique in the history of NFT!
                  </h3><h3 className="headerthree">
                    We have
                    revolutionized the way the traits evolve over time!
                  </h3>
                  <br />
                </div>
              </Slide>
            </div>
            <div className="col-lg-6 text-center">
              <Slide right>
                <div className="about-image  mx-auto text-center">
                  <img loading="lazy" decoding="async" src={gif} className="about_img_1" alt="" />
                </div>
              </Slide>
            </div>
          </div>
        </div>
      </section>
      {/* story */}
      <section className="sections" id="story">
        <div className="container">
          <div className="row flex-md-row-reverse align-items-center pt-md-5 pt-1 mt-md-5 mt-0">
            <div className="col-lg-6">
              <Slide bottom>
                <div className="about-content">
                  <h2>
                    OUR <span> STORY </span>
                  </h2>
                  <p>
                    In a time long forgotten, whilst the Universe of Magic was the only one  which truly mattered, the dark forces and the Great Wizards collided in the Great Wizarding War! After long and exhausted battles, The War finally ended and the dark forces were defeated!
                    As a follow up, the Great Wizards created The Order of Phoenix, a secret society of witches, wizards, magic birds and creatures whose their sole purpose was to stand against violence, defend humanity and maintain peace in the Universe of Magic.
                    Legendary Owls belong to the Order of the Phoenix, being the first protectors of the Universe of Magic. They watch over the humanity, spreading the values of Bravery, Wisdom, Faith and Compassion to every living being.

                    <br />
                    These values  are crucially important, so KEEP THEM CARVED IN YOUR MEMORY! The secret will be revealed at the right time!
                  </p>
                  <h3>
                    Become a protector and let`s bring LIGHT in this Universe
                    together!
                  </h3>
                </div>
              </Slide>
            </div>
            <div className="col-lg-6">
              <Slide left>
                <div className="about-image mt-md-0 mt-2 mx-auto text-center">
                  <img loading="lazy" decoding="async" src={castleImg} className="img-fluid mx-auto" alt="" />
                </div>
              </Slide>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
