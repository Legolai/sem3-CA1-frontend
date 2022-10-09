import { SupTag } from "../utility";
import { PersonEntity } from "../interfaces";


const Person = (person: PersonEntity) => {
    const component = new SupTag("div").addClass("person");
    const header = new SupTag("h3").setTextContent(`${person.id} ${person.firstName} ${person.lastName}`);

    const email = new SupTag("p").addClass("email").setTextContent(person.email);

    const hobbyTags = new SupTag("div").addClass("person-hobbies").appendTag(new SupTag("h4").setTextContent("Hobbies"));
    if (person.hubbies && person.hubbies.length > 0) hobbyTags.appendTag(...person.hubbies.map(h => {
        return new SupTag("div").setTextContent(h.name).addClass("tag");
    }));

    const address = new SupTag("div").appendTag(
        new SupTag("p").setTextContent(`${person.address.street} ${person.address.floor} ${person.address.door}`.trim()),
        new SupTag("p").setTextContent(`${person.address.cityInfo.zipCode} ${person.address.cityInfo.city}`)
    );

    const phoneNumbers = new SupTag("div").addClass("person-phoneNumbers").appendTag(new SupTag("h4").setTextContent("Phone numbers"));
    if (person.hubbies && person.hubbies.length > 0) phoneNumbers.appendTag(...person.phones.map(p => {
        return new SupTag("p").setTextContent(`${p.description} ${p.number}`).addClass("phoneNumber");
    }));


    component.appendTag(
        header,
        email,
        address,
        phoneNumbers,
        hobbyTags
    );





    return component;
};

export default Person;