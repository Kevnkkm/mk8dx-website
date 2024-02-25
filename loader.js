const texts = ["Throwing greenshells...", "Outrunning blueshells...", "Using shortcut...", "Dodging bananas..."];

const loader = document.getElementById("loader-p");

function changeLoaderText() {
    
    const randomIndex = Math.floor(Math.random() * texts.length);
    const newText = texts[randomIndex];
    
    
    loader.textContent = newText;
}

changeLoaderText();