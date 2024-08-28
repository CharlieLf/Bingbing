import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Types "./types";

module {

    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type User = Types.User;

    public type UserActor = actor {
        getUser: (principal : ?Principal) -> async Result<User, Text>;
    };
};
