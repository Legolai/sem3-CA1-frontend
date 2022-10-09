import "./css/main.css";
import { MainSearch, Modal, PersonForm } from "./components";
import search from "./search";
import { SupTag } from "./utility";

const app = document.querySelector("#App");

const header = new SupTag("header");
const h1 = new SupTag("h1").setTextContent("Hobbytisten");
header.appendTag(h1);


app?.appendChild(
  header.element
);

app?.appendChild(
  MainSearch(search).element
);

const createHobbyBtn = new SupTag("button").addClass("btn").setTextContent("Create Hobby");

const hook = { open: () => { }, close: () => { } };
const personFormModal = Modal(PersonForm, "PersonModalForm", "Create a Person", hook);

const createPersonBtn = new SupTag("button").addClass("btn").setTextContent("Create Person").addEventListener("click", () => {
  hook.open();
});

const headerOptions = new SupTag("div").addClass("header-options").appendTag(createHobbyBtn, createPersonBtn);

header.appendTag(headerOptions);



const searchResult = new SupTag("div").setId("SearchResult");

app?.appendChild(
  searchResult.element
);

app?.appendChild(
  personFormModal.element
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