// # INITIAL DATA

// * images data
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

// * index counter
let currentActiveIndex = 0;

// * autoplay config
let autoplayIntervalId;
let autoplayDirectionForward = true;
const autoplayMs = 4000;

// # HTML GENERATION

// * retrieve existing nodes
const carouselContainer = document.querySelector(".carousel-container");
const nextButton = document.querySelector("#carousel #next");
const prevButton = document.querySelector("#carousel #prev");
const invertButton = document.querySelector("#invert-direction");
const galleryContainer = document.querySelector("#carousel .gallery");
const thumbnailsContainer = document.querySelector("#thumbnails");

// * gallery & thumbnails generazion
let galleryHTML = "";
let thumbnailsHTML = "";

for (let i = 0; i < pics.length; i++) {
  // * get pic data
  const { image, text, title } = pics[i];

  // * calculate wheter is the node to shows - it has class "active"
  const activeClassName = i === currentActiveIndex ? "active" : "";

  // * generate gallery html
  galleryHTML += `
    <figure class="${activeClassName}">
      <figcaption>
        <h2>${title}</h2>
        <h3>${text}</h3>
      </figcaption>

      <img alt="${title}" src="${image}" />
    </figure>
  `;

  // * generate thumbnails html
  thumbnailsHTML += `
    <div class="thumb ${activeClassName}" data-carousel-index="${i}">
      <img alt="${title}" src="${image}" />
    </div>
  `;
}

// * update DOM
galleryContainer.innerHTML = galleryHTML;
thumbnailsContainer.innerHTML = thumbnailsHTML;

// * retrieve generated nodes
const galleryNodes = document.querySelectorAll("#carousel .gallery figure");
const thumbnailsNodes = document.querySelectorAll("#thumbnails .thumb");

// * start carousel autoplay
autoplayIntervalId = setAutoplay();

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

// * invert button click
invertButton.addEventListener("click", function () {
  autoplayDirectionForward = !autoplayDirectionForward;
});

// * keyboard arrows keyup
document.addEventListener("keyup", function (e) {
  const { key } = e;
  if (key === "ArrowLeft") goToIndex(currentActiveIndex - 1);
  if (key === "ArrowRight") goToIndex(currentActiveIndex + 1);
});

// * container mouseenter - pause autoplay
carouselContainer.addEventListener("mouseenter", function () {
  if (autoplayIntervalId) {
    clearInterval(autoplayIntervalId);
    autoplayIntervalId = undefined;
  }
});

// * container mouseleave - resume autoplay
carouselContainer.addEventListener("mouseleave", function () {
  if (!autoplayIntervalId) {
    autoplayIntervalId = setAutoplay();
  }
});

// # FUNCTIONS

function goToIndex(index) {
  // * retrieve current index nodes
  const oldFigure = galleryNodes[currentActiveIndex];
  const oldThumb = thumbnailsNodes[currentActiveIndex];

  // * remove class active - hides them
  oldFigure.classList.remove("active");
  oldThumb.classList.remove("active");

  // * check if index in range - eventually correct
  if (index > galleryNodes.length - 1) index = 0;
  if (index < 0) index = galleryNodes.length - 1;

  // * update index
  currentActiveIndex = index;

  // * retrieve update index nodes
  const newFigure = galleryNodes[currentActiveIndex];
  const newThumb = thumbnailsNodes[currentActiveIndex];

  // * add class active - shows them
  newFigure.classList.add("active");
  newThumb.classList.add("active");
}

function setAutoplay() {
  // * returning setInterval id
  return setInterval(function () {
    // * calculating newIndex by autoplay direction
    const newIndex = autoplayDirectionForward
      ? currentActiveIndex + 1
      : currentActiveIndex - 1;

    // * going to newIndex
    goToIndex(newIndex);
  }, autoplayMs);
}
