// Carrossel
const time = 5000;

// Índice da imagem atual
let currentImageIndex = 0;

// Seleciona todas as imagens do slider
const images = document.querySelectorAll("#slider img")

// Número total de imagens
max = images.length;

// Função para passar para a próxima imagem
function nextImage() {
    // Remove a classe 'selected' da imagem atual
    images[currentImageIndex]
        .classList.remove("selected")

    // Incrementa o índice da imagem atual
    currentImageIndex++

    // Se chegou ao final, volta para a primeira imagem
    if(currentImageIndex >= max)
        currentImageIndex = 0

    // Adiciona a classe 'selected' à próxima imagem
    images[currentImageIndex]
        .classList.add("selected")
}

// Função para iniciar o carrossel
function start() {
    // Define um intervalo para trocar as imagens
    setInterval(() => {
        // Chama a função para trocar de imagem
        nextImage()
    }, time)
}

// Adiciona um listener para iniciar o carrossel quando a página carregar
window.addEventListener("load", start)