// Nav Bar Selector
const OpenMenuBtn = document.querySelector('.hamburger');
const CloseMenuBtn = document.getElementById('closeModal');
const BackDrop = document.getElementById('backdropNav');
const MobileLinkNav = document.getElementById('mobile__nav');
const Body = document.querySelector('body');
const headerHeight = document.querySelector('.navBar').offsetHeight;


/* Mobile Nav Bar */
function open(){
    BackDrop.style.display = 'block';
    CloseMenuBtn.style.display = 'block';
    MobileLinkNav.style.display = 'flex';
    OpenMenuBtn.style.display = 'none';
    Body.style.overflow = 'hidden';
}
function close(){
    BackDrop.style.display = 'none';
    CloseMenuBtn.style.display = 'none';
    MobileLinkNav.style.display = 'none';
    OpenMenuBtn.style.display = 'flex';
    Body.style.overflow = 'auto';
}
OpenMenuBtn.addEventListener('click', open);
CloseMenuBtn.addEventListener('click', close);




// Prodotti Consigliati Section
let datiProdottiConsigliati = {};
const ProdottiConsigliatiContainer = document.getElementById('prodotti-consigliati-list');
const ProdottiScontatiContainer = document.getElementById('prodotti-scontati-list');

function  renderProdottiConsigliati(){

    ProdottiConsigliatiContainer.innerHTML = "";  

    for(const el in datiProdottiConsigliati['prodottiConsigliati']){

        const productDiv = document.createElement("div");
        productDiv.classList.add("item-consigliato");


        productDiv.innerHTML = `
            <div id="backdrop"></div>

            <img src="${datiProdottiConsigliati['prodottiConsigliati'][el]['immagine']}" alt="">
   
            <div class="item-consigliato-description">
                <h3>${datiProdottiConsigliati['prodottiConsigliati'][el]['nome']}</h3>
                <p class="categoria">${datiProdottiConsigliati['prodottiConsigliati'][el]['categoria']}</p>
                <p>${datiProdottiConsigliati['prodottiConsigliati'][el]['descrizione']}</p>
                <button onclick="window.location.href='#Prodotti';">Scopri altri prodotti simili</button>
            </div>

        `;

        ProdottiConsigliatiContainer.appendChild(productDiv);
    }
}
function  renderProdottiScontati(){

    ProdottiScontatiContainer.innerHTML = "";  

    for(const el in datiProdottiConsigliati['prodottiScontati']){

        const productDiv = document.createElement("div");
        productDiv.classList.add("item-consigliato");


        productDiv.innerHTML = `
            <div id="backdrop"></div>

            <img src="${datiProdottiConsigliati['prodottiScontati'][el]['immagine']}" alt="">
   
            <div class="item-consigliato-description">
                <h3>${datiProdottiConsigliati['prodottiScontati'][el]['nome']}</h3>
                <p class="categoria">${datiProdottiConsigliati['prodottiScontati'][el]['categoria']}</p>
                <p>${datiProdottiConsigliati['prodottiScontati'][el]['descrizione']}</p>
                <button onclick="window.location.href='#Prodotti';">Scopri altri prodotti simili</button>
            </div>

        `;

        ProdottiScontatiContainer.appendChild(productDiv);
    }
}
function caricaDatiOfferteLampo() {
    fetch('./dati/offerteLampo.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento del file JSON');
        }
        return response.json();  
      })
      .then(dati => {
        datiProdottiConsigliati = dati; 
        renderProdottiConsigliati()
        renderProdottiScontati()
      })
      .catch(error => {
        console.error('Errore:', error);  
      });
}
caricaDatiOfferteLampo()





// Prodotti Section

// CATEGORIE
// Renderizzare i prodotti di default 
const ProdottiContainer = document.getElementById('product-list');
const paginationContainer = document.getElementById('pagination');

const productsPerPage = 18;
let datiProdotti = {};
let currentPage = 1;
let currentCategory = 'Tradizione erboristica';
const categoriaAttiva = document.getElementById('categoria-attiva');

