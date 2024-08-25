import useServiceContext from "@hooks/useServiceContext";

export function getUserQuery() {
    const { useQueryCall: userQuery } = useServiceContext().userService;

    const { call: getUser, loading: getUserLoading } = userQuery({
        functionName: "getUser",
        args: [],
        refetchOnMount: false,
        refetchInterval: 0
    })
    return { getUser, getUserLoading };
}

export function createUserQuery(name: string, email: string, phoneNumber: string, dob: number = Date.now(), address: string) {
    const { useUpdateCall: userUpdate } = useServiceContext().userService;

    const {call: createUser} = userUpdate({
        functionName: "createUser",
        args: [{name, email, phoneNumber, dateOfBirth: BigInt(dob!), address}],
    });

    return { createUser };
}