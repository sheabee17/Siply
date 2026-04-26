const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

/* USERS */
app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

/* ALL CAFES */
app.get("/api/cafes", async (req, res) => {
  const cafes = await prisma.cafe.findMany({
    include: {
      tags: true,
      amenities: true,
      vibes: true,
      images: true,
      reviews: true,
    },
  });

  res.json(cafes);
});

/* SINGLE CAFE */
app.get("/api/cafes/:slug", async (req, res) => {
  const cafe = await prisma.cafe.findUnique({
    where: { slug: req.params.slug },
    include: {
      tags: true,
      amenities: true,
      vibes: true,
      images: true,
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });

  res.json(cafe);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});