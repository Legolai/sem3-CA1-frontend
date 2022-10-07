interface HobbyEntity {
    name: string;
    description: string;
    type: string;
    category: string;
    people: {
        id: number;
        fullName: string;
    };
}

export default HobbyEntity;