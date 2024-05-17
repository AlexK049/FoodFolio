module.exports = class {
    id = null;
    name = null;
    address = null;
    rating = null;
  
    constructor(data) {
      this.id = data.rest_id;
      this.name = data.rest_name;
      this.address = data.rest_add;
      this.rating = data.rest_rating;
    }

    toJSON() {
        return {
          id: this.id,
          name : this.name,
          address : this.address,
          rating : this.rating,
        }
      }
    }