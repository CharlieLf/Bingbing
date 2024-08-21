import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import List "mo:base/List";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Types "Types";

actor Product {
    type ProductType = Types.Product;
    private let products: TrieMap.TrieMap<Text, ProductType> = TrieMap.TrieMap<Text, ProductType>(Text.equal, Text.hash);
    private stable var idList: List.List<Text> = List.nil<Text>();

    private func createProduct(newName: Text, newPrice: Nat64, newImage: Blob): ProductType {
        let newId = Time.now();
        return {
            id = Int.toText(newId);
            name = newName;
            price = newPrice;
            image = newImage;
        };
    };

    public shared(msg) func addProduct(
        // newName: Text, newPrice: Nat64, newImage: Blob
    ) {
        let product = createProduct("a", 10, "a");
        products.put(product.id, product);
        idList := List.push(product.id, idList);
    };
    
    public shared query(msg) func getProducts(): async [ProductType] {
        Iter.toArray(products.vals());
    };

}
