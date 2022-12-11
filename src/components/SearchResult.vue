<template>
  <Spinner v-if="isLoading" />
  <div v-else>
    <ul class="movie-list">
      <li
        v-for="movieItem in movieList"
        :key="movieItem.imdbID"
        class="movie-item">
        <div class="movie-card">
          <div
            class="movie-image"
            @click="showMovieDetail(movieItem.imdbID)">
            <img
              :src="moviePosterImg(movieItem)"              
              :alt="movieItem.Title" />
          </div>
          <div class="movie-content">
            <div class="title">
              <strong>{{ movieItem.Title }}</strong>
            </div>
            <div class="description">
              {{ movieItem.Year }}・{{ movieItem.Type }}
            </div>
          </div> 
        </div>
      </li>
    </ul>
    <Pagination />
    <MovieDetail v-model="isShow" />
  </div>
</template>

<script>
import Spinner from './Spinner';
import Pagination from './Pagination';
import MovieDetail from './MovieDetail';

import { STORE, DEFAULT_MOVIE_POSTER_SRC } from '~/utils/constants.js';

export default {
  components: {
    Spinner,
    Pagination,
    MovieDetail
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    movieList() {
      return this.$store.state.movieList;
    },
  },
  methods: {
    showMovieDetail(movieId) {
      this.isShow = true;      
      this.$store.dispatch(STORE.ACTIONS.FETCH_SELECTEDMOVIEINFO, movieId);
    },
    moviePosterImg(movieItem) {
      return movieItem.Poster !== 'N/A' ? movieItem.Poster : DEFAULT_MOVIE_POSTER_SRC.SMALL ;
    },
  }
};
</script>

<style scoped lang="scss">
.movie-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  margin: 20px 0;
}

.movie-item {
  padding: 0 8px;
  &:hover .movie-image img {
    transform: scale(1.05);
  }
}

.movie-card {
  width: 180px;
  height: 320px;
}

.movie-image {
  width: 100%;
  height: 240px;
  overflow: hidden;
  margin-bottom: 3px;
  border-radius: 5px;
  cursor: pointer;

  img {
    display: block;
    width:100%;
    height: 100%;
    object-fit: cover;
    transition: all 250ms ease-in-out;
  }
}

.movie-content {
  color: #292A32;
  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .description {
    font-size: 14px;
  }
}

</style>
