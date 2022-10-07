import CreateDropDrown from "./dropdown";


const MainSearch = (searchFunction: Function) => {
    const component = document.createElement("div");
    component.id = "MainSearch";


    const select = CreateDropDrown([{
        text: "Hobby",
        value: "hobby",
    }, {
        text: "Person",
        value: "person",
        defaultSelected: true,
    }]);

    component.appendChild(select);

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "search...";
    component.appendChild(inputField);

    const searchBtn = document.createElement("button");
    const searchBtnText = document.createElement("span");
    searchBtnText.textContent = "Find";
    searchBtn.appendChild(searchBtnText);
    searchBtn.addEventListener("click", () => {
        const type = select.querySelector(".selected")?.getAttribute("data-value")!;
        const searchText = inputField.value;
        searchFunction(type, searchText);
    });

    component.appendChild(searchBtn);

    return component;
};

export default MainSearch;


