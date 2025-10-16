import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/home.css';
import DonateImg from '../../images/Donate.png';

function Home() {
  const comment = [
    'I had so many clothes I never wore — this made it easy to donate them!',
    'Super convenient and I love that it helps real charities.',
    'No more plastic bags through the door. So much better.',
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
        <div className="joinus">
          <Link to="/sign_up" className="joinus_btn">
            Join Us
          </Link>
        </div>
        <div className="or">
          <h2>or</h2>
        </div>
        <div className="login">
          <Link to="/login" className="login_btn">
            Login
          </Link>
        </div>
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
          <img src={DonateImg} alt="Why donate clothes" />
        </div>
      </div>

      <div className="charities">
        <h2>Charities we are working with...</h2>
        <div className="charity_text">
          <p>text</p>
          <p>text</p>
          <p>text</p>
          <p>text</p>
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

      <div className="image">
        <img src={DonateImg} alt="Why donate clothes" />
      </div>

      <div className="Header">
        <h2>How it Works</h2>
        <p>Donating Clothes The Easy Way</p>

        <div className="how_works_content">
          <div className="steps_container">
            <div className="step1">
              <h2>Log your donation</h2>
              <p>Follow the simple steps once logged in ...</p>
            </div>
            <div className="step2">
              <h2>Bag up your clothes</h2>
              <p>Pop your clean, pre-loved clothes into any bag or box...</p>
              <div className="image"></div>
            </div>
            <div className="step3">
              <h2>We collect or you drop off</h2>
              <p>On your chosen day, we’ll either collect your donation...</p>
            </div>
            <div className="step4">
              <h2>We process your donation</h2>
              <p>Once approved, our partner charities carefully sort...</p>
            </div>
            <div className="step5">
              <h2>Our charity — and the planet — benefit</h2>
              <p>Once your clothes are reused or resold...</p>
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
              An estimated £140m worth of clothing is sent to UK landfill every
              year*
            </p>
            <p>
              The average UK household owns £4000 worth of clothes — and unused
              clothes in UK wardrobes are worth £30bn*
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
                </Link>
              </li>
              <li>
                <Link to="/FAQ" className="">
                  What can I donate?{' '}
                </Link>
              </li>
              <li>
                <Link to="/FAQ" className="">
                  How do I book a collection?
                </Link>
              </li>
              <li>
                <Link to="/FAQ" className="">
                  How much money goes to my chosen charity?
                </Link>
              </li>
            </ul>
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
        <div className="image">
          <img src="" alt="img" />
        </div>
        <div className="why_text">
          <p>
            Ready to free up space in your wardrobe — and leave your heart
            happy?
          </p>
          <div className="joinus">
            <Link to="/sign_up" className="joinus_btn">
              Join Us
            </Link>
          </div>
          <div className="or">
            <h3>or</h3>
          </div>
          <div className="login">
            <Link to="/login" className="login_btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
