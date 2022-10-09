import { SupTag } from "../utility";

type inputType = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";

interface Props {
    type: inputType;
    label?: string;
    required?: boolean;
    placeholder?: string;
    pattern?: string;
    name?: string;
}

const InputField = ({ ...props }: Props) => {
    const component = new SupTag("div").addClass("inputField");

    if (props.label) {
        const labelElm = new SupTag("label").setTextContent(props.label).addClass("input-label");
        if (props.name) labelElm.applyToElem(elm => {
            elm.htmlFor = props.name!;
        });
        component.appendTag(labelElm);
    }

    const input = new SupTag("input").applyToElem(elm => elm.type = props.type).addClass("input");
    if (props.placeholder) input.applyToElem(elm => elm.placeholder = props.placeholder!);
    if (props.pattern) input.applyToElem(elm => elm.pattern = props.pattern!);
    if (props.required != undefined) input.applyToElem(elm => elm.required = props.required!);
    if (props.name) input.applyToElem(elm => elm.name = props.name!);

    component.appendTag(input);

    return component;
};

export default InputField;