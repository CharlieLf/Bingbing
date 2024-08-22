import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Error "mo:base/Error";

actor {

    let ledger = HashMap.HashMap<Principal, Nat>(0, Principal.equal, Principal.hash);
    type Result<Ok, Error> = Result.Result<Ok, Error>;

    public query ({ caller }) func balance() : async Result<Nat, Text> {
        switch(ledger.get(caller)){
            case (?balance){
                #ok(balance);
            };
            case (null){
                #err("Unknown owner : " # Principal.toText(caller));
            };
        }
    };

    private func mint(owner : Principal, amount: Nat) : async Result<(), Text>{

        switch(ledger.get(owner)){
            case (?balance){
                ledger.put(owner, balance + amount);
                #ok(());
            };
            case (null){
                ledger.put(owner, amount);
                #ok(());
            };
        }

    };

    private func burn(owner : Principal, amount: Nat) : async Result<(), Text>{
        switch(ledger.get(owner)){
            case (?balance){
                if(balance >= amount){
                    ledger.put(owner, balance - amount);
                    #ok(());
                } else {
                    #err("Insufficient balance");
                }
            };
            case (null){
                #err("Unknown owner");
            };
        }
    };

    public shared ({caller}) func transfer(to: Principal, amount: Nat) : async Result<(), Text>{
        switch(ledger.get(caller)){
            case (?balance){
                if(balance >= amount){
                    switch(ledger.get(to)){
                        case (?toBalance){
                            ledger.put(caller, balance - amount);
                            ledger.put(to, toBalance + amount);
                            #ok(());
                        };
                        case (null){
                            ledger.put(caller, balance - amount);
                            ledger.put(to, amount);
                            #ok(());
                        };
                    }
                } else {
                    #err("Insufficient balance");
                }
            };
            case (null){
                #err("Unknown caller");
            };
        }
    }

}