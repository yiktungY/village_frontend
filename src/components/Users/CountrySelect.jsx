import { Country, State, City } from "country-state-city";

import Select from "react-select";

const CountrySelect = ({ selectedOption, setSelectedOption }) => {
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
    <div className="flex flex-col justify-between h-40">
      <Select
        className="m-2"
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
        className="m-2"
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
        className="m-2"
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

export default CountrySelect;