// Function to render products for the current category
function rendereCategoria() {
    ProdottiContainer.innerHTML = "";  

    const prodotti = datiProdotti[currentCategory] || [];
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, prodotti.length);

    for (let i = startIndex; i < endIndex; i++) {
        const productDiv = document.createElement("div");
        productDiv.classList.add("products");
        
        productDiv.innerHTML = `
            <img src="${prodotti[i]['immagine']}" alt="">
            <div class="products-description">
                <h3>${prodotti[i]['nome']}</h3>
                <p class="categoria-prodotto">${prodotti[i]['categoria']}</p>
                <div class="disponibilità">
                    <p class="prezzo">prezzo: ${prodotti[i]['prezzo']}€</p>
                    <p class="sconto">${prodotti[i]['promo']}</p>
                </div>
            </div>
        `;
        ProdottiContainer.appendChild(productDiv);
    }
    setupPagination(); 
}
function setupPagination() {
    paginationContainer.innerHTML = "";  

    const prodotti = datiProdotti[currentCategory] || [];
    const totalPages = Math.ceil(prodotti.length / productsPerPage);
    
    const maxPagesToShow = 5;  
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    // Add "First" button and dots if needed
    if (startPage > 1) {
        createPageButton(1);
        if (startPage > 2) {
            createDots();
        }
    }

    // Create pagination buttons for the visible range
    for (let i = startPage; i <= endPage; i++) {
        createPageButton(i);
    }

    // Add "Last" button and dots if needed
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            createDots();
        }
        createPageButton(totalPages);
    }
}
function createPageButton(page) {
    const button = document.createElement("button");
    button.textContent = page;
    if (page === currentPage) {
        button.classList.add("active");
    }
    button.addEventListener("click", () => {
        currentPage = page;  
        window.location.href='#Prodotti';
        rendereCategoria();  
    });
    paginationContainer.appendChild(button);
}
function createDots() {
    const dots = document.createElement("span");
    dots.textContent = "...";
    dots.style.margin = "0 10px";
    paginationContainer.appendChild(dots);
}
function caricaDati() {
    fetch('./dati/prodotti.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento del file JSON');
        }
        return response.json();  
      })
      .then(dati => {
        datiProdotti = dati; 
        rendereCategoria();  
      })
      .catch(error => {
        console.error('Errore:', error);  
      });
}

// Load data on startup
caricaDati();

const tradizioneCategoria = document.getElementById('TradizioneErboristica');
const ideeCategoria = document.getElementById('Idee-regalo-ed-oggettistica'); 
const alimentazioneCategoria = document.getElementById('Alimentazione-Naturale');
const integratoriCategoria = document.getElementById('Integratori-Naturali');
const comesticiCategoria = document.getElementById('Cosmetici-e-cura-della-persona');

tradizioneCategoria.addEventListener('click', () => {
    currentCategory = 'Tradizione erboristica';  
    currentPage = 1; 
    rendereCategoria();  
    categoriaAttiva.textContent = "> " + currentCategory;
});
ideeCategoria.addEventListener('click', () => {
    currentCategory = 'Idee regalo ed oggettistica';  
    currentPage = 1; 
    rendereCategoria();  
    categoriaAttiva.textContent = "> " + currentCategory;
});
alimentazioneCategoria.addEventListener('click', () => {
    currentCategory = 'Alimentazione naturale';  
    currentPage = 1; 
    rendereCategoria();  
    categoriaAttiva.textContent = "> " + currentCategory;
});
integratoriCategoria.addEventListener('click', () => {
    currentCategory = 'Integratori Naturali';  
    currentPage = 1; 
    rendereCategoria();  
    categoriaAttiva.textContent = "> " + currentCategory;
});
comesticiCategoria.addEventListener('click', () => {
    currentCategory = 'Cosmetici e cura della persona';  
    currentPage = 1;  
    rendereCategoria(); 
    categoriaAttiva.textContent = "> " + currentCategory;
});





// MICROCATEGORIE
const microCategorieList = document.querySelectorAll('.microCategorie');
var datiProdottiForMicroCat = {};
const listOfMacro = ['Tradizione erboristica','Idee regalo ed oggettistica', 'Alimentazione naturale','Integratori Naturali','Cosmetici e cura della persona']
let microCurrentCategory = '';
let currentMicroCatPage = 1;
const itemsPerMicroCatPage = 18;

