import { describe, it, expect, beforeEach } from "vitest";
import { SweetService } from "../services/sweetService";

//testing add sweet 
describe("SweetService - Add", () => {
  let service;

  beforeEach(() => {
    service = new SweetService();
  });

  it("should add a sweet with required fields", () => {
    const sweetData = {
      name: "Kaju Katti",
      category: "Nut-Based",
      price: 50,
      quantity: 20,
    };

    const addedSweet = service.addSweet(sweetData);

    expect(addedSweet).toHaveProperty("id");
    expect(addedSweet.name).toBe(sweetData.name);
    expect(service.getAllSweets()).toHaveLength(1);
  });

  it("should throw error when required fields are missing", () => {
    const invalidSweet = { name: "Incomplete Sweet" };
    expect(() => service.addSweet(invalidSweet)).toThrow();
  });
  
});

//testing delet sweet

describe('SweetService - Delete', () => {
  let service;
  let testSweet;

  beforeEach(() => {
    service = new SweetService();
    testSweet = service.addSweet({
      name: 'Kaju Katti',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    });
  });

  it('should delete an existing sweet', () => {
    const result = service.deleteSweet(testSweet.id);
    expect(result).toBe(true);
    expect(service.getAllSweets()).toHaveLength(0);
  });

  it('should return false when deleting non-existent sweet', () => {
    const result = service.deleteSweet(9999);
    expect(result).toBe(false);
    expect(service.getAllSweets()).toHaveLength(1);
  });
});