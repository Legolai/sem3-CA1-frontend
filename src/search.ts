import { Hobby, Person } from "./components";
import { SERVER_API_URL } from "./constants";
import { HobbyEntity, PersonEntity } from "./interfaces";

const search = (type: string, searchText: string) => {
    const searchResultElem = document.querySelector("#SearchResult")!;
    if (type == "hobby") {
        fetch(`${SERVER_API_URL}/hobby`).then(res => {
            if (!res.ok) throw { status: res.status, errorMsg: res.statusText };
            return res.json();
        }).then(json => {
            searchResultElem.textContent = "";
            json.forEach((hobby: HobbyEntity) => {
                searchResultElem.appendChild(Hobby(hobby).element);
            });
        })
            .catch(err => console.log(err));
    }
    else if (type == "person") {
        fetch(`${SERVER_API_URL}/person`).then(res => {
            if (!res.ok) throw { status: res.status, errorMsg: res.statusText };
            return res.json();
        }).then(json => {
            searchResultElem.textContent = "";
            json.forEach((person: PersonEntity) => {
                searchResultElem.appendChild(Person(person).element);
            });
        })
            .catch(err => console.log(err));
    }


};

export default search;