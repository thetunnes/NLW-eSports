import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/Form/CreateAdModal";

import logo from "./assets/logo-nlw-esports.svg";
import "./styles/main.css";
import { ToastContent } from "./components/Toast";

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
	const [successCreate, setSuccessCreate] = useState(false)
  const [contentToast, setContentToast] = useState({
    type: '',
    text: ''
  })

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((resp) => resp.json())
      .then((data) => setGames(data));
  }, []);

  useEffect(() => {
    if(successCreate) {
      setTimeout(() => {
        setSuccessCreate(false)
      }, 1500)
    }
  }, [successCreate])

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
          <CreateAdModal createdAd={setSuccessCreate} toast={setContentToast} />
        </Dialog.Root>
      </div>
      <ToastContent open={successCreate} content={contentToast}/>
    </div>
  );
}

export default App;
