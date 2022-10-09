import { SupTag } from "../utility";

interface Option {
    text: string | number;
    value: string | number;
    selected?: boolean;
    defaultSelected?: boolean;
}


const CreateOption = (param: Option) => {
    const option = new SupTag("span").addClass("custom-option");
    if (param.defaultSelected) option.addClass("selected");
    option.setTextContent(param.text);
    option.setAttr("data-value", param.value.toString());
    return option;
};


const CreateDropDrown = (options: Option[]) => {
    const selectWrapper = new SupTag("div").addClass("select-wrapper");
    const select = new SupTag("div").addClass("select");
    const optionsElm = new SupTag("div").addClass("custom-options");
    const current = new SupTag("span");


    options.forEach(o => {
        const option = CreateOption(o);

        if (o.defaultSelected) current.setTextContent(o.text);

        option.addEventListener("click", () => {
            if (!option.hasClass("selected")) {
                option.element.parentNode?.querySelector(".custom-option.selected")?.classList.remove('selected');
                option.addClass("selected");
                current.setTextContent(option.getTextContent());
            }
        });

        optionsElm.appendTag(option);
    });

    const selectTrigger = new SupTag("div").addClass("select__trigger");
    const arrow = new SupTag("div").addClass("select-arrow");

    selectTrigger.appendTag(arrow, current);
    select.appendTag(selectTrigger, optionsElm);
    selectWrapper.appendTag(select);


    selectWrapper.addEventListener("click", () => {
        select.toggleClass("open");
    });


    return selectWrapper;
};


export default CreateDropDrown;