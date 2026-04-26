const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slugify = require("slugify");

async function main() {
  // Delete dependent records first
  await prisma.review.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.cafeImage.deleteMany();
  await prisma.vibe.deleteMany();
  await prisma.cafe.deleteMany();
  await prisma.user.deleteMany();
  await prisma.review.deleteMany();
  console.log("Cleared DB");

  // USERS
  const user1 = await prisma.user.create({
    data: { name: "John", email: "john@test.com", age: 22, password: "123" },
  });

  const user2 = await prisma.user.create({
    data: { name: "Jane", email: "jane@test.com", age: 25, password: "123" },
  });

  // CAFES
  const cafe = await prisma.cafe.create({
    data: {
      name: "The Daily Grind",
      slug: slugify("The Daily Grind"),
      rating: 4.8,
      description: "A cozy, modern neighborhood coffee shop with warm lighting, natural wood accents, and plenty of greenery. The atmosphere is calm and welcoming, with soft background music. Free high-speed Wi-Fi (around 120-170 Mbps) is reliable even during busy hours.",
      address: "123 Brew St, Downtown",
      crossStreet: "Broadway & 4th",
      openHours: "07:00 - 19:00",
      wifiSpeed: "143 Mbps",
      powerOutlets: "Many",
      noiseLevel: "Quiet",

      tags: {
        create: [
          { label: "#cozy" },
          { label: "#natural" },
        ],
      },

      amenities: {
        create: [
          { label: "WALKING DISTANCE" },
          { label: "SPECIALTY DRINKS" },
          { label: "POWER OUTLETS" },
          { label: "WHEELCHAIR ACCESSIBLE" },
          { label: "BATHROOM AVAILABILITY"},
          { label: "ALLERGEN FRIENDLY" },
        ],
      },

      vibes: {
        create: [
            { label: "VARIETY OF SEATING", icon: "chair" },
            { label: "NATURAL/DIM LIGHTING", icon: "light-mode" },
            { label: "POWER OUTLETS", icon: "outlet" },
            { label: "MEALS + DRINKS", icon: "restaurant" },
            { label: "STUDENT DISCOUNTS", icon: "assignment-ind" },
            { label: "NUTRITION FOCUSED", icon: "spa" },
        ],
      },

      images: {
        create: [
          { url: "https://s.hdnux.com/photos/01/34/02/75/24129403/5/rawImage.jpg" },
          { url: "https://tb-static.uber.com/prod/image-proc/processed_images/e7c5333ea109c7ad1238fd86292ae93e/c9252e6c6cd289c588c3381bc77b1dfc.jpeg" },
          { url: "https://s.hdnux.com/photos/01/34/02/75/24129405/5/1920x0.jpg" },
          { url: "https://s.hdnux.com/photos/01/34/02/76/24129409/5/rawImage.jpg"},
        ],
      },
    },
  });
  console.log('Seed Complete');
  console.log('Cafe Slug:', cafe.slug);
  
  const cafe2 = await prisma.cafe.create({
    data: {
      name: "Brew and Co",
      slug: slugify("Brew and Co"),
      rating: 4.5,
      description: "A laid-back, sun-soaked cafe with terracotta tones, lush patio seating, and the kind of unhurried energy that makes an hour feel like five minutes. Local art lines the walls, the music skews indie and eclectic, and the menu leans into bold, locally sourced flavors. Wi-Fi is available and reliable, but most regulars come here to unplug and soak in the atmosphere.",
      address: "456 Bean Ave, Midtown",
      crossStreet: "Main & 5th",
      openHours: "08:00 - 20:00",
      wifiSpeed: "100 Mbps",
      powerOutlets: "Some",
      noiseLevel: "Moderate",

      tags: {
        create: [
          { label: "#modern" },
          { label: "#colorful" },
        ],
      },

      amenities: {
        create: [
          { label: "BUS DISTANCE" },
          { label: "SPECIALTY DRINKS" },
          { label: "POWER OUTLETS" },
          { label: "OUTDOOR SEATING" },
          { label: "BATHROOM AVAILABILITY"},
          { label: "DIETARY OPTIONS" },
        ],
      },

      vibes: {
        create: [
            { label: "VARIETY OF SEATING", icon: "chair" },
            { label: "NATURAL LIGHTING", icon: "light-mode" },
            { label: "POWER OUTLETS", icon: "outlet" },
            { label: "MEALS + DRINKS", icon: "restaurant" },
            { label: "COLORFUL DECOR", icon: "palette" },
            { label: "CHILL VIBES", icon: "mood" },
        ],
      },

      images: {
        create: [
          { url: "https://i0.wp.com/www.twentysomethingsa.com/wp-content/uploads/2020/09/extra-fine-san-antonio-twenty-something-sa-796x1024.jpg?resize=796%2C1024" },
          { url: "https://s3-media0.fl.yelpcdn.com/bphoto/LHivBvWjs2d6CzVUpXEPBw/348s.jpg" },
          { url: "https://s3-media0.fl.yelpcdn.com/bphoto/Clcc-cYpDUXsLNzSl4036Q/258s.jpg" },
          { url: "https://pub-ba1a74be17d7442a9f2541946eb9510e.r2.dev/shops/b054fa4e-7e12-476a-a272-e6aab27dc454/0.jpg"},
        ],
      },
    },
  });
  
  console.log('Seed Complete');
  console.log('Cafe2 Slug:', cafe2.slug);

  // REVIEWS
  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        comment: "Amazing coffee and vibe!",
        userId: user1.id,
        cafeId: cafe.id,
      },
      {
        rating: 4,
        comment: "Great place to work.",
        userId: user2.id,
        cafeId: cafe.id,
      },
      {
        rating: 4.5,
        comment: "Love the outdoor seating!",
        userId: user1.id,
        cafeId: cafe2.id,
      },
    ],
  });  
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());