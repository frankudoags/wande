import "assets/css/roadmap.css";
import { Slide } from "react-reveal";
import writingGif from "assets/images/others/writing.gif";
//
import logo from "assets/images/others/logo.png";
import logo1 from "assets/images/logos/1.png";
import logo2 from "assets/images/logos/2.png";
import logo3 from "assets/images/logos/3.png";
import logo4 from "assets/images/logos/4.png";
import treasure from "assets/images/others/treasure.png";
import token from "assets/images/others/token.png";

//=====================  Roadmap component ========================
const Roadmap = () => {
  // Put you roadmap 1.0 content data here, this is for the timeline design ====================
  let data1 = [
    {
      title: `Evolving traits: The traits will magically change in 2 steps! `,
      comingSoon: false,
      body: (
        <>
          <p>You need to hold your Owl in the Nest and the traits will be changing every 48 hours, in total 96 hours!
            The holders will receive rewards and benefits: one benefit will be the $tone token!
          </p>
        </>
      ),
      side: "left",
    },
    {
      title: `Raffle: 5 prizes of 1 eth for 5 lucky minters!`,
      body: (
        <>
          <p>If you own more Legendary Owls NFTs you will have more entries into the raffle! </p>
        </>
      ),
      side: "right",
    },
    {
      title: `Treasury will be funded with 2.5% from royalties!`,
      body: (
        <>
          <p></p>
        </>
      ),
      side: "left",
    }
  ];

  // Put you roadmap 2.0 content data here, this is for the timeline design ====================
  let data2 = [
    {
      title: `School of Wizardry`,
      body: (
        <>
          <p>Creating the most prestigious and amazing school in the entire wizards' Universe. Join our Legendary School of Wizardry, a space  full of surprises!</p>
        </>
      ),
      side: "left",
    },
    {
      title: `Our Birds REBORN!!`,
      body: (
        <>
          <p></p>
        </>
      ),
      side: "right",
    },
    {
      title: `Holdings`,
      body: (
        <>
          <p>Further business development: founders will suggest holdings in either BTC, ETH, or any other currency which  our  DAO’s vote will decide.</p>
        </>
      ),
      side: "left",
    },
    {
      title: `Funding a new NFT project developed by our holders`,
      comingSoon: false,
      body: (
        <>
          <p></p>
        </>
      ),
      side: "right",
    },
    {
      title: `Launching a 3D collection! `,
      body: (
        <>
          <p></p>
        </>
      ),
      side: "left",
    },
    {
      title: `Merch Store!`,
      body: (
        <>
          <p>Creating our Magical Merch Store, IRL and in the Metaverse!</p>
        </>
      ),
      side: "right",
    },
  ];

  return (
    <section className="sections" id="roadmap">
      <div className="cs_container">
        {/* ********************************************* */}
        {/* =========== roadmap 1.0 ================= */}
        <div className="title text-center">
          <Slide bottom>
            <h2 className="blue">Roadmap 1.0</h2>
          </Slide>
        </div>
        {/* ========= chapter 1 ============== */}
        {/* ======================= */}
        <Slide cascade bottom>
          <div className="timeline">
            {/*  */}
            {data1.map((item, i) => (
              <div key={i} className={`container-map ${item.side}`}>
                <div className="content">
                  {item?.comingSoon ? (
                    <img
                      className="writing_img"
                      src={writingGif}
                      alt="Coming soon"
                    />
                  ) : (
                    <h2>{item?.title}</h2>
                  )}
                  {item?.body}
                </div>
              </div>
            ))}
          </div>
        </Slide>
        {/*========== chapter 2   ================*/}
        <Slide cascade bottom>
          <div className="col-md-8 col-11 text-center mt-md-0 mt-4 mb-4 mx-auto">
            <h2>Utility</h2>
            <p>
              Additional benefits and giveaways are prepared for our holders, to give  you  a taste of it, we’ll mention just a couple of these: raffles, priority on all the future collections, early whitelist access, low mint cost, parties, private events.
            </p>
            <p>
              Launching our utility token: $TONE. Our community utility token  $TONE will be the currency of our Ecosystem.
            </p>
          </div>
        </Slide>
        <div className="col-md-12 text-center my-4 mx-auto">
          {/* =========== Community Dao start =================*/}
          <Slide bottom>
            <h2>Community DAO</h2>
            <h3 className="text_pr sub_heading">
              Four distinctive Entities united by creed!
            </h3>
          </Slide>
          {/*========= badges section ========= */}
          <Slide cascade bottom>
            <div className="protector_wrapper">
              {/* ========== left column ================  */}
              <div className="protector_col">
                {/* badge 1 */}
                <div className="animated_img_box">
                  <h3 className="m-auto box_content"> The Gods – compassion</h3>
                  <div className="frontCard">
                    <img src={logo1} alt="" />
                  </div>
                </div>
                {/* badge 2 */}
                <div className="animated_img_box">
                  <h3 className="m-auto box_content"> The Heroes - Faith</h3>
                  <div className="frontCard">
                    <img src={logo2} alt="" />
                  </div>
                </div>
              </div>

              {/*======== center/middle column ===========*/}
              <div className="protector_col middle">
                {/* main logo box */}
                <div className="animated_img_box">
                  <h3 className="font_harry harry_font_title">Legendary DAO</h3>
                  <div className="frontCard">
                    <img src={logo} alt="" />
                  </div>
                  <p>
                    Legendary Owls  live in a healthy community where everyone has a say. Thus, they use a Decentralized Autonomous Organizations (DAO). Each owl`s vote is equally important to the growth and evolution of the community. The entire community will decide together  the future investments and the upcoming projects.

                  </p>
                </div>
              </div>

              {/*===========  right column ========== */}
              <div className="protector_col">
                {/* badge 3  */}
                <div className="animated_img_box">
                  <h3 className="m-auto box_content"> The Ancients – Wisdom</h3>
                  <div className="frontCard">
                    <img src={logo4} alt="" />
                  </div>
                </div>
                {/* badge 4 */}
                <div className="animated_img_box">
                  <h3 className="m-auto box_content"> The Seekers – Bravery</h3>
                  <div className="frontCard">
                    <img src={logo3} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </Slide>

          {/* =========== Community Dao end  =================*/}
          <Slide bottom>
            <p className="px-3">
              Become a protector of our legendary world and join one of the Four
              Houses. The Houses were created in order to put an end to violence
              and war and, furthermore, to maintain peace. Let`s build together
              a strong community in which we’ll all be a family!
            </p>
          </Slide>

          {/* ============================================ */}
          <Slide cascade bottom>
            <div className="row px-3 justify-content-between my-4">
              {/*================  treasure ================*/}
              <div className="col-md-6">
                <div className="animated_img_box">
                  <h3 className="font_harry harry_font_title">
                    The treasury (Owl`s Bank)
                  </h3>
                  <div className="frontCard others">
                    <img src={treasure} alt="" />
                  </div>
                  <p>
                    The treasury is what we created for our community, in order to evolve and prosper in our legendary world. We will constantly inject funds in the treasury to ensure the project`s longevity!
                  </p>
                </div>
              </div>
              {/* =============== Token ========================= */}
              <div className="col-md-6 mt-md-0 mt-2">
                <div className="animated_img_box">
                  <h3 className="font_harry harry_font_title">Token</h3>
                  <div className="frontCard others">
                    <img src={token} alt="" />
                  </div>
                  <p>
                    One of the most exiciting steps we’re taking is creating our utility token: $TONE. It will be the currecy powering our Ecosystem and it’s holders will be able to:{"\n"}
                    Use it to mint future collections with discounts,
                    Have access to limited collections,
                    Purchase mystery chests and unlock rare items and accessories,
                    Change the name of their Owls,
                    Purchase custom clothes and shoes from our merch store,
                    Get access to the Legendary School of Wizardry
                  </p>
                </div>
              </div>
            </div>
          </Slide>
        </div>

        {/*============= Roadmap 2.0  =============*/}
        <div className="title  text-center">
          <Slide bottom>
            <h2 className="blue">Roadmap 2.0</h2>
          </Slide>
        </div>

        {/* ======================= */}
        <Slide cascade bottom>
          <div className="timeline">
            {data2.map((item, i) => (
              <div key={i} className={`container-map ${item.side}`}>
                <div className="content">
                  {item?.comingSoon ? (
                    <img
                      className="writing_img"
                      src={writingGif}
                      alt="Coming soon"
                    />
                  ) : (
                    <h2>{item?.title}</h2>
                  )}
                  {item?.body}
                </div>
              </div>
            ))}
          </div>
        </Slide>

        {/* *************** end ******************************* */}
      </div>
    </section>
  );
};

export default Roadmap;
