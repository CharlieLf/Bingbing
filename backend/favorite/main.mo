import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";


actor {

    type Result<Ok, Error> = Result.Result<Ok, Error>;

    let favorites = HashMap.HashMap<Principal, Buffer.Buffer<Text>>(0, Principal.equal, Principal.hash);

    public shared func createFavoriteList(user: Principal) : async Result<(), Text> {

        if(Principal.toText(user) == "2vxsx-fae"){
            return #err("Anonymous user cannot create a favorite list");
        };

        favorites.put(user, Buffer.Buffer<Text>(0));
        return #ok();

    };

    public shared ({caller}) func addFavorite(productId : Text) : async Result<(), Text>{

        switch(favorites.get(caller)){
            case(null){
                return #err("Favorite list not found");
            };
            case(?list){
                list.add(productId);
                return #ok();
            };
        }

    };

    public shared ({caller}) func removeFavorite(productId : Text) : async Result<(), Text>{

        switch(favorites.get(caller)){
            case(null){
                return #err("Favorite list not found");
            };
            case(?list){
                list.filterEntries(func(_, x) =  x != productId);
                return #ok();
            };
        }

    };

}