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
    const newSweet = {
      id: ++this.nextId,
      ...sweetData,
    };

    this.sweets.push(newSweet);
    return newSweet;
  }

  deleteSweet(id) {
    const initialLength = this.sweets.length;
    this.sweets = this.sweets.filter((sweet) => sweet.id !== id);
    return this.sweets.length < initialLength;
  }
  getSweetById(id) {
    return this.sweets.find((s) => s.id === id);
  }

  //update sweet
  updateSweet(id, updateData) {
    const sweetIndex = this.sweets.findIndex((s) => s.id === id);
    if (sweetIndex === -1) return null;

    this.sweets[sweetIndex] = {
      ...this.sweets[sweetIndex],
      ...updateData,
    };

    return this.sweets[sweetIndex];
  }

  //update sweet searching testing
  searchSweets({ name, category, minPrice, maxPrice }) {
    return this.sweets.filter((sweet) => {
      const nameMatch = name
        ? sweet.name.toLowerCase().includes(name.toLowerCase())
        : true;
      const categoryMatch = category
        ? sweet.category.toLowerCase() === category.toLowerCase()
        : true;
      const minPriceMatch = minPrice ? sweet.price >= minPrice : true;
      const maxPriceMatch = maxPrice ? sweet.price <= maxPrice : true;

      return nameMatch && categoryMatch && minPriceMatch && maxPriceMatch;
    });
  }

  //sorted sweet testing
  sortSweets(sortBy, sortOrder = "asc") {
    const sorted = [...this.sweets];

    sorted.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    return sorted;
  }

  purchaseSweet(id, quantity) {
    const sweet = this.getSweetById(id);
    if (!sweet) throw new Error("Sweet not found");
    if (sweet.quantity < quantity) throw new Error("Insufficient stock");

    sweet.quantity -= quantity;
    return sweet;
  }
}
