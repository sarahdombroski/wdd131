import { typeInfo } from "./typeInfo.js";
let plants = [{id: "1320d3f4-c2af-4304-a63c-72061f117532", name: "Bob", type: "Succulent", tip: "Low water, lots of sun, don’t overwater", info: "bob does not like to drink soda", lastWatered: "2025-07-15", waterEvery: "12", image: "./images/succulent.jpg"}, 
    {id: "a994fda8-bc50-4e2e-aa84-ce938b68d8b7", name: "Sue", type: "Tropical", tip: "High humidity, medium light, keep moist", info: "sue likes soda", lastWatered: "2025-07-15", waterEvery: "1", image:"./images/tropical.avif"}
];
const today = new Date();

// BASIC FUNCITONS: CREATE, SAVE, LOAD
function createPlant(name, type, tip, info, waterEvery, lastWatered, image=null) {
    return {
        id: crypto.randomUUID(),
        name,
        type,
        tip,
        info,
        waterEvery,
        lastWatered,
        image
    };
}

function savePlants() {
    localStorage.setItem("myPlants", JSON.stringify(plants))
}

function loadPlants() {
    const savedPlants = localStorage.getItem("myPlants");
    if (savedPlants) {
        plants = JSON.parse(savedPlants);
    }
}

// MAIN PAGE SEARCH FUNCTIONS
function daysUntilWatering(lastWateredString, waterEvery) {
    const lastWatered = new Date(lastWateredString);
    let nextWaterDate = new Date();
    nextWaterDate.setDate(lastWatered.getDate() + Number(waterEvery));

    const timeDiff = nextWaterDate - today;

    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

function wateredDaysAgo(lastWatered) {
    const now = new Date();
    const past = new Date(lastWatered);
    const diff = now - past;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function searchDisplayTemplate(plant) {
    const daysUntilWatered = daysUntilWatering(plant.lastWatered, plant.waterEvery);
    let waterStatus = '';
    let waterClass = '';
    if (daysUntilWatered === 0) {
        waterStatus = "Water Today!!";
        waterClass = "btn-green";
    } else if (daysUntilWatered > 0) {
        waterStatus = `Water in ${daysUntilWatered} days.`;
        waterClass = "btn-grey";
    } else {
        waterStatus = "WATER NOW YOUR PLANT IS DYING";
        waterClass = "btn-red";
    }

    return `
        <div class="plantHomeDisplay" id="${plant.id}SearchDisplay">
            <p class="plantName" data-id="${plant.id}">${plant.name}</p>
            <p>${plant.type}</p>
            <p>Last watered: ${wateredDaysAgo(plant.lastWatered)} days</p>
            <p>${waterStatus}</p>
            <button class="waterButton ${waterClass}" data-id="${plant.id}">Watered</button>
        </div>`
}

function renderPlants(plantsList) {
	const output = document.querySelector("#searchResults");
	let html = '';
	plantsList.forEach(plant => {
		html += searchDisplayTemplate(plant);
	});
	output.innerHTML = html;
}

function searchHandler(e) {
    e.preventDefault();
    const input = document.getElementById('searchQuery').value;
    const loweredinput = input.toLowerCase();
    const inputsplit = loweredinput.split(/\s+/);
    function filterPlants(plant) {
        return (
            inputsplit.some(word => plant.name.toLowerCase().includes(word)) ||
            inputsplit.some(word => plant.type.toLowerCase().includes(word)) ||
            inputsplit.some(word => plant.info.toLowerCase().includes(word))
        )
    }
    const filteredPlants = plants.filter(filterPlants);
    renderPlants(filteredPlants);
}

// Plant Functions
function waterPlant(plant) {
    plant.lastWatered = new Date();
    savePlants();
    renderPlants(plants);
}

function displayFullPlant(plant) {
    const output = document.querySelector("#plantInformation");
	
    const daysUntilWatered = daysUntilWatering(plant.lastWatered, plant.waterEvery);
    let waterStatus = '';
    let waterClass = '';
    if (daysUntilWatered === 0) {
        waterStatus = "Water Today!!";
        waterClass = "btn-green";
    } else if (daysUntilWatered > 0) {
        waterStatus = `Water in ${daysUntilWatered} days.`;
        waterClass = "btn-grey";
    } else {
        waterStatus = "WATER NOW YOUR PLANT IS DYING";
        waterClass = "btn-red";
    }
    console.log(plant.image)
    const html = `
        <h1>${plant.name}</h1>
        <div id="plantInfoBox">
            <img src="${plant.image}" alt="${plant.name}'s Image">
            <div id="allPlantInformation">
                <p>Type: ${plant.type}</p>
                <p>Tip from us: ${plant.tip}</p>
                <p>Extra Info: ${plant.info}</p>
                <p>Last watered: ${wateredDaysAgo(plant.lastWatered)} days</p>
                <p>${waterStatus}</p>
                <button class="waterButton ${waterClass}" data-id="${plant.id}">Watered</button><br>
                <button id="edit">Edit</button>
                <button id="delete">Delete</button><br>
                <button id="returnButton">Return to Plant Page</button>
            </div>
        </div>`;
	output.innerHTML = html;

    document.getElementById("edit").addEventListener("click", () => {
        localStorage.setItem("editingPlantID", plant.id)
        window.location.href = "addPlant.html";
    })

    document.getElementById("delete").addEventListener("click", () => {
        const confirmDelete = confirm(`DID YOU KILL ${plant.name}?`);
        if (confirmDelete) {
            plants = plants.filter(p => p.id !== plant.id);
            savePlants();
            document.getElementById("plantInformation").classList.add("hide");
            document.getElementById("plantList").classList.remove("hide");
            renderPlants(plants);
        }
    })
}

// FORM FUNCTIONS
function getDaysAgo(daysAgo) {
    const watered = new Date();
    watered.setDate(watered.getDate() - Number(daysAgo));
    return watered.toISOString().split("T")[0];
}

function readImageFile(input, callback) {
    const file = input.files[0]
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        }
        reader.readAsDataURL(file);
    } else {
        callback(null);
    }
}

