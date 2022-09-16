"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.get('/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield prisma.game.findMany();
    return res.status(200).json(games);
}));
app.post('/games', (req, res) => {
    return res.status(201).json([]);
});
app.get('/games/:id/ads', (req, res) => {
    const gameId = Number(req.params.id);
    const allAds = [
        { id: 1, name: 'Anúnico 1' },
        { id: 2, name: 'Anúnico 2' },
        { id: 3, name: 'Anúnico 3' },
        { id: 4, name: 'Anúnico 5' }
    ];
    const selectedAd = allAds.filter(ad => ad.id === gameId);
    return res.status(200).json(selectedAd);
});
app.get('/ads/:id/discord', (req, res) => {
    return res.status(200).json([]);
});
app.listen(3333);
