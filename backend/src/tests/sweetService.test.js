import { describe, it, expect, beforeEach } from "vitest";
import { SweetService } from "../services/sweetService";

describe("SweetService", () => {
  let service;
  let testSweet;

  beforeEach(() => {
    service = new SweetService();
    testSweet = service.addSweet({
      name: "Kaju Katti",
      category: "Nut-Based",
      price: 50,
      quantity: 20,
    });
  });

  //testing add sweet
  describe("SweetService - Add", () => {
    let service;

    // Initialize a new SweetService instance before each test
    beforeEach(() => {
      service = new SweetService();
    });

    // Test to check if we can add a sweet with required fields is fill ir not
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
  describe("SweetService - Delete", () => {
    let service;
    let testSweet;

    beforeEach(() => {
      service = new SweetService();
      testSweet = service.addSweet({
        name: "Kaju Katti",
        category: "Nut-Based",
        price: 50,
        quantity: 20,
      });
    });

    it("should delete an existing sweet", () => {
      const result = service.deleteSweet(testSweet.id);
      expect(result).toBe(true);
      expect(service.getAllSweets()).toHaveLength(0);
    });

    it("should return false when deleting non-existent sweet", () => {
      const result = service.deleteSweet(9999);
      expect(result).toBe(false);
      expect(service.getAllSweets()).toHaveLength(1);
    });
  });

  //update sweet testing
  describe("Update Sweet", () => {
    it("should update an existing sweet", () => {
      const updated = service.updateSweet(testSweet.id, { price: 60 });
      expect(updated.price).toBe(60);
      expect(service.getSweetById(testSweet.id).price).toBe(60);
    });

    it("should return null for non-existent sweet", () => {
      const result = service.updateSweet(9999, { price: 60 });
      expect(result).toBeNull();
    });
  });

  //search sweet testing
  describe("Search Sweets", () => {
    beforeEach(() => {
      service.addSweet({
        name: "Gajar Halwa",
        category: "Vegetable-Based",
        price: 30,
        quantity: 15,
      });
      service.addSweet({
        name: "Gulab Jamun",
        category: "Milk-Based",
        price: 10,
        quantity: 50,
      });
    });

    it("should search by name", () => {
      const results = service.searchSweets({ name: "kaju" });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe("Kaju Katti");
    });

    it("should search by category", () => {
      const results = service.searchSweets({ category: "Milk-Based" });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe("Gulab Jamun");
    });

    it("should search by price range", () => {
      const results = service.searchSweets({ minPrice: 20, maxPrice: 40 });
      expect(results).toHaveLength(2); // Kaju Katti (50) and Gajar Halwa (30)
    });
  });


});
