import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Error "mo:base/Error";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";

actor {

    let ledger = HashMap.HashMap<Principal, Nat>(0, Principal.equal, Principal.hash);
    type Result<Ok, Error> = Result.Result<Ok, Error>;

    public query func seeAllLedger() : async [{
        owner : Principal;
        balance : Nat;
    }] {
        type data = { owner : Principal; balance : Nat };

        let listData : [data] = Iter.toArray(
            Iter.map(
                ledger.entries(),
                func(entry : (Principal, Nat)) : data {
                    let (owner, balance) = entry;
                    return { owner; balance };
                },
            )
        );

        return listData;
    };

    public query ({ caller }) func balance() : async Result<Nat, Text> {
        switch (ledger.get(caller)) {
            case (?balance) {
                #ok(balance);
            };
            case (null) {
                #err("Unknown owner : " # Principal.toText(caller));
            };
        };
    };

    public func mint(owner : Principal, amount : Nat) : async Result<(), Text> {
        if (Principal.toText(owner) == "2vxsx-fae") {
            return #err("Anonymous not permited to mint");
        };

        switch (ledger.get(owner)) {
            case (?balance) {
                ledger.put(owner, balance + amount);
                #ok(());
            };
            case (null) {
                ledger.put(owner, amount);
                #ok(());
            };
        };

    };

    public shared({caller}) func burn(amount : Nat) : async Result<(), Text> {
        switch (ledger.get(caller)) {
            case (?balance) {
                if (balance >= amount) {
                    ledger.put(caller, balance - amount);
                    #ok(());
                } else {
                    #err("Insufficient balance");
                };
            };
            case (null) {
                #err("Unknown owner");
            };
        };
    };

    public shared ({ caller }) func transfer(to : Text, amount : Nat) : async Result<(), Text> {
        let toPrincipal = Principal.fromText(to);
        switch (ledger.get(caller)) {
            case (?balance) {
                if (balance >= amount) {
                    switch (ledger.get(toPrincipal)) {
                        case (?toBalance) {
                            ledger.put(caller, balance - amount);
                            ledger.put(toPrincipal, toBalance + amount);
                            #ok(());
                        };
                        case (null) {
                            ledger.put(caller, balance - amount);
                            ledger.put(toPrincipal, amount);
                            #ok(());
                        };
                    };
                } else {
                    #err("Insufficient balance");
                };
            };
            case (null) {
                #err("Unknown caller");
            };
        };
    };

    public query func showAll() : async ([Principal], [Nat]) {
        let owners = ledger.keys();
        let balances = ledger.vals();
        (Iter.toArray(owners), Iter.toArray(balances));
    };

};
