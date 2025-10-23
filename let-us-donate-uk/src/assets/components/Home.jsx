import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/home.css';
import DonateImg from '../../images/Donate.png';
import DonateImg2 from '../../images/Donate2.png';
import DonateImg3 from '../../images/Donate3.png';
import DonateImg4 from '../../images/Donate4.png';

function Home() {
  const comment = [
    'I had so many clothes I never wore — this made it easy to donate them!',
    'Super convenient and I love that it helps real charities!',
    'No more plastic bags through the door. So much better!',
  ];

  const [currentComment, setCurrentComment] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentComment((prevIndex) => (prevIndex + 1) % comment.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [comment.length]);

  return (
    <section className="home" id="home">
      <div className="home_content">
        <button>
          {' '}
          <div className="joinus">
            <Link to="/sign_up">Join Us</Link>
          </div>
        </button>
        <div className="or">
          <h2>or</h2>
        </div>
        <button>
          <div className="login">
            <Link to="/login">Login</Link>
          </div>
        </button>
      </div>

      <div className="why_donate">
        <div className="why_text">
          <h2>Why Donate Clothes?</h2>
          <p>Free up space in your wardrobe. But leave your heart happy.</p>
          <p>
            By giving us your pre-loved clothes and textiles, you’ll: <br />
            <br />
            • Raise funds for a British charity of your choice – we give 82% of
            the proceeds to your chosen charity <br />
            <br />
            • Make your life easier – book a collection on a date that works for
            you, no more trips to the charity shop <br />
            <br />
            • Help us save the planet – your clothes don’t go to landfill, plus
            there’s no more plastic bags through your door <br />
            <br />• Give your clothes a second home – and those in need around
            the world access to affordable clothing
          </p>
        </div>
        <div className="image">
          <img src={DonateImg} alt="" />
        </div>
      </div>

      <div className="charities">
        <h2>Charities we are working with...</h2>
        <div className="charity_text">
          <p>
            WearAgain Foundation<br></br>Helps low-income families by providing
            gently used clothes for work, school, and daily life.
          </p>
          <p>
            Threads of Hope UK<br></br>Supports refugees and homeless
            individuals with essential clothing and footwear.
          </p>
          <p>
            SecondChance Wardrobe<br></br>Collects and redistributes quality
            fashion items to women’s shelters and youth hostels.
          </p>
          <p>
            GreenStitch Collective<br></br>Focuses on textile recycling and
            promoting sustainable fashion initiatives.
          </p>
        </div>
      </div>

      <div className="Header">
        <h2>Here's your impact of the day...</h2>
        <div className="impact_row">
          <div className="impact_info1">
            <p>Thanks to your donations this much C02 has been saved...</p>
            <div className="co2_value">10 people!</div>
          </div>
          <div className="impact_info2">
            <p>Your clothes donations have reached...</p>
            <div className="co2_value">0 CO₂e</div>
          </div>
        </div>
      </div>

      <div className="Header">
        <div className="image2">
          <img src={DonateImg2} alt="" />
        </div>
        <div id="howitworks">
          <h2>How it Works </h2>
          <p>Donating Clothes The Easy Way</p>

          <div className="how_works_content">
            <div className="steps_container">
              <div className="step1">
                <h3>Log your donation</h3>
                <p>
                  Follow the simple steps once logged in to record your clothing
                  donation online. Add short descriptions or photos so we know
                  what you’re giving — it only takes a minute.
                </p>
              </div>
              <div className="step2">
                <h3>Bag up your clothes</h3>
                <p>
                  Pop your clean, pre-loved clothes into any bag or box. Make
                  sure everything’s washed and ready to be re-loved by someone
                  new.
                </p>
                <div className="image3">
                  <img src={DonateImg4} alt="" />
                </div>
              </div>
              <div className="step3">
                <h3>We collect or you drop off</h3>
                <p>
                  On your chosen day, we’ll either collect your donation or you
                  can drop it off at one of our partner charity locations.
                  You’ll get a reminder with your collection details
                </p>
              </div>
              <div className="step4">
                <h3>We process your donation</h3>
                <p>
                  Once approved, our partner charities carefully sort,
                  categorise, and prepare your items for redistribution or
                  resale to ensure they reach the right people.
                </p>
              </div>
              <div className="step5">
                <h3>Our charity — and the planet — benefit</h3>
                <p>
                  Once your clothes are reused or resold, your chosen charity
                  receives direct support, and you can track your sustainability
                  impact — from CO₂ saved to people helped.
                </p>
              </div>
            </div>
            <div className="Please_Donate">
              <h3>Please donate:</h3>
              <ul>
                <li>• Good quality clean adults’ and children’s clothing</li>
                <li>• Pairs of shoes</li>
                <li>• Handbags & belts</li>
                <li>• Unused underwear & swimwear</li>
              </ul>

              <h3>Please don’t give us:</h3>
              <ul>
                <li>• Stained or damaged clothing</li>
                <li>• Duvets, pillows & cushions</li>
                <li>• Books, DVDs, CDs & video games</li>
                <li>• Coat hangers, lampshades & roller blinds</li>
                <li>• & rugs</li>
                <li>• Plastic toys, board games & puzzles</li>
                <li>• Furniture & mattresses</li>
                <li>• Large electrical items</li>
              </ul>

              <h3>Did you know?</h3>
              <p>
                An estimated £140m worth of clothing is sent to UK landfill
                every year*
              </p>
              <p>
                The average UK household owns £4000 worth of clothes — and
                unused clothes in UK wardrobes are worth £30bn*
              </p>
              <p>
                <strong>Source:</strong> WRAP
              </p>

              <h3>Want to know more?</h3>
              <p>Check out our FAQs:</p>
              <ul>
                <li>
                  <Link to="/FAQ" className="">
                    What makes LetUsDonate different?
                    <br />
                  </Link>{' '}
                  <br />
                </li>
                <li>
                  <Link to="/FAQ" className="">
                    What can I donate?
                    <br />
                  </Link>
                  <br />
                </li>
                <li>
                  <Link to="/FAQ" className="">
                    How do I book a collection?
                    <br />
                  </Link>
                  <br />
                </li>
                <li>
                  <Link to="/FAQ" className="">
                    How much money goes to my chosen charity?
                    <br />
                  </Link>
                  <br />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="Header">
        <h2>What people have to say about us</h2>
        <div className="comments">
          <p>{comment[currentComment]}</p>
        </div>
      </div>

      <div className="home_content">
        <div className="image3">
          <img src={DonateImg3} alt="" />
        </div>

        <div className="ready_text">
          <p>
            Ready to free up space in your wardrobe — and leave your heart
            happy?
          </p>
          <button>
            {' '}
            <div className="joinus">
              <Link to="/sign_up">Join Us</Link>
            </div>
          </button>
          <div className="or">
            <h2>or</h2>
          </div>
          <button>
            <div className="login">
              <Link to="/login">Login</Link>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
