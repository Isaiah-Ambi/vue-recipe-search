<template>
    <div class="recipe-detail" v-if="recipe">
      <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="recipe-image" />
      
      <div class="recipe-header">
        <h1>{{ recipe.strMeal }}</h1>
        <div class="recipe-meta">
          <span class="category">{{ recipe.strCategory }}</span>
          <span class="area">{{ recipe.strArea }}</span>
        </div>
      </div>
      
      <div class="recipe-content">
        <div class="ingredients">
          <h2>Ingredients</h2>
          <ul>
            <li v-for="(ingredient, index) in ingredients" :key="index" v-if="ingredient.name">
              {{ ingredient.measure }} {{ ingredient.name }}
            </li>
          </ul>
        </div>
        
        <div class="instructions">
          <h2>Instructions</h2>
          <p v-for="(step, index) in instructionSteps" :key="index">
            {{ step }}
          </p>
        </div>
      </div>
      
      <div v-if="recipe.strYoutube" class="video">
        <h2>Video Tutorial</h2>
        <a :href="recipe.strYoutube" target="_blank">Watch on YouTube</a>
      </div>
      
      <button class="back-button" @click="goBack">Back to Recipes</button>
    </div>
    <div v-else>
      <p>Loading recipe details...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RecipeDetail',
    props: {
      recipe: {
        type: Object,
        required: true
      }
    },
    computed: {
      ingredients() {
        if (!this.recipe) return []; // Ensure recipe is defined
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredientKey = `strIngredient${i}`;
          const measureKey = `strMeasure${i}`;
          
          if (this.recipe[ingredientKey]) {
            ingredients.push({
              name: this.recipe[ingredientKey],
              measure: this.recipe[measureKey] || '', // Handle missing measures
            });
          }
        }
        return ingredients;
      },
      instructionSteps() {
        if (!this.recipe || !this.recipe.strInstructions) return []; // Ensure recipe and instructions exist
        return this.recipe.strInstructions
          .split('.')
          .filter(step => step.trim() !== '')
          .map(step => step.trim() + '.');
      }
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'home' });
      }
    }
  };
  </script>
  
  <style scoped>
  .recipe-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .recipe-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .recipe-header {
    margin: 20px 0;
    text-align: center;
  }
  
  .recipe-meta {
    margin-top: 10px;
  }
  
  .category, .area {
    display: inline-block;
    padding: 5px 10px;
    margin: 0 5px;
    background-color: #ff6b6b;
    color: white;
    border-radius: 20px;
    font-size: 14px;
  }
  
  .recipe-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 30px;
    margin: 30px 0;
  }
  
  @media (max-width: 768px) {
    .recipe-content {
      grid-template-columns: 1fr;
    }
  }
  
  .ingredients ul {
    list-style-type: none;
    padding: 0;
  }
  
  .ingredients li {
    padding: 5px 0;
    border-bottom: 1px solid #eee;
  }
  
  .instructions p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .video {
    margin: 20px 0;
  }
  
  .back-button {
    display: block;
    margin: 30px auto;
    padding: 10px 20px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .back-button:hover {
    background-color: #ff5252;
  }
  </style>