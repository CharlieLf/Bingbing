import Types "./types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";
import Iter "mo:base/Iter";

actor {

    public type Result<Ok, Err> = Types.Result<Ok, Err>;
    public type Product = Types.Product;
    public type TransactionHeader = Types.TransactionHeader;
    public type TransactionDetail = Types.TransactionDetail;

    stable var transactionSize : Nat64 = 0;
    let transactions = TrieMap.TrieMap<Nat64, TransactionHeader>(Nat64.equal, Nat64.toNat32);

    public shared ({caller}) func createTransaction(sellerPrincipal : Text, details: [TransactionDetail]) : async Result<(), Text>{

        let header : TransactionHeader = {
            id = transactionSize;
            details = details;
            date = Time.now();
            seller = sellerPrincipal;
            buyer = caller;
        };
        
        transactions.put(transactionSize, header);
        transactionSize += 1;
        return #ok(());

    };

    public shared query func getSellerTransaction(sellerPrincipal : Text) : async Result<[TransactionHeader], Text>{

        let result = TrieMap.mapFilter<Nat64, TransactionHeader, TransactionHeader>(
            transactions, Nat64.equal, Nat64.toNat32,
            func(key, value) = 
                if(value.seller == sellerPrincipal){
                    return ?value;
                } else {
                    return null;
                }
            
        );

        return #ok(Iter.toArray(result.vals()));

    };

    public shared query (msg) func getBuyerTransaction() : async Result<[TransactionHeader], Text>{

        let result = TrieMap.mapFilter<Nat64, TransactionHeader, TransactionHeader>(
            transactions, Nat64.equal, Nat64.toNat32,
            func(key, value) = 
                if(value.buyer == msg.caller){
                    return ?value;
                } else {
                    return null;
                }
            
        );

        return #ok(Iter.toArray(result.vals()));

    };

}