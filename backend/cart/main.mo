import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Nat64 "mo:base/Nat64";
import List "mo:base/List";
import Products "../product/types";
import Types "./types";

actor {

    type Result<Ok, Error> = Types.Result<Ok, Error>;
    type HashMap<K ,V> = Types.HashMap<K, V>;
    type Buffer<T> = Types.Buffer<T>;
    type Product = Products.Product;

    
    type CartDetail = Types.CartDetail;
    type ShownCart = Types.ShownCart;
    type UserCartDetail = HashMap<Nat64, Nat>;
    type UserCartItem = HashMap<Principal, UserCartDetail>;

    let carts = HashMap.HashMap<Principal, UserCartItem>(0, Principal.equal, Principal.hash);

    public shared ({caller}) func createCart() : (){

        carts.put(caller, HashMap.HashMap<Principal, UserCartDetail>(0, Principal.equal, Principal.hash));
        return ();

    };

    public shared ({caller}) func addOrUpdateCart(sellerId: Text, product: Product, quantity: Nat) : async Result<(), Text> {

        switch(carts.get(caller)){
            case(null){
                return #err("Cart not found");
            };
            case(?cart){
                
                switch(cart.get(Principal.fromText(sellerId))){
                    case(null){
                        let newCartItem = _produceCartItem(product.id, quantity);
                        cart.put(Principal.fromText(sellerId), newCartItem);
                        return #ok(());
                    };
                    case(?cartItem){
                        cartItem.put(product.id, quantity);
                        return #ok(());
                    };
                };

            };
        };

    };

    public shared ({caller}) func removeCartItem(sellerId: Text, productId: Nat64) : async Result<(), Text> {
        switch(carts.get(caller)){
            case(null){
                return #err("Cart not found");
            };
            case(?cart){
                switch(cart.get(Principal.fromText(sellerId))){
                    case(null){
                        return #err("Seller not found");
                    };
                    case(?cartItem){
                        cartItem.delete(productId);
                        return #ok(());
                    };
                };
            };
        };
    };

    public shared query ({caller}) func getSelfCart() : async Result<[ShownCart], Text>{
        switch(carts.get(caller)){
            case(null){
                return #err("Empty Cart");
            };
            case(?cart){
                let shownCart = Buffer.Buffer<ShownCart>(0);

                for ((ownerId, products) in cart.entries()) {
                    var itemList = Buffer.Buffer<CartDetail>(0);

                    for((productId, quantity) in products.entries()){
                        let detail = {
                            productId = productId;
                            quantity = quantity;
                        };
                        itemList.add(detail);
                    };
                    shownCart.add({
                        owner = Principal.toText(ownerId);
                        products = Buffer.toArray(itemList);
                    });

                };
                return #ok(Buffer.toArray(shownCart));
            };
        };
    };

    

    private func _produceCartDetail(product: Product, quantity: Nat) : CartDetail {
        return {
            productId = product.id;
            quantity = quantity;
        };
    };

    private func _produceCartItem(protuctId : Nat64, quantity: Nat) : HashMap<Nat64, Nat> {
        let cartItem = HashMap.HashMap<Nat64, Nat>(0, Nat64.equal, Nat64.toNat32);
        cartItem.put(protuctId, quantity);
        return cartItem;
    };

};