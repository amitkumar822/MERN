import React, { useState } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

const CountryStateCitySelect = () => {
  const [country, setCountry] = useState({ isoCode: "", name: "" });
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState({ isoCode: "", name: "" });
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({ name: "" });

  // Transform options for React Select
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const cityOptions = cities.map((city) => ({
    value: city.name,
    label: city.name,
  }));

  const handleCountryChange = (selectedOption) => {
    const selectedCountry = Country.getAllCountries().find(
      (country) => country.isoCode === selectedOption.value
    );
    setCountry({ isoCode: selectedCountry.isoCode, name: selectedCountry.name });
    setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    setSelectedState({ isoCode: "", name: "" });
    setCities([]);
    setSelectedCity({ name: "" });
  };

  const handleStateChange = (selectedOption) => {
    const selectedState = states.find((state) => state.isoCode === selectedOption.value);
    setSelectedState({ isoCode: selectedState.isoCode, name: selectedState.name });
    setCities(City.getCitiesOfState(country.isoCode, selectedState.isoCode));
    setSelectedCity({ name: "" });
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity({ name: selectedOption.value });
  };

  return (
    <div>
      <h1>Country, State, and City Selector</h1>

      <label htmlFor="country">Country</label>
      <Select
        id="country"
        name="country"
        className="cursor-pointer lg:w-[180px] w-[90%]"
        options={countryOptions}
        value={countryOptions.find((option) => option.value === country.isoCode)}
        onChange={handleCountryChange}
        placeholder="Select Country"
      />
      <br /> <br />

      <label htmlFor="state">State</label>
      <Select
        id="state"
        name="state"
        className="cursor-pointer lg:w-[180px] w-[90%]"
        options={stateOptions}
        value={stateOptions.find((option) => option.value === selectedState.isoCode)}
        onChange={handleStateChange}
        placeholder="Select State"
        isDisabled={!states.length}
      />
      <br /> <br />

      <label htmlFor="city">City</label>
      <Select
        id="city"
        name="city"
        className="cursor-pointer lg:w-[180px] w-[90%]"
        options={cityOptions}
        value={cityOptions.find((option) => option.value === selectedCity.name)}
        onChange={handleCityChange}
        placeholder="Select City"
        isDisabled={!cities.length}
      />
      <br /> <br />

      <h2>Selected Values:</h2>
      <p>
        <strong>Country:</strong> {country.name || "None"}
      </p>
      <p>
        <strong>State:</strong> {selectedState.name || "None"}
      </p>
      <p>
        <strong>City:</strong> {selectedCity.name || "None"}
      </p>
    </div>
  );
};

export default CountryStateCitySelect;


