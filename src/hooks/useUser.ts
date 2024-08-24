import { useUserQuery, useUserUpdate } from "@actors/userActor"

function createUser(
    name: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: bigint,
    address: string,
) {
    const { call: createUser } = useUserUpdate({
        functionName: "createUser",
        args: [{ name, email, phoneNumber, dateOfBirth, address }]
    });
    return { createUser };
};

function getUser() {
    const { call: getUser } = useUserQuery({
        functionName: "getUser",
        args: []
    });
    return { getUser };
};

function useUser() {
    return { getUser, createUser };
};

export default useUser;