interface UserProps {
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    address: string;
}

interface UserData {
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: bigint;
    address: string;
}

export default class User {
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    address: string;

    constructor({ name, email, address, dateOfBirth, phoneNumber }: UserProps) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
    }

    static castToUser(u: UserData): User {
        return new User({
            name: u.name,
            email: u.email,
            phoneNumber: u.phoneNumber,
            dateOfBirth: new Date(Number(u.dateOfBirth)),
            address: u.address,
        });
    }
}