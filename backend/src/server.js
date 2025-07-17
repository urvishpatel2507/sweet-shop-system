import express from "express";
import { SweetService } from "./services/sweetService.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

const sweetService = new SweetService();

// Initialize with sample data
sweetService.addSweet({
  name: "Kaju Katti",
  category: "Nut-Based",
  price: 50,
  quantity: 20,
});
sweetService.addSweet({
  name: "Gajar Halwa",
  category: "Vegetable-Based",
  price: 30,
  quantity: 15,
});
sweetService.addSweet({
  name: "Gulab Jamun",
  category: "Milk-Based",
  price: 10,
  quantity: 50,
});

// API Endpoints
app.get("/api/sweets", (req, res) => {
  res.json(sweetService.getAllSweets());
});

app.get("/api/sweets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const sweet = sweetService.getSweetById(id);
  if (sweet) {
    res.json(sweet);
  } else {
    res.status(404).json({ error: "Sweet not found" });
  }
});

app.post("/api/sweets", (req, res) => {
  try {
    const sweet = sweetService.addSweet(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/sweets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const success = sweetService.deleteSweet(id);
  if (success) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Sweet not found" });
  }
});

//Edit
app.put("/api/sweets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedSweet = sweetService.updateSweet(id, req.body);
  if (updatedSweet) {
    res.json(updatedSweet);
  } else {
    res.status(404).json({ error: "Sweet not found" });
  }
});

//search sweet
// app.get("/api/sweets/search", (req, res) => {
//   const { name, category, minPrice, maxPrice } = req.query;
//   const results = sweetService.searchSweets({
//     name,
//     category,
//     minPrice: minPrice ? parseInt(minPrice) : undefined,
//     maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
//   });
//   res.json(results);
// });
app.get("/api/sweets/search", (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const results = sweetService.searchSweets({
    name,
    category,
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
  });
  res.json(results);
});

//purchase sweet
app.post("/api/sweets/:id/purchase", (req, res) => {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  const sweet = sweetService.purchaseSweet(id, quantity);
  if (!sweet) {
    return res
      .status(404)
      .json({ error: "Sweet not found or insufficient stock" });
  }

  res.json(sweet);
});

//restock
app.post("/api/sweets/:id/restock", (req, res) => {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  const sweet = sweetService.restockSweet(id, quantity);
  if (!sweet) {
    return res.status(404).json({ error: "Sweet not found" });
  }

  res.json(sweet);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
