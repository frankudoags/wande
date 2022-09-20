import { useState } from "react";
import { Slide } from "react-reveal";

const Faq = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  //  faq content
  const faqData = [
    {
      qs: `How can I get an NFT?`,
      ans: (
        <p>
          You will be able to purchase one or more on our website when we launch
          the collection.
          <br />
          Join our &nbsp;
          <a href="https://discord.gg/GDBaBfTdQw" target="_blank" rel="noopener noreferrer">
            Discord
          </a>
          &nbsp; to receive more information about launch date.
        </p>
      ),
    },
    {
      qs: `How much is a Legendary Owl NFT?`,
      ans: (
        <p>
          The public sale will list a Legendary Owl mint for 0.05 ETH+Gas.
          Whitelisted addresses will be able to mint an Owl for 0.04 ETH+Gas.
          Those who are whitelisted will receive the privilege to mint an OWL
          for lower prices and low gas.
        </p>
      ),
    },
    {
      qs: `Where can I view my Owl NFT?`,
      ans: (
        <p>
          After a successful mint, you can view your owl on OpenSea by
          connecting to your wallet.
        </p>
      ),
    },
    {
      qs: ` Will there be something innovative in this project?`,
      ans: (
        <p>
          Legendary owls is an NFT project, based on our dreams of creating
          something unique, magical and unparalleled! We were driven by
          creativity and we are sure we’ve managed to do something magical,
          unique in the history of NFT!
          <br />
          We have revolutionized the way the traits evolve over time! Don’t take
          our word for granted, try us and then decide for yourself!
        </p>
      ),
    },
    {
      qs: `What inspired you to make the collection?`,
      ans: (
        <p>
          We are fascinated by Owls because they are incredible creatures that,
          thousands of years ago, were considered the protectors of the night.
          They are very intelligent birds and they possess mysterious abilities
          and superpowers that are unique in the animal kingdom. These
          abilities, the meanings and the rare traits of the owls , represent
          several awe-inspiring qualities that made us fall in love with these
          birds.
        </p>
      ),
    },
    {
      qs: `Why do you think the project will be great? Do you have a long-term roadmap?`,
      ans: (
        <p>
          We don`t think the project will be merely great, for sure it will be
          brilliant because this is a long-term project hyper focused on utility
          for holders, passive rewards, private events, raffles and upcoming
          collections. Our team is 100% dedicated to the success of our project
          and are fully aware of what it takes for a project to succeed.
        </p>
      ),
    },
  ];
  return (
    <section className="faq sections" id="faq">
      <div className="container">
        <Slide bottom>
          <h2>FAQS</h2>
        </Slide>
        <Slide bottom cascade>
          <div>
            {faqData.map((data, i) => {
              return (
                <div
                  key={i}
                  className={`faq_box ${activeFaq === i ? "open" : ""}`}
                >
                  <p
                    className="faq_question"
                    onClick={() =>
                      setActiveFaq((prev) => (prev === i ? null : i))
                    }
                  >
                    {data?.qs}
                  </p>
                  <div
                    className={`faq_answer faq-content ${activeFaq === i ? "active-faq" : ""
                      }`}
                  >
                    <>{data?.ans}</>
                  </div>
                </div>
              );
            })}
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default Faq;
