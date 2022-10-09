import { SupTag } from "./../utility";
import CreateDropDrown from "./dropdown";


const MainSearch = (searchFunction: Function) => {
    const component = new SupTag("div").setId("MainSearch");

    const select = CreateDropDrown([{
        text: "Hobby",
        value: "hobby",
    }, {
        text: "Person",
        value: "person",
        defaultSelected: true,
    }]);

    component.appendTag(select);

    const inputField = new SupTag("input");
    inputField.element.type = "text";
    inputField.element.placeholder = "search...";
    component.appendTag(inputField);

    const searchBtn = new SupTag("button");
    const searchBtnText = new SupTag("span").setTextContent("Find");
    searchBtn.appendTag(searchBtnText);
    searchBtn.addEventListener("click", () => {
        const type = select.element.querySelector(".selected")?.getAttribute("data-value")!;
        const searchText = inputField.element.value;
        searchFunction(type, searchText);
    });

    component.appendTag(searchBtn);

    return component;
};

export default MainSearch;


