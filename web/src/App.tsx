import { useState, useEffect, useMemo } from "react";
import "./styles/main.css";

import logo from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "./components/Form/Input";
import { GameController } from "phosphor-react";

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((resp) => resp.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto my-20 flex flex-col items-center">
      <img src={logo} />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className={`grid grid-cols-6 gap-6 mt-16`}>
        {games.map((game) => (
          <GameBanner
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
            key={game.id}
          />
        ))}
      </div>

      <div className="mt-8 pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
        <Dialog.Root>
          <CreateAdBanner />
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black">
              <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">
                    Qual o game
                  </label>
                  <Input id="game" placeholder="Selecione o game que deseja jogar" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">
                    Seu nome (ou nickname)
                  </label>
                  <Input id="name" placeholder="Como te chamam dentro do game?" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
                    <Input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord" className="font-semibold">Qual o seu Discord?</label>
                    <Input id="discord" type="text" placeholder="Usuario#0000" />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-1/2 flex flex-col gap-2">
                    <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>
                    <div className="flex gap-4 grow flex-wrap ">
                      <button className="w-8 h-8 bg-zinc-900 text-sm font-semibold">D</button>
                      <button className="w-8 h-8 bg-zinc-900 text-sm font-semibold">S</button>
                      <button className="w-8 h-8 bg-zinc-900 text-sm font-semibold">T</button>
                      <button className="w-8 h-8 bg-zinc-900 text-sm font-semibold">Q</button>
                      <button className="w-8 h-8 bg-zinc-900 text-sm font-semibold">Q</button>
                      <button className="w-8 h-8 bg-zinc-900 text-sm font-semibold">S</button>
                      <button className="w-8 h-8 bg-zinc-900 text-sm font-semibold">S</button>

                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <label htmlFor="discord" className="font-semibold">Qual horário do dia?</label>
                    <div className="flex gap-2 justify-between">
                    <Input className="flex-1" id="hourStart" type="time" placeholder="De:" />
                    <Input className="flex-1" id="hourEnd" type="time" placeholder="Até:" />
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex gap-2 text-sm">
                  <input type="checkbox" id="useVoiceChannel" />
                  <label htmlFor="useVoiceChannel">Costumo me conectar com voz</label>
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                  <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"><GameController size={24} />Encontrar duo</button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}

export default App;
