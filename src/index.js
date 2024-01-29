import SlimSelect from "slim-select";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const elements = {
    select: document.querySelector(".breed-select"),
    container: document.querySelector(".container-select"),
    loader: document.querySelector(".loader"),
    errorText: document.querySelector(".error"),
    cardInfo: document.querySelector(".cat-info"),
};

const customSelect = new SlimSelect({
    select: elements.select,
    data: [],
});

fetchBreeds()
    .then(data => {
        customSelect.setData(createOptions(data));
        elements.container.classList.remove("hidden");
})
    .catch(error => {
        console.log(error.message);
        iziToast.show({
        title: "❌",
        message: "Oops! Something went wrong! Try reloading the page!",
        close: false,
        timeout: 0,
        theme: 'light',
        color: '#b35c5c',
        position: 'center',
        progressBarColor: '#50ac86',
      });
})
    .finally(() => {
        elements.loader.classList.add("hidden");
});

function createOptions(arr) {
    const optionsList = arr.map(({ id, name }) => {
        return { value: id, text: name }
    });
    optionsList.unshift({ 'placeholder': true, 'text': 'Choose a cat breed' });
    return optionsList;
};

function handlerSubmitSelect(e) {
    elements.loader.classList.remove("hidden");
    elements.cardInfo.innerHTML = "";
    if (e.target.value === "Choose a cat breed") return;
    fetchCatByBreed(elements.select.value)
        .then(data => {
            elements.cardInfo.innerHTML = createDescription(data);
        })
        .catch(error => {
            console.log(error.message);
            iziToast.show({
            title: "❌",
            message: "Oops! Something went wrong! Try reloading the page!",
            messageSize: '48px',
            close: false,
            timeout: 0,
            theme: 'light',
            color: '#b35c5c',
            position: 'center',
            progressBarColor: '#50ac86',
        });
        })
        .finally(() => {
            elements.loader.classList.add("hidden");
        });
};

function createDescription({ url, breeds }) {
    return `
        <div class="picture-thumb" >
            <img class="picture" src="${url}" alt=""${breeds[0].alt_names} width="500">
        </div>
        <div class="container-info">
            <h1 class="title">${breeds[0].name}</h1>
            <p class="text">${breeds[0].description}</p>
            <h3 class="second-title">Temperament:</h3>
            <p class="text"> ${breeds[0].temperament}</p>
        </div>
    `
};

elements.select.addEventListener("change", handlerSubmitSelect);