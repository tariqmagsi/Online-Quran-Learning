import React from "react";
import "../css/Homestyle.css";
import "../css/HeaderStyle.css";

const HomeContent = () => {
  return (
    <div
      style={{ fontFamily: "Platino, Times New Roman" }}
      className="home-body"
    >
      <h2 className="text-success">Learn Online Quran With Proper Tajweed</h2>
      <br />
      <div className="container">
        <h3 className="text-success">Why Learn Quran Online?</h3>
        <p>
          To learn Quran is important for every Muslim and through online it
          becomes very easy to learn Quran with best teacher from whom you want
          to learn. Your tajweed can be more fluent after learning online Quran
          from the best teacher. You can aslo ask any query about anything by
          just messaging online and you will learn Quran with live transmission.
        </p>

        <h3 className="text-success">About Us</h3>
        <p>
          Taalam AlQuran started in 2019. Taalam AlQuran is the platform where
          we want to teach everyone fluently with tajweed so that there could bh
          no chances of Quran in reciting and we are also offering different
          courses by which you can also know about hadees, Islam more perfectly
          and you can also be Aalim.
        </p>
        <br />
      </div>
    </div>
  );
};

export default HomeContent;
