import { describe, it, expect, beforeEach } from "vitest";
import { SweetService } from "../services/sweetService";

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
