import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utils";

import typing_image from "../../assets/home_typing_image.png";

import "./../../utils/styles.css";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div id="body" className="mx-[5%]">
        <h2 className="text-4xl font-bold">Welcome to Key Usage Profiler</h2>

        <div className="container flex">
            {/* Coluna de Texto */}
            <div className="w-1/2 p-6">
              <p className="text-xl">
                A service made for teams and groups of friends.
              </p>
              <p className="text-sm">
                Join the community and start tracking your keystrokes as well!
              </p>
            </div>

            {/* Coluna da Imagem */}
            <div className="w-1/2 p-6">
              <img className="mx-auto w-[50%] my-10" src={typing_image} alt="Typing" />
            </div>
          </div>

        <div className="divider"></div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
