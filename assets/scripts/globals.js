module.exports = {
    _storage: null,
    _score: 0,

    set storage(storage) {
        this._storage = storage;
        try { 
            const json = JSON.parse(this._storage.getItem('storage'));
            if(json) {
                this._score = json.score;
            }
        } catch(e) {}
    },

    set score(score) {
        this._score = score;
        this.saveStorage();
    },

    get score() {
        return this._score;
    },

    saveStorage() {
        this._storage.setItem('storage', JSON.stringify({
            score: this._score
        }));
    }
};