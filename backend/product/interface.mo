import Result "mo:base/Result";
import Types "./types";

module {

    type Result<Ok, Error> = Result.Result<Ok, Error>;
    type Product = Types.Product;

    public type ProductActor = actor {
        createProduct:(product: Product) -> ();
        updateProduct:(productId: Nat64, product: Product) -> ();
        removeProduct:(productId: Nat64) -> ();
        getProduct:(productId: Nat64) -> async Result<Product, Text>;
        getProducts:() -> async Result<[Product], Text>;
    }
}