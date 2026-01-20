// # INITIAL DATA

const pics = [
  {
    image: "img/01.jpg",
    title: "Svezia",
    text: "Scandinavia's blend of nature and innovation.",
  },
  {
    image: "img/02.jpg",
    title: "Norvegia",
    text: "Fjords, mountains, and coastal charm in Nordic splendor.",
  },
  {
    image: "img/03.jpg",
    title: "Alaska",
    text: "Untamed wilderness and rugged beauty in the Last Frontier.",
  },
  {
    image: "img/04.jpg",
    title: "Gran Canyon",
    text: "Nature's masterpiece, a colorful tapestry of cliffs.",
  },
  {
    image: "img/05.jpg",
    title: "Skyrim",
    text: "Epic Nordic fantasy with dragons and ancient magic.",
  },
];

let currentActiveIndex = 0;

let autoplayIntervalId;
let autoplayDirectionForward = true;
const autoplayMs = 4000;

// # HTML GENERATION

const carouselContainer = document.querySelector(".carousel-container");
const nextButton = document.querySelector("#carousel #next");
const prevButton = document.querySelector("#carousel #prev");
const invertButton = document.querySelector("#invert-direction");
const galleryContainer = document.querySelector("#carousel .gallery");
const thumbnailsContainer = document.querySelector("#thumbnails");

let galleryHTML = "";
let thumbnailsHTML = "";

for (let i = 0; i < pics.length; i++) {
  const { image, text, title } = pics[i];
  const activeClassName = i === currentActiveIndex ? "active" : "";

  galleryHTML += `
    <figure class="${activeClassName}">
      <figcaption>
        <h2>${title}</h2>
        <h3>${text}</h3>
      </figcaption>

      <img alt="${title}" src="${image}" />
    </figure>
  `;

  thumbnailsHTML += `
    <div class="thumb ${activeClassName}" data-carousel-index="${i}">
      <img alt="${title}" src="${image}" />
    </div>
  `;
}

galleryContainer.innerHTML = galleryHTML;
thumbnailsContainer.innerHTML = thumbnailsHTML;

const galleryNodes = document.querySelectorAll("#carousel .gallery figure");
const thumbnailsNodes = document.querySelectorAll("#thumbnails .thumb");

// # EVENTS

// * thumbnail click
for (const thumb of thumbnailsNodes) {
  thumb.addEventListener("click", function () {
    goToIndex(this.dataset.carouselIndex);
  });
}

// * next click
nextButton.addEventListener("click", function () {
  goToIndex(currentActiveIndex + 1);
});

// * prev click
prevButton.addEventListener("click", function () {
  goToIndex(currentActiveIndex - 1);
});

invertButton.addEventListener("click", function () {
  autoplayDirectionForward = !autoplayDirectionForward;
});

// * keyboard arrows keyup
document.addEventListener("keyup", function (e) {
  const { key } = e;
  if (key === "ArrowLeft") goToIndex(currentActiveIndex - 1);
  if (key === "ArrowRight") goToIndex(currentActiveIndex + 1);
});

// * pause autoplay
carouselContainer.addEventListener("mouseenter", function () {
  if (autoplayIntervalId) {
    clearInterval(autoplayIntervalId);
    autoplayIntervalId = undefined;
  }
});

// * resume autoplay
carouselContainer.addEventListener("mouseleave", function () {
  if (!autoplayIntervalId) {
    autoplayIntervalId = setAutoplay();
  }
});

// # TIMING FUNCTIONS

autoplayIntervalId = setAutoplay();

// # FUNCTIONS

function goToIndex(index) {
  const oldFigure = galleryNodes[currentActiveIndex];
  const oldThumb = thumbnailsNodes[currentActiveIndex];

  oldFigure.classList.remove("active");
  oldThumb.classList.remove("active");

  if (index > galleryNodes.length - 1) index = 0;
  if (index < 0) index = galleryNodes.length - 1;

  currentActiveIndex = index;

  const newFigure = galleryNodes[currentActiveIndex];
  const newThumb = thumbnailsNodes[currentActiveIndex];

  newFigure.classList.add("active");
  newThumb.classList.add("active");
}

function setAutoplay() {
  return setInterval(function () {
    const newIndex = autoplayDirectionForward
      ? currentActiveIndex + 1
      : currentActiveIndex - 1;

    goToIndex(newIndex);
  }, autoplayMs);
}
