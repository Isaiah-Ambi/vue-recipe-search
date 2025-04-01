<template>
    <div class="recipe-card" @click="viewRecipe">
      <img :src="recipe.strMealThumb" :alt="recipe.strMeal" />
      <div class="recipe-info">
        <h3>{{ recipe.strMeal }}</h3>
        <p>{{ recipe.strCategory }}</p>
        <span class="recipe-origin">{{ recipe.strArea }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RecipeCard',
    props: {
      recipe: {
        type: Object,
        required: true
      }
    },
    methods: {
      viewRecipe() {
        this.$router.push({ name: 'recipe-detail', params: { id: this.recipe.idMeal } });
      }
    }
  };
  </script>
  
  <style scoped>
  .recipe-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  
  .recipe-card:hover {
    transform: translateY(-5px);
  }
  
  .recipe-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .recipe-info {
    padding: 1rem;
  }
  
  .recipe-info h3 {
    margin-top: 0;
    margin-bottom: 8px;
    color: #333;
  }
  
  .recipe-info p {
    color: #666;
    margin-bottom: 8px;
  }
  
  .recipe-origin {
    background-color: #ff6b6b;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
  </style>