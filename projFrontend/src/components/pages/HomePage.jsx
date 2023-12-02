import typing_image from "../../assets/home_typing_image.png";

import "./../../utils/styles.css";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-screen flex-col items-start gap-2.5">
        <div className="w-full h-[63rem] bg-white">
          <div className="w-[35rem] h-[31.5rem] absolute left-[9.5rem] top-[14.4rem]">
            <p className="w-[34rem] font-sans text-6xl not-italic font-extrabold leading-[4.125rem] bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent">
              A service made for teams and groups of friends.
            </p>
            <p className="w-[31.37rem] text-base text-gray-600">Join the community and start tracking your statistics as well!</p>
            <div className="flex items-center gap-3 self-stretch p-5">
              <p>You can join a team through an Invite Link</p>
            </div>
            <form className="w-[34.5rem] h-[4.3rem] shrink-0">
              <div className="flex w-full h-full flex-col justify-center items-start gap-2.5 shrink-0">
                <div className="flex p-5 pr-6 items-center gap-3 flex-[1_0_0] self-stretch rounded-2xl border border-gray-400 bg-gray-50">
                  <input id="team-name" placeholder="Enter team name"></input>
                  <button className="flex w-[13rem] h-[3.35rem] p-4 flex-col justify-center items-center gap-2.5 shrink-0 rounded-[0.625rem] bg-gray-950">
                    <div className="flex justify-center items-center gap-2">
                      <p className="text-white text-base font-bold text-white">Join Team</p>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <img className="w-[22rem] h-[22rem] absolute right-80 top-56" src={typing_image} alt="Typing" />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
