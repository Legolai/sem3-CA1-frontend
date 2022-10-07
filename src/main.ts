import "./css/main.css";
import { MainSearch } from "./components";
import search from "./search";

const app = document.querySelector("#App");

const header = document.createElement("header");
const h1 = document.createElement("h1");
h1.textContent = "Hobbytisten";
header.appendChild(h1);


app?.appendChild(
  header
);

app?.appendChild(
  MainSearch(search)
);

const createHobbyBtn = document.createElement("button");
createHobbyBtn.textContent = "Create Hobby";
createHobbyBtn.classList.add("btn");

const createPersonBtn = document.createElement("button");
createPersonBtn.textContent = "Create Person";
createPersonBtn.classList.add("btn");

const headerOptions = document.createElement("div");
headerOptions.classList.add("header-options");

headerOptions.appendChild(createHobbyBtn);
headerOptions.appendChild(createPersonBtn);
header.appendChild(headerOptions);



const searchResult = document.createElement("div");
searchResult.id = "SearchResult";

app?.appendChild(
  searchResult
);

window.addEventListener('click', (e) => {
  const select = document.querySelector('.select');
  if (!select?.contains(e.target as Node)) {
    select?.classList.remove('open');
  }
});


const el = document.querySelector("header")!;
const observer = new IntersectionObserver(
  ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
  { threshold: [1] }
);

observer.observe(el);