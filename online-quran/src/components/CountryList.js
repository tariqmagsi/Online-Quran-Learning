import React from "react";
import HomeBody from "../components/HomeBody";
import countrylist from "../country/countrylist.json";

const CountryList = () => {
  const countryListNew = countrylist.map((country, i) => {
    return (
      <HomeBody
        key={countrylist.countries.country[i].countryCode}
        name={countrylist.countries.country[i].countryName}
      />
    );
  });
  return <option>{countryListNew}</option>;
};
export default CountryList;
