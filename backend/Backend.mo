actor Backend {
    private var counter: Int = 0;

    public shared(msg) func add(num: Int) {
        counter += num;
    };

    public shared(msg) func increment() {
        counter += 1;
    };

    public shared query(msg) func getCount(): async Int {
        return counter;
    };
}
