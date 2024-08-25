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

export function createUserQuery() {
    const { useUpdateCall: userUpdate } = useServiceContext().userService;

    const { call: createUser } = userUpdate({
        functionName: "createUser",
    });

    return { createUser };
}