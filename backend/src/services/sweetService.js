export class SweetService {
  
  // Initialize with an empty array of sweets and a starting ID
  constructor() {
    this.sweets = [];
    this.nextId = 1000;
  }
// Get all sweets
  getAllSweets() {
    return [...this.sweets];
  }

//if sweetData is missing any required fields, throw an error
  addSweet(sweetData) {
    if (
      !sweetData.name ||
      !sweetData.category ||
      sweetData.price == null ||
      sweetData.quantity == null
    ) {
      throw new Error("Missing required sweet fields");
    }
//
    const newSweet = {
      id: ++this.nextId,
      ...sweetData,
    };

    this.sweets.push(newSweet);
    return newSweet;
  }

// Update a sweet by ID
  deleteSweet(id) {
    const initialLength = this.sweets.length;
    this.sweets = this.sweets.filter(sweet => sweet.id !== id);
    return this.sweets.length < initialLength;
  }

  getSweetById(id) {
    return this.sweets.find(s => s.id === id);
  }
  
}
