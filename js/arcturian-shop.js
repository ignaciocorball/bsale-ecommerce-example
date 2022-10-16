/*
Template Name: Arcturian Shop
Author: Ignacio Corball
Author URI: https://github.com/ignaciocorball
Version: 1.0

*===== Index =====*
1.0 - Preloader JQuery
1.1 - Initialize Tooltip
1.2 - Template Options
1.3 - Get & Set Products and Categories from API

2.0 - Data Retrieve
2.1 - Global Variables
2.2 - API Requests with Asyncronous Ajax Query
2.3 - Helpers functions
*===== End Index =====*
*/

(async function($) {
    "use strict";

    /* 1.1 Tooltip */

    $('[data-toggle="tooltip"]').tooltip();

    /* 1.2 Template Options */

    const $main_nav = $('#main-nav');
    const $toggle = $('.toggle');

    const defaultOptions = {
        disableAt: false,
        customToggle: $toggle,
        levelSpacing: 40,
        navTitle: 'Arcturian Shop',
        levelTitles: true,
        levelTitleAsBack: true,
        pushContent: '#container',
        insertClose: 2
    };

    const categoriesSliderOptions = {
        slidesToShow: 8,
        arrows: true,
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            }
        ]
    };

    const productsSliderOptions = {
        centerMode: true,
        slidesToShow: 3,
        arrows: true,
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    };

    // Set up Navbar Config

    $main_nav.hcOffcanvasNav(defaultOptions);

    /* 1.3 Get & Set Products and Categories from API */

    getCategories().then((data) => {
        let categoriesHTML = '';
        categories = data;
        
        for (var i = 0; i < categories.length; i++) {
            categoriesHTML += `
                <div class="cat-item px-1 py-3">
                    <a id="${categories[i].name}${i}" onclick="categorySelect('${categories[i].name}','${i}')" class="bg-white rounded d-block p-2 text-center shadow-sm" href="javascript:void(0)">
                    <img alt="#" src="${ getCategoryImagePath(categories[i].name) }" class="img-fluid mb-2">
                        <p class="m-0 small">${getFirstLetterMayus(categories[i].name)}</p>
                    </a>
                </div>
            `;
        }
        $('.cat-slider').append(categoriesHTML);
        $('.cat-slider').slick(categoriesSliderOptions); // Initialize Slider

        getProducts().then((data) => {
            let trendingHTML = '';
            let allProductsHTML = '';
            products = data;

            for (var i = 0; i < products.length; i++) {
                trendingHTML += `
                <div class="slider-item" id="${products[i].name}">
                    <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                        <div class="list-card-image">
                            <div class="star position-absolute"><span class="badge badge-success">
                                <i class="feather-star"></i>  ${getRandomFloat()} (${getRandomOrders()}+)</span>
                            </div>
                            <div class="favourite-heart text-danger position-absolute">
                                <a href="#"><i class="feather-heart"></i></a>
                            </div>
                            <div class="member-plan position-absolute">
                                <span class="badge badge-dark">Promocionado</span>
                            </div>
                            <a href="#">
                                <img alt="#" src="${products[i].url_image}" class="img-fluid item-img trending-item-img w-100">
                            </a>
                        </div>
                        <div class="p-3 position-relative">
                            <div class="list-card-body">
                                <h6 class="mb-1">
                                    <a href="#" class="text-black">${products[i].name}</a>
                                </h6>
                                <p class="text-gray mb-3">• ${ getCategoryNameById(products[i].category) }</p>
                                <p class="text-gray mb-3 time">
                                    ${ products[i].discount > 0 
                                        ?  `<span class="badge badge-success fs-12"><i class="feather-gift mr-2"></i>Oferta -${products[i].discount}% descuento</span>` 
                                        : `<span class="badge badge-primary fs-12"><i class="feather-truck mr-2"></i>Delivery gratuito</span>`
                                    }
                                    <span class="float-right text-black-50 fs-15 fw-bold"> $${ products[i].price.toLocaleString('es-CL') } CLP</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                allProductsHTML += `
                        <div class="col-md-3 pb-3 product-card ${getCategoryNameById(products[i].category).replace(/\s/g, "")}" id="${products[i].name}">
                            <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                                <div class="list-card-image">
                                    <div class="star position-absolute"><span class="badge badge-success">
                                        <i class="feather-star"></i>  ${getRandomFloat()} (${getRandomOrders()}+)</span>
                                    </div>
                                    <div class="favourite-heart text-danger position-absolute">
                                        <a href="#"><i class="feather-heart"></i></a>
                                    </div>
                                    <a href="#">
                                    ${  products[i].url_image 
                                        ? `<img alt="#" src="${products[i].url_image}" class="img-fluid item-img w-100">`
                                        : `<img alt="#" src="img/default-product.png" class="img-fluid item-img w-100" style="background-color:#EDF3F7">`
                                    }
                                        <img alt="#" src="${products[i].url_image ? products[i].url_image : 'img/default-product.png'}" class="img-fluid item-img w-100">
                                    </a>
                                </div>
                                <div class="p-3 position-relative">
                                    <div class="list-card-body">
                                        <h6 class="mb-1">
                                            <a href="#" class="text-black">${products[i].name}</a>
                                        </h6>
                                        <p class="text-gray mb-1 small">• ${ getCategoryNameById(products[i].category) }</p>
                                        <p class="text-gray mb-1 rating">
                                        </p>
                                        <ul class="rating-stars list-unstyled">
                                            <li>
                                                <i class="feather-star star_active"></i>
                                                <i class="feather-star star_active"></i>
                                                <i class="feather-star star_active"></i>
                                                <i class="feather-star star_active"></i>
                                                <i class="feather-star"></i>
                                            </li>
                                        </ul>
                                        <p></p>
                                    </div>
                                    <p class="text-gray mb-3 time">
                                        ${ products[i].discount > 0 
                                            ?  `<span class="badge badge-success"><i class="feather-gift mr-1"></i>Oferta -${products[i].discount}%</span>` 
                                            : `<span class="badge badge-primary"><i class="feather-truck mr-1"></i>Delivery gratuito</span>`
                                        }
                                        <span class="float-right text-black-50 fs-15 fw-bold"> $${ products[i].price.toLocaleString('es-CL') } CLP</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                `
            }
            $('.loader').hide();
            document.getElementById('total-products').innerText = 'Total de productos: ' + products.length;
            $('.trending-slider').append(trendingHTML);
            $('.all-products .row').append(allProductsHTML);
            $('.trending-slider').slick(productsSliderOptions); // Initialize Slider
        },
        (error) => {
            $('.not-found').classList.remove('d-none');
            alert("Error al obtener los productos");
            console.error(error);
        });
    },
    (error) => {
        $('.not-found').classList.remove('d-none');
        alert("Error al obtener las categorias");
        console.log(error);
    });
    document.getElementsByName("search")[0].addEventListener('keyup', filterProducts);

})(jQuery); // End of use strict

/* 2.0 Data Retrieve */

/* 2.1 Global Variables */

var categories = [];
var products = [];

/* 2.2 API Requests with Asyncronous Ajax Query */

async function getCategories(){
    const result = await $.ajax({
        url: 'https://bsale-api-example.herokuapp.com/categories',
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
    return Object.values(result)[0];
}
async function getProducts(){
    let result = await $.ajax({
        url: 'https://bsale-api-example.herokuapp.com/products',
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
    return Object.values(result)[0];
}

/* 2.3 Helpers functions */

function filterProducts(){
    let search = document.getElementsByName("search")[0].value;
    let element = document.querySelectorAll('.product-card');

    if(search.length > 0){
        element.forEach((card) => {
            if(card.id.toLowerCase().includes(search.toLowerCase())){
                card.style.display = 'block';
            }else{
                card.style.display = 'none';
            }
        });
    }else{
        element.forEach((card) => {
            card.style.display = 'block';
        });
        openSnackbar('Debe ingresar un producto a buscar');
    }
    
}

function categorySelect(name) {
    let element = document.querySelectorAll('.product-card');
    document.getElementsByName("search")[0].value = '';

    switch(name){
        case 'todos':
            element.forEach((card) => { card.style.display = 'block'; } );
            break;
        case 'bebida energetica':
            element.forEach((card) => { card.classList.contains('Bebidaenergetica') ? card.style.display = 'block' : card.style.display = 'none' } );
            break;
        case 'bebida':
            element.forEach((card) => { card.classList.contains('Bebida') ? card.style.display = 'block' : card.style.display = 'none' } );
            break;
        case 'pisco':
            element.forEach((card) => { card.classList.contains('Pisco') ? card.style.display = 'block' : card.style.display = 'none' } );
            break;
        case 'cerveza':
            element.forEach((card) => { card.classList.contains('Cerveza') ? card.style.display = 'block' : card.style.display = 'none' } );
            break;
        case 'ron':
            element.forEach((card) => { card.classList.contains('Ron') ? card.style.display = 'block' : card.style.display = 'none' } );
            break;
        case 'vodka':
            element.forEach((card) => { card.classList.contains('Vodka') ? card.style.display = 'block' : card.style.display = 'none' } );
            break;
        case 'snack':
            element.forEach((card) => { card.classList.contains('Snack') ? card.style.display = 'block' : card.style.display = 'none' } );
            break;
    }
    // Show Snackbar
    openSnackbar("Categoria seleccionada: " + getFirstLetterMayus(name));
}

function getCategoryNameById(id){
    return getFirstLetterMayus(categories.find(x => x.id == id).name);
}

function getCategoryIdByName(name){
    return categories.find(x => x.name == name).id;
}

function getCategoryImagePath(name){
    switch(name){
        case 'pisco':
            return 'img/icons/pisco.png';
        case 'snack':
            return 'img/icons/Fries.png';
        case 'ron':
            return 'img/icons/ron.png';
        case 'bebida':
            return 'img/icons/ColaCan.png';
        case 'cerveza':
            return 'img/icons/beer.png';
        case 'vodka':
            return 'img/icons/vodka.png';
        case 'bebida energetica':
            return 'img/icons/energy-drink.png';
        default:
            return 'img/icons/all.png';
    }
}

function getRandomOrders() {
    return Math.floor(Math.random() * Math.floor(1111));
}

function getRandomFloat() {
    return (Math.random() * (5 - 3) + 3).toFixed(1);
}

function openSnackbar(str){
    var snackbar = document.getElementById("snackbar");
    snackbar.innerText = str;
    if(!snackbar.classList.contains('snack-show')){
        snackbar.className = "snack-show";
        setTimeout(function(){ snackbar.className = snackbar.className.replace("snack-show", ""); }, 3000);
    }
}

function getFirstLetterMayus(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function searchClick(){
    let searchBox = document.getElementById('search-box');
    let searchBtn = document.getElementById('search-btn');
    // Show search box
    if(searchBox.classList.contains('d-none')){
        searchBox.style.zIndex = -1;
        searchBox.classList.remove('d-none');
        searchBox.classList.remove('slide-out-blurred-top');
        searchBtn.classList.add('d-none');

        searchBox.classList.add('slide-in-blurred-top');
        searchBox.classList.add('d-block');
        setTimeout(function(){ 
            searchBox.style.zIndex = 0; 
        }, 600);
    // Hide search box
    }else{
        searchBox.style.zIndex = -1;
        searchBox.classList.remove('slide-in-blurred-top');
        searchBox.classList.remove('d-block');
        searchBtn.classList.remove('d-none');

        searchBox.classList.add('slide-out-blurred-top');
        setTimeout(function(){ 
            searchBox.classList.add('d-none');
        }, 600);
        
    }
}