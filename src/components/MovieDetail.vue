<template>
  <teleport to="body">
    <template v-if="selectedMovieInfo">
      <div
        class="modal"
        @click="offModal">
        <div
          class="modal__inner"
          @click.stop>
          <button
            class="btn-close"
            @click="offModal">
            ×
          </button>
          <div class="movie-image">
            <img
              :src="moviePosterImg"
              alt="movie poster" />
          </div>
          <div class="movie-content">
            <header>
              <div class="title">
                {{ selectedMovieInfo.title }} 
              </div>
              <div
                v-if="selectedMovieInfo.rating"
                class="rating">
                <Star />
                <div><span class="rating-ratio">{{ selectedMovieInfo.rating }}</span> / 10</div>
              </div>
            </header>
            <main>
              <div class="description">
                <span v-if="selectedMovieInfo.country">{{ selectedMovieInfo.country }}</span>
                <span v-if="selectedMovieInfo.year">{{ selectedMovieInfo.year }}</span>
                <span v-if="selectedMovieInfo.type">{{ selectedMovieInfo.type }}</span>
                <span v-if="selectedMovieInfo.runtime">{{ selectedMovieInfo.runtime }}</span>
              </div>
              <div class="genre">
                <ul class="genre-list">
                  <li
                    v-for="(genre, idx) in selectedMovieInfo.genre"
                    :key="idx"
                    class="genre-item badge">
                    {{ genre }}
                  </li>
                </ul>
              </div>
              <div
                v-if="selectedMovieInfo.rated"
                class="rated badge">
                {{ selectedMovieInfo.rated }}
              </div>
              <div class="credits">
                <div v-if="selectedMovieInfo.actors">
                  <span class="label">Actors</span>
                  <span>
                    {{ selectedMovieInfo.actors }} 
                  </span>
                </div>
                <div v-if="selectedMovieInfo.director">
                  <span class="label">Director</span>
                  <span>
                    {{ selectedMovieInfo.director }}
                  </span>
                </div>
              </div>
              <div
                v-if="selectedMovieInfo.plot"
                class="plot">
                {{ selectedMovieInfo.plot }}
              </div>
            </main>
          </div>
        </div>
      </div>
    </template>
  </teleport>
</template>

<script>
import Star from './Star';

import { STORE, DEFAULT_MOVIE_POSTER_SRC } from '~/utils/constants.js';

export default {
  components: {
    Star
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  computed: {
    selectedMovieInfo() {
      return this.$store.state.selectedMovieInfo;
    },
    moviePosterImg() {
      const biggerImage = this.selectedMovieInfo.posterImg && this.selectedMovieInfo.posterImg.replace('SX300', 'SX900');

      return biggerImage ? biggerImage : DEFAULT_MOVIE_POSTER_SRC.BIGGER ;
    },
  },
  watch: {
    modalValue(newValue) {
      if(newValue) {
        window.addEventListener('keyup', this.keyupHandler);
      }else {
        window.removeEventListener('keyup', this.keyupHandler);
      }
    }
  },  
  methods: {
    keyupHandler(event) {
      const escKey = 'Escape';
      if(event.key === escKey) {
        this.offModal();
      }
    },
    onModal() {
      this.$emit('update:modelValue', true);
    },
    offModal() {
      this.$emit('update:modelValue', false);
      this.$store.commit(STORE.MUTATIONS.RESET_SELECTEDMOVIEINFO);
    }
  } 
};
</script>

<style scoped lang="scss">
$background-color: rgba(black, .5);
$box-shadow-color: rgba(black, .2);
$blue: rgb(87, 153, 239);
$black: #22272e;
$gray: #ccc;
$white: #fff;
.modal {
  background-color: $background-color;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  overscroll-behavior: contain;
  
  &__inner {
    width: 900px;
    max-height: 500px;
    display: flex;
    background-color: $white;
    box-shadow: 0 10px 10px $box-shadow-color;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }

  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 28px;
    border: 0;
    color: $black;
    background-color: transparent;
    cursor: pointer;
  }
}

.movie-image {
  width: 340px;
  height: 500px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.movie-content {
  color: $black;
  width: 560px;
  padding: 65px 25px;
  font-weight: 400;
  font-size: 15px;

  header {
    display: flex;
    justify-content: space-between;
  }

  .title {
    max-width: 400px;
    font-weight: 700;
    font-size: 36px;
    margin-bottom: 2px;
  }

  .description {
    span::after {
      content: '・';
    }

    span:last-child::after {
      display: none;
    }
  }
  .genre-list {
    display: flex;
    margin: 4px 0;
  }

  .genre-item {
    background-color: $gray;

    &:last-child {
      margin-right: 0;
    }
  }
  .rated {
    display: inline-block;
    background-color: $blue;
  }
  
  .rating {
    display: flex;
    align-items: center;
    align-self: flex-start;
    margin: 4px 0;

    svg {
      margin-right: 4px;
    }

    &-ratio {
      font-size: 20px;
      font-weight: 700;
    }
  }

  .credits {
    margin: 10px 0;
  }

  .label {
    font-size: 16px;
    font-weight: 700;
    margin-right: 6px;
  }

  .plot {
    overflow-y: auto;
    margin: 18px 0;
  }
}

.badge {
  border-radius: 3px;
  padding: 4px;
  font-size: 13px;
  font-weight: 700;
  color: $black;
  margin-right: 5px;
}
</style>
