import { Hobby } from "./components";
import { SERVER_API_URL } from "./constants";
import { HobbyEntity } from "./interfaces";

const search = (type: string, searchText: string) => {
    const searchResultElem = document.querySelector("#SearchResult")!;
    if (type == "hobby") {
        fetch(`${SERVER_API_URL}/hobby`).then(res => {
            if (!res.ok) throw { status: res.status, errorMsg: res.statusText };
            return res.json();
        }).then(json => {
            json.forEach((hobby: HobbyEntity) => {
                searchResultElem.appendChild(Hobby(hobby));
            });
        })
            .catch(err => console.log(err));
    }


};

export default search;