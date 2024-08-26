import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Types "types";
import TokenActorModules "../token/interface";
import CartActorModules "../cart/interface";

actor {

  type Result<Ok, Error> = Types.Result<Ok, Error>;
  type HashMap<K, V> = Types.HashMap<K, V>;
  type User = Types.User;

  var users = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);

  public shared ({ caller }) func createUser(tokenCanisterId : Text, cartCanisterId : Text, user : User, owner : ?Principal) : async Result<(), Text> {

    let tokenActor = actor (tokenCanisterId) : TokenActorModules.TokenActor;
    let cartActor = actor (cartCanisterId) : CartActorModules.CartActor;

    switch (owner) {
      case (?owner) {
        switch (users.get(owner)) {
          case (null) {
            users.put(owner, user);
            let mintRes = await tokenActor.mint(owner, 1000);
            if (mintRes != #ok()) return #err("Cannot mint token, ambiguous Identity");
            cartActor.createCart(owner);
            return #ok();
          };
          case (?user) {
            return #err("User already exists");
          };
        };
      };
      case (null) {
        switch (users.get(caller)) {
          case (null) {
            users.put(caller, user);
            let mintRes = await tokenActor.mint(caller, 1000);
            if (mintRes != #ok()) return #err("Cannot mint token, ambiguous Identity");
            cartActor.createCart(caller);
            return #ok();
          };
          case (?user) {
            return #err("User already exists");
          };
        };
      };
    };
  };

  public shared query ({ caller }) func getUser(principal : ?Principal) : async Result<User, Text> {
    switch (principal) {
      case (?principal) {
        switch (users.get(principal)) {
          case (?user) {
            return #ok(user);
          };
          case (null) {
            return #err("User not found : " # Principal.toText(principal));
          };
        };
      };
      case (null) {
        switch (users.get(caller)) {
          case (?user) {
            return #ok(user);
          };
          case (null) {
            return #err("User not found : " # Principal.toText(caller));
          };
        };
      };
    };
  };

  public shared ({ caller }) func updateUser(user : User) : async Result<(), Text> {
    switch (users.get(caller)) {
      case (?_) {
        users.put(caller, user);
        return #ok();
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
