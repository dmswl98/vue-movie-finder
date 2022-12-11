<template>
  <div
    class="search-form">
    <a
      class="logo"
      href="/">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1920px-IMDB_Logo_2016.svg.png"
        alt="imdb-logo" />
    </a>
    <form @submit.prevent="searchMovie">
      <input
        v-model="movieTitle"
        type="text" 
        placeholder="Search movie" />
      <button>
        Search
      </button>
    </form>
  </div>
</template>

<script>
import { STORE } from '~/utils/constants.js';

export default {
  data() {
    return {
      movieTitle: ''
    };
  },
  methods: {
    searchMovie() {      
      const prevMovieTitle = this.$store.state.movieTitle;
      if(prevMovieTitle !== this.movieTitle) {
        this.$store.commit(STORE.MUTATIONS.UPDATE_MOVIETITLE, this.movieTitle);
        this.fetchMovies();
      } else {
        this.fetchMovies();
      }

      this.movieTitle = '';
    },
    fetchMovies() {
      this.$store.dispatch(STORE.ACTIONS.FETCH_MOVIELIST);
    },
  }  
};
</script>

<style scoped lang="scss">
$yellow: rgb(245, 197, 24);
$dark-yellow: rgb(230, 177, 1);
$white: #fff;
.search-form {
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    min-width: 340px;
    height: 40px;
    border: 2px solid $yellow;
    border-radius: 5px;
    background-color: $white;
    margin-right: 10px;
    padding: 10px;
    font-size: 16px;
  }

  button {
    height: 40px;
    background-color: $yellow;
    border: 2px solid $yellow;
    border-radius: 5px;
    padding: 0 10px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;

    &:hover {
      background-color: $dark-yellow;
      border-color: $dark-yellow;
    }
  }
}
.logo {
  display: block;
  width: auto;
  height: 40px;
  margin-right: 16px;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
