const texts = ["Throwing green shells...", "Outrunning blue shells...", "Using shortcut...", "Dodging bananas...", "Blocking red shells..."];

const loader = document.getElementById("loader-p");

function changeLoaderText() {
    
    const randomIndex = Math.floor(Math.random() * texts.length);
    const newText = texts[randomIndex];
    
    
    loader.textContent = newText;
}

changeLoaderText();