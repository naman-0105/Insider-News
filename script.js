const API_KEY = "3a47d934c37f44b8a859aef305b2cba9";
const url = "https://newsapi.org/v2/everything?q=";
let currentQuery = "";
let currentPage = 1;
const pageSize = 20;

const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let currentIndex = 0;

function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function showNextImage() {
    showImage(currentIndex + 1);
}

function showPreviousImage() {
    showImage(currentIndex - 1);
}

setInterval(showNextImage, 3000);
nextButton.addEventListener('click', showNextImage);
prevButton.addEventListener('click', showPreviousImage);


window.addEventListener("load", () => fetchNews("India"));

function reload() {
    document.getElementById("carousel-container").style.display = "block"; // Show carousel
    fetchNews("India");
}


async function fetchNews(query, page = 1) {
    currentQuery = query;
    currentPage = page;
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = document.importNode(newsCardTemplate.content, true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    document.getElementById("cards-container").innerHTML = ""; // Clear previous articles
    document.getElementById("carousel-container").style.display = "none"; // Hide carousel
    fetchNews(id).then(() => {
        window.scrollTo(0, 0); // Scroll to top after fetching news
    });
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}


const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (query) {
        document.getElementById("cards-container").innerHTML = ""; // Clear previous articles
        fetchNews(query).then(() => {
            window.scrollTo(0, 0); // Scroll to top after fetching news
        });
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    }
});

document.getElementById("read-more-button").addEventListener("click", () => {
    fetchNews(currentQuery, currentPage + 1);
});

const carouselContainer = document.querySelector('.carousel-container');
const cardsContainer = document.getElementById("cards-container");


// Function to hide the carousel
function hideCarousel() {
    carouselContainer.style.display = 'none';
    cardsContainer.style.marginTop = '30px';
}

function showCarousel() {
    carouselContainer.style.display = 'block';
    cardsContainer.style.marginTop = '0';
}

function onNavItemClick(id) {
    hideCarousel(); // Hide the carousel when a nav item is clicked
    cardsContainer.innerHTML = ""; // Clear previous articles
    fetchNews(id).then(() => {
        window.scrollTo(0, 0); // Scroll to top after fetching news
    });
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}


searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (query) {
        hideCarousel(); // Hide the carousel when a search is performed
        cardsContainer.innerHTML = ""; // Clear previous articles
        fetchNews(query).then(() => {
            window.scrollTo(0, 0); // Scroll to top after fetching news
        });
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    }
});

// Example function to show carousel (you can call this function where appropriate)
function resetUI() {
    showCarousel(); // Show the carousel
}

// Function to hide the carousel and add margin to cards container
function hideCarousel() {
    carouselContainer.style.display = 'none';
    cardsContainer.style.marginTop = '20px'; // Add top margin
}


searchButton.addEventListener("click", () => {
    performSearch();
});

searchText.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        performSearch();
    }
});

function performSearch() {
    const query = searchText.value;
    if (query) {
        hideCarousel(); // Hide the carousel when a search is performed
        cardsContainer.innerHTML = ""; // Clear previous articles
        fetchNews(query).then(() => {
            window.scrollTo(0, 0); // Scroll to top after fetching news
        });
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    }
}







