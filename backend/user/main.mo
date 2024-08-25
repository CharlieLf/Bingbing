import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Types "types";
import TokenActorModules "../token/interface"


actor {


    type Result<Ok, Error> = Types.Result<Ok, Error>;
    type HashMap<K, V> = Types.HashMap<K, V>;
    type User = Types.User; 

    let tokenActor = actor "c2lt4-zmaaa-aaaaa-qaaiq-cai" : TokenActorModules.TokenActor;
    var users = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);

    public shared ({caller}) func createUser(user: User) : async Result<(), Text> {
        
        switch(users.get(caller)){
            case(null){
                users.put(caller, user);
                let _ = await tokenActor.mint(caller, 1000);
                return #ok();
            };
            case(? user){
                return #err("User already exists");
            }
        }
    };

  public shared query ({ caller }) func getUser() : async Result<User, Text> {
    switch (users.get(caller)) {
      case (?user) {
        return #ok(user);
      };
      case (null) {
        return #err("User not found");
      };
    };
  };

  public shared func clear() {
    users := HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);
  };

  public shared query func getUsers() : async ([User], [Principal]) {
    (Iter.toArray(users.vals()), Iter.toArray(users.keys()));
  };

};