function inputImage() {
    const plantImageInput = document.getElementById("plantImage");
    readImageFile(plantImageInput, function (base64Image) {
        const imagePreview = document.getElementById("imagePreview");
        imagePreview.src = base64Image || "";
    });
}

function addPlant() {
    const editingID = localStorage.getItem('editingPlantID');

    const name = document.getElementById('plantName').value;
    const type = document.getElementById('plantType').value;
    const tipObj = typeInfo.find(p => p.type === type);
    const tip = tipObj ? tipObj.tip : "No tip avaliable";
    const info = document.getElementById('extraInformation').value;
    const waterEvery = document.getElementById('waterEvery').value;
    const daysAgo = document.getElementById('lastWatered').value;
    const lastWatered = getDaysAgo(daysAgo);
    const image = document.getElementById('plantImage');

    readImageFile(image, function(base64Image) {
        if (editingID) {
            const index = plants.findIndex(p => p.id === editingID);
            if (index !== -1) {
                plants[index] = createPlant(name, type, tip, info, waterEvery, lastWatered, base64Image || plants[index].image);
            }
            localStorage.removeItem('editingPlantID');
        } else {
        const newPlant = createPlant(name, type, tip, info, waterEvery, lastWatered, base64Image);
        plants.push(newPlant);}
        savePlants();
        window.location.href = "index.html";
});}

// EVENT LISTENERS
loadPlants();
console.log(plants);


const searchbar = document.getElementById("searchQuery");
if (searchbar) {
    renderPlants(plants);
    searchbar.addEventListener("input", searchHandler);
}

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("waterButton")) {
        const plantID = e.target.getAttribute("data-id");
        const plant = plants.find(p => p.id === plantID);
        if (plant) {
            waterPlant(plant);
            displayFullPlant(plant);
        }
    }
})

// Plant Page Event Listeners

document.addEventListener("click", function(e) {
    const clickedPlantBtn = e.target.closest(".plantName")
    if (clickedPlantBtn) {
        const plantID = clickedPlantBtn.getAttribute("data-id");
        const plant = plants.find(p => p.id === plantID);
        if (plant) {
            document.getElementById("plantList").classList.add("hide");
            document.getElementById("plantInformation").classList.remove("hide");
            displayFullPlant(plant);
        }
    }
})

document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "returnButton") {
        document.getElementById("plantList").classList.remove("hide");
        document.getElementById("plantInformation").classList.add("hide");
}})

// FORM EVENT LISTENERS
const plantImageInput = document.getElementById("plantImage");
if (plantImageInput) {plantImageInput.addEventListener("change", inputImage);}

const submit = document.getElementById('submit');
if (submit) {submit.addEventListener("click", function(e){
    e.preventDefault();
    addPlant();
    console.log(plants);
    document.getElementById('addNewPlant').reset();
});}

document.addEventListener("DOMContentLoaded", () => {
    const editingID = localStorage.getItem("editingPlantID");
    const plantNameInput = document.getElementById("plantName");
    if (editingID && plantNameInput) {
        const plant = plants.find(p => p.id === editingID);
        if (plant) {
            const submitButton = document.getElementById('submit');
            if (submitButton) {
                submitButton.value = "Save Plant";
            }
            
            document.getElementById('plantName').value = plant.name;
            document.getElementById('plantType').value = plant.type;
            document.getElementById('extraInformation').value = plant.info;
            document.getElementById('waterEvery').value = plant.waterEvery;
            document.getElementById('lastWatered').value = 0;
        }
    }
})

if (window.location.pathname.includes("index.html")) {
	window.addEventListener("DOMContentLoaded", () => {
		localStorage.removeItem("editingPlantID");
	});
}