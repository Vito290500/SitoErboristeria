// Nav Bar Selector
const OpenMenuBtn = document.querySelector('.hamburger');
const CloseMenuBtn = document.getElementById('closeModal');
const BackDrop = document.getElementById('backdrop');
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

// Renderizzare i prodotti di default 
const ProdottiContainer = document.getElementById('product-list');
const paginationContainer = document.getElementById('pagination');
const productsPerPage = 15;
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
        // Create a new div for each product
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
    setupPagination();  // Update the pagination controls
}

function setupPagination() {
    paginationContainer.innerHTML = "";  // Clear the pagination container

    const prodotti = datiProdotti[currentCategory] || [];
    const totalPages = Math.ceil(prodotti.length / productsPerPage);
    
    const maxPagesToShow = 5;  // Maximum number of pagination buttons to show
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
        currentPage = page;  // Update the current page
        rendereCategoria();  // Render products for the selected page
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

const tradizioneCategoria = document.getElementById('Tradizione-erboristica');
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




//Function microcategorie

const modalBtns = document.querySelectorAll('.modal-btn');

modalBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        var categoria = btn.getAttribute('refer');
        const categoriaMacro = document.getElementById(categoria);
        
        function closeModalMicro() {
            categoriaMacro.classList.remove('active');
        }

        function openModalMicroTrad() {
            categoriaMacro.classList.add('active'); 
            categoriaMacro.addEventListener('mouseleave', closeModalMicro);  
        }

        openModalMicroTrad();
    });
});















// Function search 
const searchBtn = document.getElementById('search-btn')
const searchField = document.getElementById('search-field')


function search(){
    for(const cat in datiProdotti){
        for(const el in datiProdotti[cat]){
            if (searchField.value == datiProdotti[cat][el]['name']){
                return console.log(datiProdotti[cat][el]['name'])
            }
            else{
                return console.log("none")
            }
        }
    }
}

searchBtn.addEventListener('click', search)











// News Section