<template>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for recipes..."
        @keyup.enter="searchRecipes"
      />
      <button @click="searchRecipes">Search</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RecipeSearch',
    data() {
      return {
        searchQuery: ''
      };
    },
    methods: {
      searchRecipes() {
        this.$emit('search', this.searchQuery);
      }
    }
  };
  </script>
  
  <style scoped>
  .search-container {
    display: flex;
    margin-bottom: 2rem;
    max-width: 600px;
    margin: 0 auto 2rem;
  }
  
  input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #ff5252;
  }
  </style>