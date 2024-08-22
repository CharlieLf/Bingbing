import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Iter "mo:base/Iter";
import Types "types";
import Utils "utils";

actor {
  type Result<Ok, Error> = Types.Result<Ok, Error>;
  type Product = Types.Product;

  let products = TrieMap.TrieMap<Nat64, Product>(Nat64.equal, Nat64.toNat32);
  private var size : Nat64 = 0;

  public shared ({ caller }) func createProduct(n : Text, p : Nat64, d : Text, i : Blob) : async Result<(), Text> {
    let product = Utils._createProduct(size, n, p, d, i, caller);
    products.put(size, product);
    size += 1;
    return #ok();
  };

  public shared ({ caller }) func updateProduct(p : Product) : async Result<(), Text> {
    let oldProduct : ?Product = products.get(p.id);

    switch (oldProduct) {
      case (?value) {
        if (value.owner != caller) {
          return #err("Unauthorized");
        };
        let _ = products.replace(p.id, p);
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
        if (product.owner != caller) {
          return #err("Unauthorized");
        };
        products.delete(key);
        return #ok();
      };
    };
  };

  public shared func getProduct(key : Nat64) : async Result<Product, Text> {
    switch (products.get(key)) {
      case null {
        return #err("Product not found");
      };
      case (?product) {
        return #ok(product);
      };
    };
  };

  public shared func getAllProducts() : async Result<[Product], Text> {
    return #ok(Iter.toArray(products.vals()));
  };

};
