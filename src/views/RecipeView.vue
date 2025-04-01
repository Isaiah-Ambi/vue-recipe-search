<template>
    <div>
      <div v-if="loading" class="loading">
        <p>Loading recipe details...</p>
      </div>
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      <recipe-detail v-else-if="recipe" :recipe="recipe" />
      <div v-else class="not-found">
        <p>Recipe not found.</p>
        <button @click="$router.push({ name: 'home' })">Back to Recipes</button>
      </div>
    </div>
  </template>
  
  <script>
  import RecipeDetail from '@/components/RecipeDetail.vue';
  import MealService from '@/services/MealService.js';
  
  export default {
    name: 'RecipeView',
    components: {
      RecipeDetail
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        recipe: null,
        loading: false,
        error: ''
      };
    },
    created() {
      this.getRecipe();
    },
    methods: {
      async getRecipe() {
        this.loading = true;
        this.error = '';
        
        try {
          const response = await MealService.getMealById(this.id);
          
          if (response.data.meals && response.data.meals.length > 0) {
            this.recipe = response.data.meals[0];
            console.log(this.recipe)
          } else {
            this.error = 'Recipe not found.';
          }
        } catch (error) {
          this.error = 'An error occurred while loading the recipe.';
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .loading, .error, .not-found {
    text-align: center;
    padding: 3rem;
    font-size: 18px;
  }
  
  .error {
    color: #ff5252;
  }
  
  button {
    margin-top: 1rem;
    padding: 10px 20px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #ff5252;
  }
  </style>