import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Types "types";
import Utils "utils";
import CartActorModules "../cart/interface"

actor {
    type Result<Ok, Error> = Types.Result<Ok, Error>;
    type Product = Types.Product;
    type ProductWithoutImage = Types.ProductWithoutImage;

    let products = TrieMap.TrieMap<Nat64, Product>(Nat64.equal, Nat64.toNat32);
    private var size : Nat64 = 0;

    public shared ({ caller }) func createProduct(
        _name : Text,
        _price : Nat64,
        _stock : Nat64,
        _image : Blob,
        _gender : Text,
        _season : Text,
        _clothingType : Text,
        _clothing : Text,
    ) : async Result<(), Text> {
        let product = Utils._createProduct(size, _name, _price, _stock, _image, Principal.toText(caller), _gender, _season, _clothingType, _clothing);
        products.put(size, product);
        size += 1;
        return #ok();
    };

    public shared ({ caller }) func updateProduct(p : Product) : async Result<(), Text> {
        let oldProduct : ?Product = products.get(p.id);
        switch (oldProduct) {
            case (?value) {
                if (value.owner != Principal.toText(caller)) {
                    return #err("Unauthorized");
                };
                products.put(p.id, p);
                return #ok();
            };
            case null {
                return #err("Product not found");
            };
        };
    };

    public shared ({ caller }) func deleteProduct(productId : Nat64, cartCanisterId : Text) : async Result<(), Text> {
        let product = products.get(productId);
        let cartActor = actor (cartCanisterId) : CartActorModules.CartActor;

        switch (product) {
            case null {
                return #err("Product not found");
            };
            case (?product) {
                if (product.owner != Principal.toText(caller)) {
                    return #err("Unauthorized");
                };
                products.delete(productId);
                cartActor.removeNoProductCart(caller, productId);
                return #ok();
            };
        };
    };

    public shared query func getProduct(productId : Nat64, owner : ?Principal) : async ?ProductWithoutImage {
        let product = switch (products.get(productId)) {
            case (null) {
                return null;
            };
            case (?product) {
                product;
            };
        };
        switch (owner) {
            case (null) {
                ?product;
            };
            case (?owner) {
                if (product.owner == Principal.toText(owner)) {
                    ?product;
                } else {
                    return null;
                };
            };
        };

    };

    public shared query func getAllProducts(pageNumber : Nat) : async [ProductWithoutImage] {
        let productsPerPage = 10; 

        let startIndex = (pageNumber - 1) * productsPerPage;
        let endIndex = startIndex + productsPerPage;

        let productWithoutImageIter = Iter.map(
            products.vals(),
            _omitImage,
        );
        let productArray = Iter.toArray(productWithoutImageIter);

        return Iter.toArray(Array.slice<ProductWithoutImage>(productArray, startIndex, endIndex));
    };

    public shared query func countTotalPage() : async Nat {
        if(products.size() / 10 < 1) {
            return 1;
        } else {
            return products.size() / 10;
        };
    };


    public shared query func getProductsByOwner(owner : Text) : async [ProductWithoutImage] {
        let filtered = Iter.toArray(
            Iter.filter(
                products.vals(),
                func(p : Product) : Bool { p.owner == owner },
            )
        );
        let productWithoutImageIter = Iter.map(
            filtered.vals(),
            _omitImage,
        );
        return Iter.toArray(productWithoutImageIter);
    };

    public shared query func getProductImage(productId : Nat64) : async ?Blob {
        let product = products.get(productId);
        switch (product) {
            case (null) {
                return null;
            };
            case (?product) {
                return product.image;
            };
        };
    };

    func _omitImage(p : Product) : ProductWithoutImage {
        return {
            id = p.id;
            name = p.name;
            price = p.price;
            stock = p.stock;
            owner = p.owner;
            gender = p.gender;
            season = p.season;
            clothingType = p.clothingType;
            clothing = p.clothing;
        };
    };

};
