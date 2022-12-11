<template>
  <ul class="pagination-list">
    <li
      v-for="page in totalPage"
      :key="page"
      :class="['pagination-item', {'is-current': page === currentPage}]"
      @click="moveToPage(page)">
      <div class="pagination-link">
        {{ page }}
      </div>
    </li>
  </ul>
</template>

<script>
import { STORE } from '~/utils/constants.js';

export default {
  computed: {
    currentPage() {
      return this.$store.state.currentPage;
    },
    totalPage() {
      return this.$store.state.totalPage;
    },
  },
  methods: {
    moveToPage(page) {
      if(this.currentPage !== page){
        this.$store.commit(STORE.MUTATIONS.CHANGE_PAGE, page);
        this.$store.dispatch(STORE.ACTIONS.FETCH_MOVIELIST, true);
      }
    }
  }
};
</script>

<style scoped lang="scss">
$light-gray: #dbdbdb;
$gray: #666666;
$dark-gray: #363636;
$white: #fff;
$yellow: rgb(245, 197, 24);

.pagination-list {
  max-width: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 15px auto;
}

.pagination-item {
  width: 28px;
  height: 28px;
  border: 1px solid $light-gray;
  border-radius: 3px;
  margin: 0.25rem;
  color: $dark-gray;
  background-color: $white;
  transition: all 100ms ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: $gray;
    border-color: $gray;
    color: $white;
  }
}

.pagination-link {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  text-align: center;
}

.is-current {
  background-color: $yellow;
  border-color: $yellow;
  font-weight: 700;
}
</style>
