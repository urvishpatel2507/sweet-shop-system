export class SweetService {
  constructor() {
    this.sweets = [];
    this.nextId = 1000;
  }

  getAllSweets() {
    return [...this.sweets];
  }

  addSweet(sweetData) {
    if (
      !sweetData.name ||
      !sweetData.category ||
      sweetData.price == null ||
      sweetData.quantity == null
    ) {
      throw new Error("Missing required sweet fields");
    }

    const newSweet = {
      id: ++this.nextId,
      ...sweetData,
    };

    this.sweets.push(newSweet);
    return newSweet;
  }

   deleteSweet(id) {
    const initialLength = this.sweets.length;
    this.sweets = this.sweets.filter(sweet => sweet.id !== id);
    return this.sweets.length < initialLength;
  }

  getSweetById(id) {
    return this.sweets.find(s => s.id === id);
  }
  
}
