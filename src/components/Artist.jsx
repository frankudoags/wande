// ============ import images ===================
import mem_1 from "assets/images/arts/art1.jpg";
import mem_2 from "assets/images/arts/art2.jpg";
import mem_3 from "assets/images/arts/art3.jpg";
import mem_4 from "assets/images/arts/art4.jpg";
import mem_5 from "assets/images/arts/art5.jpg";
import mem_6 from "assets/images/arts/art6.jpg";
//
import { Slide } from "react-reveal";

const Artist = () => {
  // ============= Team data ====================
  let data = [
    {
      name: "Iancu Gabriela",
      role: "Co-Founder",
      insta: "https://instagram.com/iancugabriela?utm_medium=copy_link",
      twitter: " https://twitter.com/IancuGabriela92",
      img: mem_1,
      body: <></>,
      about: <p></p>,
    },
    {
      name: "Alecu Alex",
      role: "Co-Founder",
      insta: "https://instagram.com/alecuuuuuuu?utm_medium=copy_link",
      twitter: "https://twitter.com/AlexAlecu92",
      img: mem_2,
      body: <></>,
      about: <p> </p>,
    },
    {
      name: "Prodan Cristina",
      role: "Co-Founder",
      insta: "https://instagram.com/cristinnaprodan?utm_medium=copy_link",
      twitter: "https://twitter.com/CristinnaProdan",
      img: mem_3,
      body: <></>,
      about: <p></p>,
    },
    {
      name: "Stefanescu Alin",
      role: "Co-Founder",
      insta: "https://instagram.com/alin.ionut91?utm_medium=copy_link",
      twitter: "https://twitter.com/AlinIonut1991",
      img: mem_4,
      body: <></>,
      about: <p></p>,
    },
    {
      name: "Melnic Dima",
      role: "Business Advisor",
      insta: "https://instagram.com/melnic.dima?utm_medium=copy_link",
      twitter: "https://twitter.com/melnic999",
      img: mem_5,
      body: <></>,
      about: <p></p>,
    },
    {
      name: "Andrei Toma",
      role: "Blockchain Developer",
      twitter: "https://twitter.com/toma_andrei8",
      img: mem_6,
      body: <></>,
      about: <p></p>,
    },
  ];
  return (
    <section className="artist section-padding sections" id="artist">
      <div className="container">
        <div className="title text-center text-white">
          <Slide cascade bottom>
            {/* <div className="title-big">Team</div> */}
            <h2 className="">Team</h2>
          </Slide>
        </div>
        <div className="artist-list">
          <Slide cascade bottom>
            <div className="row">
              {data?.map((item, i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <div className="artist-box">
                    <div className="artist-image">
                      <img loading="lazy" decoding="async" src={item?.img} alt={item?.name} />
                    </div>
                    <div className="artist-info">
                      <h4>{item?.name}</h4>
                      <p>{item?.role}</p>
                      {item?.about}
                      <div className="team_socials">
                        {item?.insta && (
                          <a
                            href={item.insta}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg
                              focusable="false"
                              viewBox="0 0 24 24"
                              height="25"
                              width="25"
                              aria-hidden="true"
                            >
                              <path fill="#071b57" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z">
                              </path>
                            </svg>
                          </a>
                        )}
                        {item?.twitter && (
                          <a
                            href={item.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg
                              enableBackground="new 0 0 100 100"
                              height="25"
                              viewBox="0 0 100 100"
                              width="25"
                            >
                              <path
                                id="_x30_4.Twitter"
                                d="m89.9 25.2c-3 1.3-6.1 2.2-9.4 2.6 3.4-2 6-5.2 7.2-9.1-3.2 1.9-6.7 3.2-10.4 4-3-3.2-7.3-5.2-12-5.2-9.1 0-16.4 7.4-16.4 16.4 0 1.3.1 2.5.4 3.7-13.6-.6-25.6-7.2-33.7-17.1-5.8 10.4.7 19 5 21.9-2.6 0-5.2-.8-7.4-2 0 8.1 5.7 14.8 13.1 16.3-1.6.5-5.2.8-7.4.3 2.1 6.5 8.2 11.3 15.3 11.4-5.6 4.4-13.8 7.9-24.3 6.8 7.3 4.7 15.9 7.4 25.2 7.4 30.2 0 46.6-25 46.6-46.6 0-.7 0-1.4-.1-2.1 3.4-2.5 6.2-5.4 8.3-8.7z"
                                fill="#071b57"
                              ></path>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default Artist;
