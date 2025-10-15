import react from 'react';
import '../../css/home.css';

function Home() {
    return (
        <section className="home" id="home">
          <div className="home_content">
            <div className="joinus">
              <a href="#joinus" className="joinus_btn">Join Us</a>
            </div>
            <div className="or">
              <h2>or</h2>
            </div>
            <div className="signup">
              <a href="#signup" className="signup_btn">Sign Up</a>
            </div>
          </div>
          <div className="why_donate">
            <div className="image">
            <img src="/images/Donate.png" alt="Why donate clothes" />
            </div>
            <h2>Why Donate Clothes?</h2>
            <p>
            Free up space in your wardrobe. But leave your heart happy.
            </p>
          </div>
          <div className="impact">
            <p>
                By giving us your pre-loved clothes and textiles, you’ll: <br></br>
                <br></br>
                •  Raise funds for a British charity of your choice – we give 82% of the proceeds to your chosen charity <br></br>
                •  Make your life easier – book a collection on a date that works for you, no more trips to the charity shop <br></br>
                •  Help us save the planet – your clothes don’t go to landfill, plus there’s no more plastic bags through your door <br></br>
                •  Give your clothes a second home – and those in need around the world access to affordable clothing
            </p>
          </div>
        </section>
      );
}

export default Home;