function renderCheck(){
    ProdottiContainer.innerHTML = "";
    categoriaAttiva.textContent = "> " + microCurrentCategory;

    const filteredProducts = [];
    for (const macro of listOfMacro) {
        if (!datiProdottiForMicroCat[macro]) continue;

        for (let i = 0; i < datiProdottiForMicroCat[macro].length; i++) {
            var prodotto = datiProdottiForMicroCat[macro][i];
            if (String(prodotto['microcategoria']).trim() === String(microCurrentCategory).trim()) {
                filteredProducts.push(prodotto);
            }
        }
    }

    const startIndex = (currentMicroCatPage - 1) * itemsPerMicroCatPage;
    const endIndex = Math.min(startIndex + itemsPerMicroCatPage, filteredProducts.length);

    for (let i = startIndex; i < endIndex; i++) {
        const prodotto = filteredProducts[i];

        const productDiv = document.createElement("div");
        productDiv.classList.add("products");

        productDiv.innerHTML = `
            <img src="${prodotto['immagine']}" alt="">
            <div class="products-description">
                <h3>${prodotto['nome']}</h3>
                <p class="categoria-prodotto">${prodotto['categoria']}</p>
                <div class="disponibilità">
                    <p class="prezzo">prezzo: ${prodotto['prezzo']}€</p>
                    <p class="sconto">${prodotto['promo']}</p>
                </div>
            </div>
        `;

        ProdottiContainer.appendChild(productDiv);
    }
    setupMicroPagination(filteredProducts.length);  
}
function setupMicroPagination(totalItems) {
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(totalItems / itemsPerMicroCatPage);
    const maxPagesToShow = 5; 
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentMicroCatPage <= 3) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentMicroCatPage + 2 >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentMicroCatPage - 2;
            endPage = currentMicroCatPage + 2;
        }
    }

 
    if (startPage > 1) {
        createMicroPageButton(1);
        if (startPage > 2) {
            createMicroDots();
        }
    }

 
    for (let i = startPage; i <= endPage; i++) {
        createMicroPageButton(i);
    }


    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            createMicroDots();
        }
        createMicroPageButton(totalPages);
    }
}
function createMicroPageButton(page) {
    const button = document.createElement("button");
    button.textContent = page;
    if (page === currentMicroCatPage) {
        button.classList.add("active");
    }
    button.addEventListener("click", () => {
        currentMicroCatPage = page;  
        window.location.href='#Prodotti';
        renderCheck();  
    });
    paginationContainer.appendChild(button);
}
function createMicroDots() {
    const dots = document.createElement("span");
    dots.textContent = "...";
    dots.style.margin = "0 10px";
    paginationContainer.appendChild(dots);
}
function caricaDatiMicroCat() {
    fetch('./dati/prodotti.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento del file JSON');
        }
        return response.json();
      })
      .then(dati => {
        datiProdottiForMicroCat = dati;
        currentMicroCatPage = 1;  // Reset to the first page when loading new data
        renderCheck();
      })
      .catch(error => {
        console.error('Errore:', error);
      });
}
microCategorieList.forEach(microCatBtn => {
    microCatBtn.addEventListener('click', function () {
        microCurrentCategory = microCatBtn.textContent;
        caricaDatiMicroCat();
    });
});

// Show modal Micro Categorie
const modalBtns = document.querySelectorAll('.modal-btn');
let activeModalMicro = null; 
let activeModalBtn = null;  

modalBtns.forEach(modalBtn => {
    var categoria = modalBtn.getAttribute('refer');
    var categoriaBtn = modalBtn.getAttribute('refertwo');

    function openModal() {
        const modalMicro = document.getElementById(categoria);
        const modal = document.getElementById(categoriaBtn);

        if (activeModalMicro && activeModalMicro !== modalMicro) {
            activeModalMicro.classList.remove('active');
            activeModalBtn.classList.remove('active');
        }

      
        modalMicro.classList.add('active');
        modal.classList.add('active');


        activeModalMicro = modalMicro;
        activeModalBtn = modal;


        modalMicro.addEventListener('mouseleave', function() {
            modalMicro.classList.remove('active');
            modal.classList.remove('active');
            activeModalMicro = null;
            activeModalBtn = null;
        });
    }

    modalBtn.addEventListener('mouseover', openModal);
});








// SEARCH
const searchBtn = document.getElementById('search-btn')
const searchField = document.getElementById('search-field')
const searchModal = document.getElementById('search-modal');

// Get references to the alert elements
const customAlert = document.getElementById('customAlert');
const alertMessage = document.getElementById('alertMessage');
const closeAlertButton = document.getElementById('closeAlertButton');
let currentSearchPage = 1;
const itemsPerSearchPage = 18;

