import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convertHourToMinutes";
import { convertMinutesToHourString } from "./utils/convertMinutesToHour";

const app = express();

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/games", async (req, res) => {

  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  console.log(games);

  return res.status(200).json(games);
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return res.status(201).send("Seu anúncio foi criado com sucesso!");
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      hourEnd: true,
      hourStart: true,
      useVoiceChannel: true,
      yearsPlaying: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(
    ads.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd)
    }))
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;
  const { discord } = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return res.status(200).json({ discord });
});

app.listen(3333);
