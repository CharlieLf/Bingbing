import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Types "types";
import Utils "utils";

actor {
  type Result<Ok, Error> = Types.Result<Ok, Error>;
  type Product = Types.Product;

  let products = TrieMap.TrieMap<Nat64, Product>(Nat64.equal, Nat64.toNat32);
  private var size : Nat64 = 0;

  public shared ({ caller }) func createProduct(
    _name : Text,
    _price : Nat64,
    _description : Text,
    _image : Blob,
  ) : async Result<(), Text> {
    let product = Utils._createProduct(size, _name, _price, _description, _image, Principal.toText(caller));
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

  public shared ({ caller }) func deleteProduct(key : Nat64) : async Result<(), Text> {
    switch (products.get(key)) {
      case null {
        return #err("Product not found");
      };
      case (?product) {
        if (product.owner != Principal.toText(caller)) {
          return #err("Unauthorized");
        };
        products.delete(key);
        return #ok();
      };
    };
  };

  public shared query func getProduct(key : Nat64) : async ?Product {
    products.get(key);
  };

  public shared query func getAllProducts() : async [Product] {
    return Iter.toArray(products.vals());
  };

  public shared query func getProductsByOwner(owner : Text) : async [Product] {
    return Iter.toArray(
      Iter.filter(
        products.vals(),
        func(p : Product) : Bool { p.owner == owner },
      )
    );
  };

};
