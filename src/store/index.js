import { createStore } from 'vuex';
import { request } from '~/utils/api.js';
import { STORE } from '~/utils/constants.js';

export default createStore({
  state() { 
    return {
      isLoading: false,
      movieTitle: '',
      movieList:[],
      selectedMovieInfo: null,
      currentPage: 1,
      totalPage: 0,
    };
  },
  mutations: {
    getMovieList(state, result) {
      const {movieList, totalPage} = result;
      state.movieList = [...movieList];
      state.totalPage = totalPage;
    },
    changePage(state, newPage) {
      state.currentPage = newPage;
    },
    updateMovieTitle(state, newMovieTitle) {
      state.movieTitle = newMovieTitle;
    },
    setSelectedMovieInfo(state, newMovieData) {
      state.selectedMovieInfo = newMovieData;
    },
    resetSelectedMovieInfo(state) {
      state.selectedMovieInfo = null;
    },
  },
  actions: { 
    async fetchMovieList({ state, commit }, changedPage = false) {
      if(!changedPage) {
        commit(STORE.MUTATIONS.CHANGE_PAGE, 1);
      }
      
      this.state.isLoading = true;
      
      const { movieTitle, currentPage } = state;
      const data = await request(`&s=${movieTitle}&page=${currentPage}`);

      const { Search, totalResults }  = data;
      const result = {
        movieList: Search,
        totalPage: Math.ceil(parseInt(totalResults, 10) / 10)
      };
      
      commit(STORE.MUTATIONS.GET_MOVIELIST, result);

      this.state.isLoading = false;
    },
    async fetchSelectedMovieInfo({ commit }, movieId) {
      const getValidValue = (value, isGenre = false) => {
        if(isGenre) {
          return value === 'N/A' ? null : value.split(', ');
        }

        return value === 'N/A' ? null : value;      
      };

      const data = await request(`&i=${movieId}&plot=short`);
      const selectedMovieData = {
        id: data.imdbID,
        title: data.Title,
        type: getValidValue(data.Type),
        year: getValidValue(data.Year),
        runtime: getValidValue(data.Runtime),
        country: getValidValue(data.Country),
        actors: getValidValue(data.Actors),
        director: getValidValue(data.Director),
        genre: getValidValue(data.Genre, true),
        plot: getValidValue(data.Plot),
        posterImg: getValidValue(data.Poster),
        rated: getValidValue(data.Rated),
        rating: getValidValue(data.imdbRating),
      };
      
      commit(STORE.MUTATIONS.SET_SELECTEDMOVIEINFO, selectedMovieData);
    }
  },
});
