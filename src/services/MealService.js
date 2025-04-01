import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  searchByName(query) {
    return apiClient.get(`/search.php?s=${query}`);
  },
  getRandomMeal() {
    return apiClient.get('/random.php');
  },
  getMealById(id) {
    return apiClient.get(`/lookup.php?i=${id}`);
  },
  getCategories() {
    return apiClient.get('/categories.php');
  },
  filterByCategory(category) {
    return apiClient.get(`/filter.php?c=${category}`);
  }
};