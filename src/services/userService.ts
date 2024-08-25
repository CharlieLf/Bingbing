import useServiceContext from "@hooks/useServiceContext";
import User from "@models/user";
import { useState } from "react";

export function getUserQuery() {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const { useQueryCall: userQuery } = useServiceContext().userService;

    const { call: getUser, loading: getUserLoading } = userQuery({
        functionName: "getUser",
        args: [],
        refetchOnMount: false,
        refetchInterval: 0,
        onSuccess: (result) => {
            if (!result || 'err' in result) {
                setUser(null);
                return;
            }
            setUser(User.castToUser(result.ok));
        },
    })
    return { user, getUser, getUserLoading };
}

export function createUserQuery(name: string, email: string, phoneNumber: string, dob: bigint, address: string) {
    const { useUpdateCall: userUpdate } = useServiceContext().userService;

    const {call: createUser} = userUpdate({
        functionName: "createUser",
        args: [{name, email, phoneNumber, dateOfBirth: dob, address}],
    });

    return { createUser };
}