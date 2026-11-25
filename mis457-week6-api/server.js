const express = require("express");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/api/events", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" }
    });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/events/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid event id" });
    }

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/events", async (req, res) => {
  try {
    const { title, date } = req.body || {};
    if (!title || !date) {
      return res.status(400).json({ error: "title and date are required" });
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date" });
    }

    const event = await prisma.event.create({
      data: { title, date: parsedDate }
    });
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/api/events/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid event id" });
    }

    const found = await prisma.event.findUnique({ where: { id } });
    if (!found) {
      return res.status(404).json({ error: "Event not found" });
    }

    const data = {};
    if (req.body.title) data.title = req.body.title;
    if (req.body.date) {
      const parsedDate = new Date(req.body.date);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "Invalid date" });
      }
      data.date = parsedDate;
    }

    const event = await prisma.event.update({ where: { id }, data });
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid event id" });
    }

    const found = await prisma.event.findUnique({ where: { id } });
    if (!found) {
      return res.status(404).json({ error: "Event not found" });
    }

    await prisma.event.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Events API listening at http://127.0.0.1:${PORT}`);
});
