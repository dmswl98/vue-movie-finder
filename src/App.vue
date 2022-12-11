<template>
  <SearchForm />
  <SearchResult />
</template>

<script>
import SearchForm from '~/components/SearchForm';
import SearchResult from '~/components/SearchResult';

export default {
  components: {
    SearchForm,
    SearchResult
  }
};
</script>

<style>
* {
  margin: 0;
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

ul,
ol {
  padding-left: 0;
  list-style: none;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
