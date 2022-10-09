import { SupTag } from "../utility";
import { HobbyEntity } from "../interfaces";


const Hobby = (hobby: HobbyEntity) => {
    const component = new SupTag("div").addClass("hobby");

    const header = new SupTag("h3").setTextContent(hobby.name);
    component.appendTag(header);

    const holder = new SupTag("div").addClass("hobby-tags");
    component.appendTag(holder);

    const category = new SupTag("div").addClass("hobby-category").setTextContent(hobby.category);
    holder.appendTag(category);

    const type = new SupTag("div").addClass("hobby-type").setTextContent(hobby.type);
    holder.appendTag(type);

    const link = new SupTag("a");
    link.element.href = hobby.description;
    link.element.target = "_blank";
    link.element.textContent = "Description";
    component.appendTag(link);

    return component;
};

export default Hobby;