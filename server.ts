import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { DatabaseState, Product, GalleryItem, Testimonial, Service, Inquiry, ContactInfo, HomeSlide } from "./src/types.js";

// Helper to safely read and write database
const DB_PATH = path.join(process.cwd(), "db.json");

function readDB(): DatabaseState {
  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, "utf-8");
      return JSON.parse(content) as DatabaseState;
    }
  } catch (error) {
    console.error("Failed to read db.json, returning empty structure", error);
  }
  return {
    homeSlides: [],
    services: [],
    products: [],
    categories: [],
    gallery: [],
    testimonials: [],
    contactInfo: {
      address: "",
      phone: "",
      email: "",
      workingHours: "",
      mapUrl: "",
      whatsappNumber: ""
    },
    inquiries: []
  };
}

function writeDB(data: DatabaseState): boolean {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Failed to write db.json", error);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to support JSON body parsing
  app.use(express.json({ limit: "20mb" }));

  // API Endpoints

  // Get full state
  app.get("/api/state", (req, res) => {
    res.json(readDB());
  });

  // PRODUCTS API
  app.post("/api/products", (req, res) => {
    const db = readDB();
    const newProduct: Product = {
      id: "prod-" + Date.now(),
      name: req.body.name || "Unnamed Product",
      category: req.body.category || "Uncategorized",
      image: req.body.image || "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
      shortDesc: req.body.shortDesc || "",
      description: req.body.description || "",
      rating: Number(req.body.rating) || 5,
      features: Array.isArray(req.body.features) ? req.body.features : [],
      specifications: req.body.specifications || {},
      trending: Boolean(req.body.trending),
      newest: Boolean(req.body.newest)
    };
    db.products.push(newProduct);
    writeDB(db);
    res.status(201).json(newProduct);
  });

  app.put("/api/products/:id", (req, res) => {
    const db = readDB();
    const index = db.products.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Product not found" });
    }
    const updated = {
      ...db.products[index],
      ...req.body,
      id: req.params.id // lock ID
    };
    db.products[index] = updated;
    writeDB(db);
    res.json(updated);
  });

  app.delete("/api/products/:id", (req, res) => {
    const db = readDB();
    db.products = db.products.filter((p) => p.id !== req.params.id);
    writeDB(db);
    res.json({ success: true, message: `Product ${req.params.id} deleted` });
  });

  // CATEGORIES API
  app.post("/api/categories", (req, res) => {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ error: "Category name required" });
    }
    const db = readDB();
    if (!db.categories.includes(category)) {
      db.categories.push(category);
      writeDB(db);
    }
    res.json(db.categories);
  });

  app.delete("/api/categories", (req, res) => {
    const { category } = req.body;
    const db = readDB();
    db.categories = db.categories.filter((c) => c !== category);
    writeDB(db);
    res.json(db.categories);
  });

  // GALLERY API
  app.post("/api/gallery", (req, res) => {
    const db = readDB();
    const newItem: GalleryItem = {
      id: "gal-" + Date.now(),
      image: req.body.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
      title: req.body.title || "Gallery Photo",
      category: req.body.category || "General"
    };
    db.gallery.push(newItem);
    writeDB(db);
    res.status(201).json(newItem);
  });

  app.delete("/api/gallery/:id", (req, res) => {
    const db = readDB();
    db.gallery = db.gallery.filter((g) => g.id !== req.params.id);
    writeDB(db);
    res.json({ success: true, message: "Gallery image removed" });
  });

  // TESTIMONIALS API
  app.post("/api/testimonials", (req, res) => {
    const db = readDB();
    const newTestimonial: Testimonial = {
      id: "tst-" + Date.now(),
      name: req.body.name || "Anonymous",
      designation: req.body.designation || "Healthcare Client",
      image: req.body.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
      reviewText: req.body.reviewText || "",
      rating: Number(req.body.rating) || 5
    };
    db.testimonials.push(newTestimonial);
    writeDB(db);
    res.status(201).json(newTestimonial);
  });

  app.put("/api/testimonials/:id", (req, res) => {
    const db = readDB();
    const index = db.testimonials.findIndex((t) => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Testimonial not found" });
    db.testimonials[index] = { ...db.testimonials[index], ...req.body, id: req.params.id };
    writeDB(db);
    res.json(db.testimonials[index]);
  });

  app.delete("/api/testimonials/:id", (req, res) => {
    const db = readDB();
    db.testimonials = db.testimonials.filter((t) => t.id !== req.params.id);
    writeDB(db);
    res.json({ success: true });
  });

  // SERVICES API
  app.post("/api/services", (req, res) => {
    const db = readDB();
    const newService: Service = {
      id: "srv-" + Date.now(),
      title: req.body.title || "New Service",
      description: req.body.description || "",
      iconName: req.body.iconName || "Activity"
    };
    db.services.push(newService);
    writeDB(db);
    res.status(201).json(newService);
  });

  app.put("/api/services/:id", (req, res) => {
    const db = readDB();
    const index = db.services.findIndex((s) => s.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Service not found" });
    db.services[index] = { ...db.services[index], ...req.body, id: req.params.id };
    writeDB(db);
    res.json(db.services[index]);
  });

  app.delete("/api/services/:id", (req, res) => {
    const db = readDB();
    db.services = db.services.filter((s) => s.id !== req.params.id);
    writeDB(db);
    res.json({ success: true });
  });

  // SLIDERS API
  app.put("/api/slides", (req, res) => {
    const db = readDB();
    db.homeSlides = req.body;
    writeDB(db);
    res.json(db.homeSlides);
  });

  // CONTACT INFO API
  app.put("/api/contact", (req, res) => {
    const db = readDB();
    db.contactInfo = { ...db.contactInfo, ...req.body };
    writeDB(db);
    res.json(db.contactInfo);
  });

  // INQUIRIES API
  app.post("/api/inquiries", (req, res) => {
    const db = readDB();
    const newInquiry: Inquiry = {
      id: "inq-" + Date.now(),
      name: req.body.name || "Anonymous",
      email: req.body.email || "",
      mobile: req.body.mobile || "",
      product: req.body.product || "General Enquiry",
      feedback: req.body.feedback || "",
      date: new Date().toISOString(),
      attended: false
    };
    db.inquiries.push(newInquiry);
    writeDB(db);
    res.status(201).json(newInquiry);
  });

  app.put("/api/inquiries/:id", (req, res) => {
    const db = readDB();
    const index = db.inquiries.findIndex((i) => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Inquiry not found" });
    db.inquiries[index].attended = Boolean(req.body.attended);
    writeDB(db);
    res.json(db.inquiries[index]);
  });

  app.delete("/api/inquiries/:id", (req, res) => {
    const db = readDB();
    db.inquiries = db.inquiries.filter((i) => i.id !== req.params.id);
    writeDB(db);
    res.json({ success: true });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "localhost", () => {
    console.log(`Vel Bio Med Server running on http://localhost:${PORT}`);
  });
}

startServer();
