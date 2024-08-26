import Result "mo:base/Result";
import Time "mo:base/Time";
import Products "../product/types";

module {

    public type Result<Ok, Err> = Result.Result<Ok, Err>;
    public type Product = Products.Product;

    public type TransactionHeader = {
        id: Nat64;
        details: [TransactionDetail];
        date: Time.Time;
        seller: Text;
        buyer: Text;
    };

    public type TransactionDetail = {
        product: Product;
        quantity: Nat;
    }
    
}   