import Types "types";
module {
  type Product = Types.Product;
  public func _createProduct(
    _id : Nat64,
    _name : Text,
    _price : Nat64,
    _stock : Nat64,
    _description : Text,
    _image : Blob,
    _owner : Text,
  ) : Product {
    return {
      id = _id;
      name = _name;
      price = _price;
      stock = _stock;
      description = _description;
      image = _image;
      owner = _owner;
    };
  };
};
