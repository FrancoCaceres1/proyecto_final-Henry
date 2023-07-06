const initialState = {
  allCountries: [],
  allCountriesFilter: [],
  countryDetail: [],
  allActivities: [],
  allActivitiesFilter: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COUNTRIES": {
      const allCountries = action.payload;
      const allCountriesFilter = action.payload;

      return {
        ...state,
        allCountries,
        allCountriesFilter,
        allActivitiesFilter: [],
      };
    }

    case "GET_COUNTRIES_DETAIL":
      return {
        ...state,
        countryDetail: action.payload,
      };

    case "CLEAN_DETAIL":
      return {
        ...state,
        countryDetail: [],
      };

    case "ADD_ACTIVITIES": {
      const allActivities = action.payload;
      const allActivitiesFilter = action.payload;

      return {
        ...state,
        allCountriesFilter: [],
        allActivities,
        allActivitiesFilter,
      };
    }

    case "GET_ACTIVITIES":
      return {
        ...state,
        allActivities: action.payload,
      };

    case "SEARCH_COUNTRIES":
      return {
        ...state,
        allCountriesFilter: action.payload,
        allActivitiesFilter: [],
      };

    case "FILTER_BY_CONTINENT": {
      const continentFiltered =
        action.payload === "All"
          ? state.allCountries
          : state.allCountries.filter(
              (coun) => coun.continent === action.payload
            );

      return {
        ...state,
        allActivitiesFilter: [],
        allCountriesFilter: continentFiltered,
      };
    }

    case "FILTER_ACTIVITIES": {
      const allActivitiesFiltered =
        action.payload === "All"
          ? state.allActivities
          : state.allActivities.filter((coun) => coun.name === action.payload);

      return {
        ...state,
        allCountriesFilter: [],
        allActivitiesFilter: allActivitiesFiltered,
      };
    }

    case "FILTER_ORDER": {
      let allCountriesFilterByOrder;

      if (action.payload === "A") {
        allCountriesFilterByOrder = state.allCountriesFilter.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }

      if (action.payload === "D") {
        allCountriesFilterByOrder = state.allCountriesFilter.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }

      if (action.payload === "P") {
        allCountriesFilterByOrder = state.allCountriesFilter.sort(
          (a, b) => a.population - b.population
        );
      }

      if (action.payload === "G") {
        allCountriesFilterByOrder = state.allCountriesFilter.sort(
          (a, b) => b.population - a.population
        );
      }

      return {
        ...state,
        allCountriesFilter: [...allCountriesFilterByOrder],
      };
    }

    case "DELETE_ACTIVITIES": {
      const updatedActivities = state.allActivities.filter(
        (activity) => activity.id !== action.payload
      );

      return {
        ...state,
        allActivities: updatedActivities,
        allActivitiesFilter: updatedActivities,
      };
    }

    case "FETCH_ACTIVITIES": {
      return {
        ...state,
        allActivities: action.payload,
        allActivitiesFilter: action.payload,
      };
    }

    case "FETCH_COUNTRIES": {
      const allCountries = action.payload;
      const allCountriesFilter = action.payload;

      return {
        ...state,
        allCountries,
        allCountriesFilter,
        allActivitiesFilter: [],
      };
    }

    default:
      return state;
  }
};

export default reducer;
