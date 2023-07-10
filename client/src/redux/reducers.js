export const initialState = {
  allCountries: [],
  allCountriesFilter: [],
  countryDetail: [],
  allActivities: [],
  allActivitiesFilter: [],
  selectedContinent: "All",
  selectedActivity: "All",
  searchError: null,
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
        searchError: null,
      };

    case "SEARCH_ERROR":
      return {
        ...state,
        searchError: action.payload,
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
      const allCountriesFiltered = state.allCountries?.filter((country) => {
        const countryActivities =
          country.Activities && country.Activities.length > 0
            ? country.Activities.map((activity) => activity.name)
            : undefined;
        const selectedActivity = action.payload;
        return (
          selectedActivity === "All" ||
          countryActivities?.includes(selectedActivity)
        );
      });
      const filteredActivities = state.allActivities?.filter((activity) => {
        return action.payload === "All" || activity.name === action.payload;
      });

      return {
        ...state,
        allCountriesFilter: allCountriesFiltered || [],
        allActivitiesFilter: filteredActivities || [],
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
      console.log(action.payload);
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

    case "RESET_FILTERS":
      return {
        ...state,
        allCountriesFilter: state.allCountries,
      };

    default:
      return state;
  }
};

export default reducer;
