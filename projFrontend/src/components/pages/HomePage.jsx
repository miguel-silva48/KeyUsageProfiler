import { useNavigate } from "react-router-dom";

import typing_image from "../../assets/home_typing_image.png";

import "./../../utils/styles.css";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-screen flex-col items-start gap-2.5">
        <div className="w-full h-[63rem]">
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div id="body" className="mx-[5%] mt-3">
        <h2 className="text-4xl font-bold">Welcome to Key Usage Profiler</h2>

        <div className="container flex"> */}
            {/* Coluna de Texto
            <div className="w-1/2 p-6">
              <p className="text-xl">
                A service made for teams and groups of friends.
              </p>
              <p className="text-sm">
                Join the community and start tracking your keystrokes as well!
              </p>
            </div>

            {/* Coluna da Imagem */}
            {/* <div className="w-1/2 p-6">
              <img className="mx-auto w-[50%]" src={typing_image} alt="Typing" />
            </div>
            <div className="">
              <p>You can join a team through an Invite Link</p>
              <p>or</p>
              <p>You can create a team and invite your friends!</p>
            </div>
          </div>
        <div className="divider"></div>
      </div> */} */
      <Footer />
    </div>
  );
};

export default HomePage;
