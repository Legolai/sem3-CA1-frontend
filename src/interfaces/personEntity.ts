import HobbyEntity from "./hobbyEntity";

interface PersonEntity {
    id?: number,
    email: string,
    firstName: string,
    lastName: string,
    phones: {
        number: string,
        description: string;
    }[],
    address: {
        street: string,
        floor: string,
        door: string,
        cityInfo: {
            zipCode: string,
            city: string;
        };
    };
    hubbies?: HobbyEntity[];
}

export default PersonEntity;