import { useState } from "react";
import { Country, State, City } from "country-state-city";

import Select from "react-select";

const DashboradPage = () => {
  const [selectedOption, setSelectedOption] = useState({
    country: null,
    state: null,
    city: null,
  });
  const countryOptions = Country.getAllCountries().map((country) => {
    return {
      value: country.name,
      label: country.name,
      ...country,
    };
  });
  const stateOptions = (countryCode) => {
    return State.getStatesOfCountry(countryCode).map((state) => {
      return {
        value: state.name,
        label: state.name,
        ...state,
      };
    });
  };
  const cityOptions = (countryCode, stateCode) => {
    return City.getCitiesOfState(countryCode, stateCode).map((city) => {
      return {
        value: city.name,
        label: city.name,
        ...city,
      };
    });
  };

  return (
    <div>
      <Select
        defaultValue={selectedOption.country}
        onChange={(value) => {
          setSelectedOption((prev) => ({
            ...prev,
            country: value,
          }));
        }}
        options={countryOptions}
        placeholder="Country"
      />
      <Select
        defaultValue={selectedOption.state}
        onChange={(value) => {
          setSelectedOption((prev) => ({
            ...prev,
            state: value,
          }));
        }}
        options={stateOptions(selectedOption.country?.isoCode)}
        placeholder="State"
      />
      <Select
        defaultValue={selectedOption.city}
        onChange={(value) => {
          setSelectedOption((prev) => ({
            ...prev,
            city: value,
          }));
        }}
        options={cityOptions(
          selectedOption.state?.countryCode,
          selectedOption.state?.isoCode
        )}
        placeholder="City"
      />
    </div>
  );
};

export default DashboradPage;
