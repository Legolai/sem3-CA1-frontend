interface Option {
    text: string | number;
    value: string | number;
    selected?: boolean;
    defaultSelected?: boolean;
}


const CreateOption = (param: Option) => {
    const option = document.createElement("span");
    option.className = "custom-option";
    if (param.defaultSelected) option.classList.add("selected");
    option.textContent = param.text.toString();
    option.setAttribute("data-value", param.value.toString());
    return option;
};


const CreateDropDrown = (options: Option[]) => {
    const selectWrapper = document.createElement("div");
    selectWrapper.className = "select-wrapper";

    const select = document.createElement("div");
    select.className = "select";

    const optionsElm = document.createElement("div");
    optionsElm.className = "custom-options";

    const current = document.createElement("span");


    options.forEach(o => {
        const option = CreateOption(o);

        if (o.defaultSelected) current.textContent = o.text.toString();

        option.addEventListener("click", () => {
            if (!option.classList.contains("selected")) {
                option.parentNode?.querySelector(".custom-option.selected")?.classList.remove('selected');
                option.classList.add("selected");
                current.textContent = option.textContent;
            }
        });

        optionsElm.appendChild(option);
    });

    const selectTrigger = document.createElement("div");
    selectTrigger.className = "select__trigger";

    const arrow = document.createElement("div");
    arrow.className = "select-arrow";

    selectTrigger.appendChild(arrow);


    selectTrigger.appendChild(current);

    select.appendChild(selectTrigger);
    select.appendChild(optionsElm);

    selectWrapper.appendChild(select);

    selectWrapper.addEventListener("click", () => {
        select.classList.toggle("open");
    });


    return selectWrapper;
};


export default CreateDropDrown;