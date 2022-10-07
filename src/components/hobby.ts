import { HobbyEntity } from "../interfaces";


const Hobby = (hobby: HobbyEntity) => {
    const component = document.createElement("div");
    component.classList.add("hobby");

    const header = document.createElement("h3");
    header.textContent = hobby.name;
    component.appendChild(header);

    const holder = document.createElement("div");
    holder.classList.add("hobby-tags");
    component.appendChild(holder);

    const category = document.createElement("div");
    category.classList.add("hobby-category");
    category.textContent = hobby.category;
    holder.appendChild(category);

    const type = document.createElement("div");
    type.classList.add("hobby-type");
    type.textContent = hobby.type;
    holder.appendChild(type);

    const link = document.createElement("a");
    link.href = hobby.description;
    link.target = "_blank";
    link.textContent = "Description";
    component.appendChild(link);

    return component;
};

export default Hobby;