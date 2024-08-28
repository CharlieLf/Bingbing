import Types "./types";
import TrieMap "mo:base/TrieMap";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import ProductActorModules "../product/interface";

actor {

    public type Result<Ok, Err> = Types.Result<Ok, Err>;
    public type HashMap<K, V> = Types.HashMap<K, V>;

    public type Product = Types.Product;
    public type TransactionHeader = Types.TransactionHeader;
    public type ItemDetail = Types.ItemDetail;
    public type SellerHistory = Types.SellerHistory;
    public type SellerData = Types.SellerData;
    public type BuyerHistory = Types.BuyerHistory;
    public type TransactionInput = Types.TransactionInput;

    stable var transactionSize : Nat64 = 0;
    let transactions = TrieMap.TrieMap<Nat64, TransactionHeader>(Nat64.equal, Nat64.toNat32);

    public shared ({ caller }) func createTransaction(productCanisterId : Text, transactionData : [TransactionInput]) : async Result<(), Text> {

        var TransactionDetails = HashMap.HashMap<Principal, [ItemDetail]>(0, Principal.equal, Principal.hash);

        for (data in transactionData.vals()) {
            let detail = await _createTransactionDetail(productCanisterId, data);
            TransactionDetails.put(detail.seller, detail.details);
        };

        let header : TransactionHeader = {
            id = transactionSize;
            details = TransactionDetails;
            date = Time.now();
            buyer = caller;
        };

        transactions.put(transactionSize, header);
        transactionSize += 1;
        return #ok(());

    };

    public shared query ({ caller }) func getSellerTransaction() : async [SellerHistory] {

        let SLTlist = Buffer.Buffer<SellerHistory>(0);
        for (transaction in transactions.vals()) {
            if (transaction.details.get(caller) != null) {
                SLTlist.add(_createSellerHistory(transaction, caller));
            };
        };

        return Buffer.toArray(SLTlist);

    };

    public shared query ({ caller }) func getBuyerTransaction() : async [BuyerHistory] {
        let histories = Buffer.Buffer<BuyerHistory>(0);

        for ((key, data) in transactions.entries()) {
            if (data.buyer == caller) {

                histories.add(_createBuyerHistory(data, caller));
            };
        };

        return Buffer.toArray(histories);
    };

    private func _createSellerHistory(transaction : TransactionHeader, sellerPrincipal : Principal) : SellerHistory {
        let arrItemData = Buffer.Buffer<ItemDetail>(0);
        for ((seller, details) in transaction.details.entries()) {
            if (seller == sellerPrincipal) {
                for (detail in details.vals()) {
                    arrItemData.add(detail);
                };
            };
        };

        return {
            date = transaction.date;
            buyer = Principal.toText(transaction.buyer);
            items = Buffer.toArray(arrItemData);
        };
    };

    private func _createBuyerHistory(input : TransactionHeader, buyerPrincipal : Principal) : BuyerHistory {
        let arrDetails = Buffer.Buffer<SellerData>(0);
        for ((seller, details) in input.details.entries()) {
            let data : SellerData = {
                seller = seller;
                items = details;
            };
            arrDetails.add(data);
        };
        return {
            id = input.id;
            date = input.date;
            buyer = buyerPrincipal;
            details = Buffer.toArray(arrDetails);
        };
    };

    private func _createTransactionDetail(productCanisterId : Text, input : TransactionInput) : async {
        seller : Principal;
        details : [ItemDetail];
    } {
        let itemDetails = Buffer.Buffer<ItemDetail>(0);
        let productActor = actor (productCanisterId) : ProductActorModules.ProductActor;

        for (item in input.items.vals()) {
            let detail : ItemDetail = {
                product = await productActor.getProduct(item.productId, ?Principal.fromText(input.sellerPrincipal));
                quantity = item.quantity;
            };

            itemDetails.add(detail);
        };

        return {
            seller = Principal.fromText(input.sellerPrincipal);
            details = Buffer.toArray(itemDetails);
        };
    };

};
