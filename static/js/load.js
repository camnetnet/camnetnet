// --- Preload loader image ---
const baseURL = 'https://camnetnet.github.io/camnetnet';
const preloadImg = new Image();
preloadImg.src = `${baseURL}/images/logos/light/icon_orange.svg`;

// --- Create full-page loader ---
const loader = document.createElement("div");
loader.id = "loader";
Object.assign(loader.style, {
    position: "fixed",
    inset: "0",
    backgroundColor: "var(--white-100)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
    opacity: "1",
    transition: "opacity 0.4s ease"
});

// Use preloaded image
const img = document.createElement("img");
img.src = preloadImg.src; // already cached
img.alt = "Loading";
Object.assign(img.style, {
    width: "100px",
    height: "100px",
    objectFit: "contain"
});
loader.appendChild(img);

document.body.appendChild(loader);

// Hide page initially
document.body.style.transition = "opacity 0.4s ease";
document.body.style.opacity = "0";

// --- SVG loading logic ---
const svgs = document.querySelectorAll("img[src$='.svg'], svg");
const total = svgs.length;
let loaded = 0;

function revealPage() {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 400);
    document.body.style.opacity = "1";
}

// Fallback: reveal page after 1 second max
const timeout = setTimeout(revealPage, 1000);

function checkLoaded() {
    loaded++;
    if (loaded === total) {
        clearTimeout(timeout);
        revealPage();
    }
}

// If no SVGs, reveal page immediately
if (total === 0) {
    revealPage();
}

// Track SVG loads
svgs.forEach(svg => {
    if (svg.tagName.toLowerCase() === "img") {
        if (svg.complete) {
            checkLoaded();
        } else {
            svg.addEventListener("load", checkLoaded);
            svg.addEventListener("error", checkLoaded);
        }
    } else {
        // Inline SVGs count as loaded
        checkLoaded();
    }
});