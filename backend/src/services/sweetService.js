
export class SweetService {
  constructor() {
    this.sweets = [];
  }

  getAllSweets() {
    return [...this.sweets];
  }
}
