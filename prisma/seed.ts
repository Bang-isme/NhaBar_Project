import { PrismaClient, EventStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ARTISTS = [
  { stageName: "PINTEERROR", role: "DJ" },
  { stageName: "RHIN", role: "DJ" },
  { stageName: "RECKO", role: "DJ" },
  { stageName: "WALA", role: "Rapper" },
  { stageName: "LEMWAI", role: "Rapper" },
  { stageName: "RINGO", role: "Rapper" },
  { stageName: "LOCKIE", role: "Rapper" },
  { stageName: "KAYTEE", role: "Guest" },
  { stageName: "NICC", role: "Rapper" },
  { stageName: "ICY MENG", role: "Rapper" },
  { stageName: "LIL BOY", role: "Rapper" },
] as const;

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@nhabar.local" },
    update: {},
    create: {
      email: "admin@nhabar.local",
      passwordHash,
      displayName: "NHÀ Bar Admin",
      role: "ADMIN",
    },
  });

  const artists = [];
  for (const artist of ARTISTS) {
    const row = await prisma.artist.upsert({
      where: { stageName: artist.stageName },
      update: {},
      create: {
        stageName: artist.stageName,
        bio: `${artist.stageName} — ${artist.role} tại NHÀ Bar nights.`,
      },
    });
    artists.push({ ...row, defaultRole: artist.role });
  }

  const jumpOut = await prisma.event.upsert({
    where: { slug: "jump-out-da-house-rapshow" },
    update: {
      isFeatured: false,
      status: EventStatus.published,
      description:
        "Freestyle Rap Battle & Rap Show by Midside Hustlers. Năng lượng urban, lineup dày, sàn NHÀ rung.",
      posterUrl: "/posters/jump-out.svg",
      collaborator: "By Midside Hustlers",
    },
    create: {
      slug: "jump-out-da-house-rapshow",
      title: "JUMP OUT DA HOUSE // RAPSHOW",
      description:
        "Freestyle Rap Battle & Rap Show by Midside Hustlers. Năng lượng urban, lineup dày, sàn NHÀ rung.",
      startsAt: new Date("2026-07-10T19:00:00+07:00"),
      status: EventStatus.published,
      isFeatured: false,
      collaborator: "By Midside Hustlers",
      posterUrl: "/posters/jump-out.svg",
      createdById: admin.id,
    },
  });

  const lateSession = await prisma.event.upsert({
    where: { slug: "nha-late-session-aug" },
    update: {
      isFeatured: true,
      status: EventStatus.published,
      description:
        "Late session — beats, pours, and warm lights. Đêm chill tại nhà.",
      posterUrl: "/posters/late-session.svg",
    },
    create: {
      slug: "nha-late-session-aug",
      title: "NHÀ LATE SESSION",
      description:
        "Late session — beats, pours, and warm lights. Đêm chill tại nhà.",
      startsAt: new Date("2026-08-08T21:00:00+07:00"),
      status: EventStatus.published,
      isFeatured: true,
      collaborator: "NHÀ Residents",
      posterUrl: "/posters/late-session.svg",
      createdById: admin.id,
    },
  });

  const worldCupNight = await prisma.event.upsert({
    where: { slug: "world-cup-watch-night" },
    update: {
      status: EventStatus.published,
      description:
        "Xem World Cup cùng nhà — màn lớn, đồ uống, promo Buy 2 Get 1.",
      posterUrl: "/posters/world-cup.svg",
    },
    create: {
      slug: "world-cup-watch-night",
      title: "WORLD CUP WATCH NIGHT",
      description:
        "Xem World Cup cùng nhà — màn lớn, đồ uống, promo Buy 2 Get 1.",
      startsAt: new Date("2026-08-22T18:30:00+07:00"),
      status: EventStatus.published,
      isFeatured: false,
      collaborator: "NHÀ Bar",
      posterUrl: "/posters/world-cup.svg",
      createdById: admin.id,
    },
  });

  await prisma.event.upsert({
    where: { slug: "acoustic-in-nha" },
    update: {
      status: EventStatus.published,
      description:
        "Unplugged night — live set mộc, đèn ấm, ngồi gần sân khấu.",
      posterUrl: "/posters/acoustic-night.svg",
      collaborator: "Mộc Band",
    },
    create: {
      slug: "acoustic-in-nha",
      title: "ACOUSTIC IN NHÀ",
      description:
        "Unplugged night — live set mộc, đèn ấm, ngồi gần sân khấu.",
      startsAt: new Date("2026-08-15T20:00:00+07:00"),
      endsAt: new Date("2026-08-15T23:30:00+07:00"),
      status: EventStatus.published,
      isFeatured: false,
      collaborator: "Mộc Band",
      posterUrl: "/posters/acoustic-night.svg",
      createdById: admin.id,
    },
  });

  // Hidden/draft should never appear on public list
  await prisma.event.upsert({
    where: { slug: "secret-draft-show" },
    update: { status: EventStatus.draft },
    create: {
      slug: "secret-draft-show",
      title: "SECRET DRAFT SHOW",
      description: "Should not be public.",
      startsAt: new Date("2026-09-01T20:00:00+07:00"),
      status: EventStatus.draft,
      isFeatured: false,
      createdById: admin.id,
    },
  });

  await prisma.eventArtist.deleteMany({ where: { eventId: jumpOut.id } });
  for (const [index, artist] of artists.entries()) {
    await prisma.eventArtist.create({
      data: {
        eventId: jumpOut.id,
        artistId: artist.id,
        roleLabel: artist.defaultRole,
        sortOrder: index + 1,
      },
    });
  }

  await prisma.eventArtist.deleteMany({ where: { eventId: lateSession.id } });
  for (const [index, artist] of artists.slice(0, 4).entries()) {
    await prisma.eventArtist.create({
      data: {
        eventId: lateSession.id,
        artistId: artist.id,
        roleLabel: artist.defaultRole,
        sortOrder: index + 1,
      },
    });
  }

  await prisma.mediaAsset.deleteMany({ where: { eventId: jumpOut.id } });
  const gallery = [
    { url: "/gallery/night-01.svg", altText: "Crowd under warm lights" },
    { url: "/gallery/night-02.svg", altText: "DJ booth at NHÀ Bar" },
    { url: "/gallery/night-03.svg", altText: "Cocktail on the bar" },
  ];
  for (const [index, media] of gallery.entries()) {
    await prisma.mediaAsset.create({
      data: {
        eventId: jumpOut.id,
        url: media.url,
        altText: media.altText,
        sortOrder: index + 1,
        uploadedById: admin.id,
      },
    });
  }

  await prisma.mediaAsset.deleteMany({ where: { eventId: lateSession.id } });
  await prisma.mediaAsset.create({
    data: {
      eventId: lateSession.id,
      url: "/gallery/night-02.svg",
      altText: "Late session mood",
      sortOrder: 1,
      uploadedById: admin.id,
    },
  });

  await prisma.promotion.deleteMany({
    where: {
      title: {
        in: [
          "World Cup 2026",
          "House Pour Special",
          "Expired Promo",
          "BUY 2 GET 1 - WATCH NIGHT",
          "HAPPY HOUR 16:00–19:00",
        ],
      },
    },
  });

  const buy2Get1 = await prisma.promotion.create({
    data: {
      title: "BUY 2 GET 1 - WATCH NIGHT",
      description:
        "Áp dụng tối xem bóng / late session. Hỏi bartender khi order.",
      isActive: true,
      startsAt: new Date("2026-06-01T00:00:00+07:00"),
      endsAt: new Date("2026-12-31T23:59:00+07:00"),
      bannerUrl: "/posters/world-cup.svg",
      createdById: admin.id,
    },
  });

  const happyHour = await prisma.promotion.create({
    data: {
      title: "HAPPY HOUR 16:00–19:00",
      description: "Selected drinks giảm – chill trước khi sàn bật.",
      isActive: true,
      startsAt: new Date("2026-07-01T00:00:00+07:00"),
      endsAt: null,
      bannerUrl: "/posters/late-session.svg",
      createdById: admin.id,
    },
  });

  await prisma.promotion.create({
    data: {
      title: "Expired Promo",
      description: "Should not show.",
      isActive: false,
      startsAt: new Date("2026-01-01T00:00:00+07:00"),
      endsAt: new Date("2026-02-01T00:00:00+07:00"),
      createdById: admin.id,
    },
  });

  await prisma.eventPromotion.deleteMany({
    where: {
      OR: [
        { eventId: lateSession.id },
        { eventId: worldCupNight.id },
      ],
    },
  });

  await prisma.eventPromotion.createMany({
    data: [
      { eventId: lateSession.id, promotionId: happyHour.id },
      { eventId: lateSession.id, promotionId: buy2Get1.id },
      { eventId: worldCupNight.id, promotionId: buy2Get1.id },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
