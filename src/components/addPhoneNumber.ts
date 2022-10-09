import { SupTag } from "../utility";
import CreateDropDrown from "./dropdown";
import InputField from "./inputField";


interface props {
    placeholder?: string;
    pattern?: string;
    canBeDeleted?: boolean;
    number: number;
}

const CreateAddPhoneNumber = ({ ...props }: props) => {
    const component = new SupTag("div").addClass("addPhone");
    const dropdown = CreateDropDrown([{
        text: "Mobil",
        value: "mobil",
        defaultSelected: true
    }, {
        text: "Fastnet",
        value: "fastnet",
    }, {
        text: "Arbejde",
        value: "Arbejde",
    }]).addClass("phoneType").setId(`phoneNumber${props.number}Desc`);

    // (\+45 )?([0 - 9]{ 2; } ) { 3; } [0 - 9]{ 2; }

    const input = InputField({ type: "tel", placeholder: props.placeholder, pattern: props.pattern, name: `phoneNumber${props.number}` })
        .addClass("newPhoneNumber");

    component.appendTag(dropdown, input);

    const wrapper = new SupTag("div").addClass("flex-row", "space").appendTag(component);

    if (props.canBeDeleted) wrapper.appendTag(new SupTag("button").addClass("btn", "addPhone-remove-btn").applyToElem(elm => {
        elm.type = "button";
    }).addEventListener("click", (event) => {
        wrapper.deleteSelf();
    }).appendTag(new SupTag("span").applyToElem(elm => elm.innerHTML = "&times;"))
    );

    return wrapper;
};

export default CreateAddPhoneNumber;