// Show Alert
function showCustomAlert(message) {
    alertMessage.textContent = message;  
    customAlert.style.display = 'flex';  
}
closeAlertButton.addEventListener('click', () => {
    customAlert.style.display = 'none';  
});

function setupSearchPagination(totalItems) {
    paginationContainer.innerHTML = ""; // Clear previous pagination buttons

    const totalPages = Math.ceil(totalItems / itemsPerSearchPage); // Calculate total pages
    const maxPagesToShow = 5; 
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentSearchPage <= 3) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentSearchPage + 2 >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentSearchPage - 2;
            endPage = currentSearchPage + 2;
        }
    }

    // Create "First" button
    if (startPage > 1) {
        createSearchPageButton(1);
        if (startPage > 2) {
            createSearchDots();
        }
    }

    // Create page buttons
    for (let i = startPage; i <= endPage; i++) {
        createSearchPageButton(i);
    }

    // Create "Last" button
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            createSearchDots();
        }
        createSearchPageButton(totalPages);
    }
}
function createSearchPageButton(page) {
    const button = document.createElement("button");
    button.textContent = page;
    if (page === currentSearchPage) {
        button.classList.add("active");
    }
    button.addEventListener("click", () => {
        currentSearchPage = page;  
        searchProducts(); // Re-render search results with new page
    });
    paginationContainer.appendChild(button);
}
function createSearchDots() {
    const dots = document.createElement("span");
    dots.textContent = "...";
    dots.style.margin = "0 10px";
    paginationContainer.appendChild(dots);
}
function searchProducts() {
    const searchTerm = searchField.value.trim().toLowerCase();

    if (searchTerm === "") {
        showCustomAlert("Assicurati di inserire dei caratteri.");
        return;
    }

    ProdottiContainer.innerHTML = "";
    const filteredProducts = []; 

    let found = false;
    for (const macro of listOfMacro) {
        if (!datiProdotti[macro]) continue;

        for (let i = 0; i < datiProdotti[macro].length; i++) {
            const productName = String(datiProdotti[macro][i]['nome']).trim().toLowerCase();
            if (productName.includes(searchTerm)) {
                found = true;
                filteredProducts.push(datiProdotti[macro][i]); 
            }
        }
    }

    if (!found) {
        showCustomAlert("Nessun prodotto trovato con quel nome.\n\nAssicurati di aver scritto bene il nome e di aver lasciato gli spazi tra ogni parola.");
        currentCategory = 'Tradizione erboristica';  
        currentPage = 1;
        rendereCategoria();
        categoriaAttiva.textContent = "> " + currentCategory;
        return;
    }

    // Pagination logic
    const startIndex = (currentSearchPage - 1) * itemsPerSearchPage;
    const endIndex = Math.min(startIndex + itemsPerSearchPage, filteredProducts.length);

    for (let i = startIndex; i < endIndex; i++) {
        const prodotto = filteredProducts[i];

        const productDiv = document.createElement("div");
        productDiv.classList.add("products");

        productDiv.innerHTML = `
            <img src="${prodotto['immagine']}" alt="">
            <div class="products-description">
                <h3>${prodotto['nome']}</h3>
                <p class="categoria-prodotto">${prodotto['categoria']}</p>
                <div class="disponibilità">
                    <p class="prezzo">prezzo: ${prodotto['prezzo']}€</p>
                    <p class="sconto">${prodotto['promo']}</p>
                </div>
            </div>
        `;
        ProdottiContainer.appendChild(productDiv);
    }

    setupSearchPagination(filteredProducts.length);
}
function showModal(){
    const activatedModal = document.querySelectorAll('.active');

    for (const el of activatedModal){
        el.classList.remove('active');
    }
    activeModalMicro = null;
    activeModalBtn = null;
    searchModal.style.display = "block";  

    const closeModalBtn = document.getElementById('closeModalBtn');
    closeModalBtn.addEventListener('click', function(){
        searchModal.style.display = "none";
        currentCategory = 'Tradizione erboristica';  
        currentPage = 1; 
        rendereCategoria();  
        categoriaAttiva.textContent = "> " + currentCategory;
    });

    const searchBtnModal = document.getElementById('search-btn-modal');
    searchBtnModal.addEventListener('click', () => {
        currentSearchPage = 1; // Reset to first page on new search
        searchProducts();
    });
}
searchBtn.addEventListener('click', showModal)









// News Section