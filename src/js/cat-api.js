import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_01CpbqxeCWY46DHHkvTE4IhORXHj0paah5YXqyDCzDLU1W8OHLbF5tQAW3KUzWio";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
    return axios.get('/breeds')
        .then(res =>  res.data)
};

function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`)
        .then(res => res.data[0])
};

export {
    fetchBreeds,
    fetchCatByBreed
};