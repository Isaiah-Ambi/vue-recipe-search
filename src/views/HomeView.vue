<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import RecipeSearch from '../components/RecipeSearch.vue';
import RecipeList from '../components/RecipeList.vue';
import MealService from '../services/MealService.js';

// Make recipes, categories, loading, and error reactive
const recipes = ref([]);
const categories = ref([]);
const loading = ref(false);
const error = ref('');

async function searchRecipes(query) {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await MealService.searchByName(query);
    recipes.value = response.data.meals || [];
    console.log(recipes.value);
    if (recipes.value.length === 0) {
      error.value = 'No recipes found matching your search.';
    }
  } catch (err) {
    error.value = 'An error occurred while searching for recipes.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function getRandomMeals() {
  loading.value = true;
  error.value = '';
  
  try {
    const meals = [];
    
    // Get 4 random meals
    for (let i = 0; i < 4; i++) {
      const response = await MealService.getRandomMeal();
      if (response.data.meals && response.data.meals.length > 0) {
        meals.push(response.data.meals[0]);
      }
    }
    
    recipes.value = meals;
  } catch (err) {
    error.value = 'An error occurred while loading recipes.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function getCategories() {
  try {
    const response = await MealService.getCategories();
    categories.value = response.data.categories || [];
  } catch (err) {
    console.error('Error loading categories:', err);
  }
}

async function filterByCategory(category) {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await MealService.filterByCategory(category);
    recipes.value = response.data.meals || [];
    
    if (recipes.value.length === 0) {
      error.value = 'No recipes found in this category.';
    }
  } catch (err) {
    error.value = 'An error occurred while loading recipes.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onBeforeMount(() => {
  getRandomMeals()
})

defineExpose({
  RecipeSearch,
  RecipeList,
  recipes,
  categories,
  loading,
  error,
  searchRecipes,
  getRandomMeals,
  getCategories,
  filterByCategory
});
</script>

<template>
  <div class="home">
    <h2 class="title">Find Your Perfect Recipe</h2>
    <recipe-search @search="searchRecipes" />
    
    <div class="categories" v-if="categories.length > 0">
      <h3>Browse by Category</h3>
      <div class="category-buttons">
        <button 
          v-for="category in categories" 
          :key="category.strCategory"
          @click="filterByCategory(category.strCategory)"
          class="category-button"
        >
          {{ category.strCategory }}
        </button>
      </div>
    </div>
    
    <!-- Pass reactive recipes, loading, and error to RecipeList -->
    <recipe-list :recipes="recipes" :loading="loading" :error="error" />
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

.title {
  margin-bottom: 2rem;
  color: #333;
}

.categories {
  margin: 2rem 0;
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 2rem;
}

.category-button {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 8px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-button:hover {
  background-color: #ff6b6b;
  color: white;
  border-color: #ff6b6b;
}
</style>