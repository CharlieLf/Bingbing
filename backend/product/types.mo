import Result "mo:base/Result";

module {
    public type Result<Ok, Err> = Result.Result<Ok, Err>;
    public type Product = {
        id : Nat64;
        name : Text;
        price : Nat64;
        description : Text;
        image : Blob;
        owner : Text;
    };
}