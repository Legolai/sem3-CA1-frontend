import AddPhoneNumber from "./addPhoneNumber";
import InputField from "./inputField";
import { ActionHook, PersonEntity } from "../interfaces";
import { SupTag } from "../utility";
import { SERVER_API_URL } from "../constants";

const createPersonEntity = (actionHook: ActionHook) => {
    const component = new SupTag("form").addClass("person-form").setId("PersonForm");
    const firstNameInput = InputField({ type: "text", label: "First name", required: true, name: "firstName" });
    const lastNameInput = InputField({ type: "text", label: "Last name", required: true, name: "lastName" });
    const emailInput = InputField({ type: "email", label: "Email", required: true, name: "email" });
    const phonesList = new SupTag("div").addClass("phone-list").appendTag(new SupTag("label").addClass("input-label").setTextContent("Phone number(s)"));
    const phoneNumberHolder = AddPhoneNumber({ placeholder: "+45 12 34 56 78", pattern: "(\\+(45)( ))?([0-9]{2}( )?){3}[0-9]{2}", number: 1 });
    const additionalPhone = new SupTag("div").addClass("flex-row", "space")
        .appendTag(
            new SupTag("p").setTextContent("Additional Phone").addClass("additional-phone"),
            new SupTag("button").applyToElem(elm => elm.type = "button")
                .setTextContent("+").addClass("btn", "additional-phone-btn")
                .addEventListener("click", () => {
                    const number = phonesList.getChildrenCount() - 1;
                    phonesList.appendTagBefore(additionalPhone, AddPhoneNumber({
                        placeholder: "+45 12 34 56 78",
                        pattern: "(\\+(45)( ))?([0-9]{2}( )?){3}[0-9]{2}",
                        canBeDeleted: true,
                        number: number
                    }));
                })
        );

    phonesList.appendTag(phoneNumberHolder, additionalPhone);

    const streetInput = InputField({ type: "text", label: "Street and number", required: true, name: "street" });
    const floorInput = InputField({ type: "text", label: "Floor", name: "floor" });
    const doorInput = InputField({ type: "text", label: "Door", name: "door" });
    const zipCodeInput = InputField({ type: "text", label: "Zip code", required: true, name: "zipCode" });
    const cityInput = InputField({ type: "text", label: "City", required: true, name: "city" });

    const addressElem = new SupTag("div").appendTag(
        streetInput,
        floorInput,
        doorInput,
        zipCodeInput,
        cityInput
    ).addClass("person-form-address");

    const buttons = new SupTag("div").addClass().appendTag(
        new SupTag("button").addClass("btn", "submit-btn").setTextContent("Create").applyToElem(elm => {
            elm.type = "submit";
        }),
        new SupTag("button").addClass("btn").setTextContent("Cancel").applyToElem(elm => {
            elm.type = "reset";
        }).addEventListener("click", (event) => {
            console.log("hello");
            actionHook.close();
        })
    );

    component.appendTag(
        firstNameInput,
        lastNameInput,
        emailInput,
        phonesList,
        addressElem,
        buttons
    );

    component.addEventListener("submit", (event) => {
        event.preventDefault();
        const person = <PersonEntity>{};
        const form = (event.target as HTMLFormElement);
        const formData = new FormData(form);
        person.phones = [];
        const address = {
            street: "",
            floor: "",
            door: "",
            cityInfo: {
                city: "",
                zipCode: ""
            }
        };

        person.address = address;
        person.hubbies = [];
        formData.forEach((value, key, parent) => {
            if (key === "firstName") person.firstName = value.toString();
            else if (key === "lastName") person.lastName = value.toString();
            else if (key === "email") person.email = value.toString();
            else if (key.startsWith("phoneNumber")) {
                const description = form.querySelector(`#${key}Desc .selected`)?.getAttribute("data-value")!;
                person.phones.push({ number: value.toString(), description: description });
            }
            else if (key === "street" || key === "door" || key == "floor") {
                person.address[key] = value.toString();
            }
            else if (key === "zipCode" || key === "city") {
                person.address.cityInfo[key] = value.toString();
            }
        });

        console.log(person);
        console.log(JSON.stringify(person));
        fetch(`${SERVER_API_URL}/person`, {
            method: 'POST',
            body: JSON.stringify(person),
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'accept': 'application/json',
                // "Access-Control-Allow-Headers": "Origin, Accept, Content-Type, Authorization,x-access-token"
            }
        }).then(res => console.log(res.json())).catch(err => console.log(err));

    });

    return component;
};

export default createPersonEntity;