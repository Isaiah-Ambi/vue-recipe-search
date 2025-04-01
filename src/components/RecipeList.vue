<template>
    <div>
      <div v-if="loading" class="loading">
        <p>Loading recipes...</p>
      </div>
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="recipes && recipes.length > 0" class="recipe-grid">
        <recipe-card
          v-for="recipe in recipes"
          :key="recipe.idMeal"
          :recipe="recipe"
        />
      </div>
      <div v-else class="no-results">
        <p>No recipes found. Try another search.</p>
      </div>
    </div>
  </template>
  
  <script>
  import RecipeCard from './RecipeCard.vue';
  
  export default {
    name: 'RecipeList',
    components: {
      RecipeCard
    },
    props: {
      recipes: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      },
      error: {
        type: String,
        default: ''
      }
    },
    beforeCreate() {
      console.log('RecipeList component is being created ');
    },
    onMounted() {
      console.log('RecipeList component mounted');
    },
  };
  console.log('RecipeList component loaded');
  </script>
  
  <style scoped>
  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .loading, .error, .no-results {
    text-align: center;
    padding: 2rem;
    font-size: 18px;
    color: #666;
  }
  
  .error {
    color: #ff5252;
  }
  </style>