module.exports = class {
    id = null;
    name = null;
    restId = null;
    dish = null;
    rating = null;
    date = null;
    body = null;

    constructor(data) {
        this.id = data.note_id;
        this.userID = data.note_userID;
        this.restID = data.note_restID;
        this.restName = data.restName;
        this.dish = data.note_dish;
        this.rating = data.note_rating;
        this.date = data.note_date;
        this.body = data.note_body;
    }

    toJSON() {
        return {
            id: this.id,
            userID: this.userID,
            restID: this.restID,
            restName: this.restName,
            dish: this.dish,
            rating: this.rating,
            date: this.date,
            body: this.body
        };
    }
};
