export const initialState = {
  allCountries: [],
  allCountriesFilter: [],
  countryDetail: [],
  allActivities: [],
  allActivitiesFilter: [],
  selectedContinent: "All",
  selectedActivity: "All",
  selectedOrder: "Any",
  selectedPopulation: "Any",
  searchError: null,
  flippedCards: [],
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

      let allCountriesFilterByOrder = [...continentFiltered];

      if (state.selectedOrder === "A") {
        allCountriesFilterByOrder.sort((a, b) => a.name.localeCompare(b.name));
      } else if (state.selectedOrder === "D") {
        allCountriesFilterByOrder.sort((a, b) => b.name.localeCompare(a.name));
      } else if (state.selectedOrder === "P") {
        allCountriesFilterByOrder.sort((a, b) => a.population - b.population);
      } else if (state.selectedOrder === "G") {
        allCountriesFilterByOrder.sort((a, b) => b.population - a.population);
      }

      let allCountriesFiltered = [...allCountriesFilterByOrder];

      if (state.selectedActivity !== "All") {
        allCountriesFiltered = allCountriesFiltered.filter((country) => {
          const countryActivities =
            country.Activities && country.Activities.length > 0
              ? country.Activities.map((activity) => activity.name)
              : [];
          return countryActivities.includes(state.selectedActivity);
        });
      }

      return {
        ...state,
        allActivitiesFilter: [],
        allCountriesFilter: allCountriesFiltered,
        filteredByContinent: continentFiltered,
      };
    }

    case "FILTER_ACTIVITIES": {
      const selectedActivity = action.payload;

      let allCountriesFiltered = [...state.allCountriesFilter];

      if (state.filteredByContinent.length > 0) {
        allCountriesFiltered = [...state.filteredByContinent];
      }

      allCountriesFiltered = allCountriesFiltered.filter((country) => {
        const countryActivities =
          country.Activities && country.Activities.length > 0
            ? country.Activities.map((activity) => activity.name)
            : [];
        return (
          selectedActivity === "All" ||
          countryActivities.includes(selectedActivity)
        );
      });

      return {
        ...state,
        allCountriesFilter: allCountriesFiltered,
        allActivitiesFilter: state.allActivities.filter(
          (activity) => activity.name === selectedActivity
        ),
        selectedActivity: selectedActivity,
      };
    }

    case "FILTER_ORDER": {
      let allCountriesFilterByOrder;

      if (state.filteredByContinent.length > 0) {
        allCountriesFilterByOrder = [...state.filteredByContinent];
      } else {
        allCountriesFilterByOrder = [...state.allCountries];
      }

      if (action.payload === "A") {
        allCountriesFilterByOrder.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "D") {
        allCountriesFilterByOrder.sort((a, b) => b.name.localeCompare(a.name));
      } else if (action.payload === "P") {
        allCountriesFilterByOrder.sort((a, b) => a.population - b.population);
      } else if (action.payload === "G") {
        allCountriesFilterByOrder.sort((a, b) => b.population - a.population);
      }

      let allCountriesFiltered = [...allCountriesFilterByOrder];

      if (state.selectedActivity !== "All") {
        allCountriesFiltered = allCountriesFiltered.filter((country) => {
          const countryActivities =
            country.Activities && country.Activities.length > 0
              ? country.Activities.map((activity) => activity.name)
              : [];
          return countryActivities.includes(state.selectedActivity);
        });
      }

      return {
        ...state,
        allCountriesFilter: allCountriesFiltered,
        selectedOrder: action.payload,
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

    case "FLIP_CARD": {
      const cardId = action.payload;
      const flippedCards = state.flippedCards.includes(cardId)
        ? state.flippedCards.filter((id) => id !== cardId)
        : [...state.flippedCards, cardId];
      return {
        ...state,
        flippedCards,
      };
    }

    case "RESET_PAGE":
      return {
        ...state,
        currentPage: 1,
      };

    default:
      return state;
  }
};

export default reducer;
