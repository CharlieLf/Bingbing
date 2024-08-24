import Result "mo:base/Result";
import Nat64 "mo:base/Nat64";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;
    public type Product = {
        id : Nat64;
        name : Text;
        price : Nat64;
        stock: Nat64;
        description : Text;
        image : Blob;
        owner : Text;
    };
}