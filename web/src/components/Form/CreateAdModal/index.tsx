import { FormEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import axios from 'axios'
import { Check, GameController } from "phosphor-react";
import { Input } from "../Input";

interface Game {
	id: string;
	title: string;
}

interface Props {
	createdAd: (open: boolean) => void;
	toast: (msg: { type: string, text: string}) => void;
}

export function CreateAdModal({ createdAd, toast }: Props) {
	const [games, setGames] = useState<Game[]>([]);
	const [weekDays, setWeekDays] = useState<string[]>([])

	function handleCreateAd(e: FormEvent) {
		e.preventDefault()
	
		const formData = new FormData(e.target as HTMLFormElement)
		const data = Object.fromEntries(formData)

		try {
			const body = {
				name: data.name,
				yearsPlaying: Number(data.yearsPlaying),
				discord: data.discord,
				hourStart: data.hourStart,
				hourEnd: data.hourEnd,
				useVoiceChannel: data?.useVoiceChannel ? true : false,
				weekDays: weekDays.map(day => Number(day))
			}

			if (!data.name) {
				throw new Error('Campos vazio foram encontrados ')
			}
			
	
			axios.post(`http://localhost:3333/games/${data.game}/ads`, {
				...body
			})

			createdAd(true)
			toast({
				type: 'success',
				text: 'Anúncio criado com sucesso!'
			})

		} catch (error) {
			console.log(error)
			createdAd(true)
			toast({
				type: 'error',
				text: 'Houve um problema na criação do anúncio, revise os dados inserido.'
			})
		}
	}

	useEffect(() => {
		axios("http://localhost:3333/games")
			.then(resp => setGames(resp.data));
	}, []);

	return (
		<Dialog.Portal>
			<Dialog.Overlay className="bg-black/60 inset-0 fixed" />
			<Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black">
				<Dialog.Title className="text-3xl font-black">
					Publique um anúncio
				</Dialog.Title>

				<form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label htmlFor="game" className="font-semibold">
							Qual o game
						</label>
						<Select.Root name="game">
							<Select.Trigger className="w-full flex justify-between bg-zinc-900 text-white py-3 px-4 rounded">
								<Select.Value placeholder="Selecione o game que deseja jogar" />
								<Select.Icon />
							</Select.Trigger>

							<Select.Portal className="w-full text-left bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500">
								<Select.Content>
									<Select.Viewport className="flex flex-col gap-3">
										{games.map((game) => (
											<Select.Item key={game.id} value={game.id} className="cursor-pointer text-zinc-500 hover:text-white">
												<Select.ItemText>{game.title}</Select.ItemText>
												<Select.ItemIndicator></Select.ItemIndicator>
											</Select.Item>

										))}
									</Select.Viewport>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="name" className="font-semibold">
							Seu nome (ou nickname)
						</label>
						<Input id="name" name="name" placeholder="Como te chamam dentro do game?" />
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col gap-2">
							<label htmlFor="yearsPlaying" className="font-semibold">
								Joga há quantos anos?
							</label>
							<Input
								id="yearsPlaying"
								name="yearsPlaying"
								type="number"
								placeholder="Tudo bem ser ZERO"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="discord" className="font-semibold">
								Qual o seu Discord?
							</label>
							<Input id="discord" name="discord" type="text" placeholder="Usuario#0000" />
						</div>
					</div>

					<div className="flex gap-6">
						<div className="w-1/2 flex flex-col gap-2">
							<label htmlFor="weekDays" className="font-semibold">
								Quando costuma jogar?
							</label>
							<ToggleGroup.Root type="multiple" className="flex gap-4 grow flex-wrap" value={weekDays} onValueChange={setWeekDays}>
								<ToggleGroup.Item value="7" className={`w-8 h-8 ${weekDays.includes('7') ? 'bg-violet-500' : 'bg-zinc-900'} text-sm font-semibold`}>D</ToggleGroup.Item>
								<ToggleGroup.Item value="1" className={`w-8 h-8 ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'} text-sm font-semibold`}>S</ToggleGroup.Item>
								<ToggleGroup.Item value="2" className={`w-8 h-8 ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'} text-sm font-semibold`}>T</ToggleGroup.Item>
								<ToggleGroup.Item value="3" className={`w-8 h-8 ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'} text-sm font-semibold`}>Q</ToggleGroup.Item>
								<ToggleGroup.Item value="4" className={`w-8 h-8 ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'} text-sm font-semibold`}>Q</ToggleGroup.Item>
								<ToggleGroup.Item value="5" className={`w-8 h-8 ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'} text-sm font-semibold`}>S</ToggleGroup.Item>
								<ToggleGroup.Item value="6" className={`w-8 h-8 ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'} text-sm font-semibold`}>S</ToggleGroup.Item>
							</ToggleGroup.Root>
						</div>

						<div className="flex-1 flex flex-col gap-2">
							<label htmlFor="discord" className="font-semibold">
								Qual horário do dia?
							</label>
							<div className="flex gap-2 justify-between">
								<Input
									className="flex-1"
									id="hourStart"
									name="hourStart"
									type="time"
									placeholder="De:"
								/>
								<Input
									className="flex-1"
									id="hourEnd"
									name="hourEnd"
									type="time"
									placeholder="Até:"
								/>
							</div>
						</div>
					</div>

					<div className="mt-2 flex items-center gap-2 text-sm">
						<Checkbox.Root name="useVoiceChannel" className="w-6 h-6 p-1 rounded bg-zinc-900">
							<Checkbox.Indicator>
								<Check className="w-4 h-4 text-emerald-400" />
							</Checkbox.Indicator>
						</Checkbox.Root>
						<label htmlFor="useVoiceChannel">Costumo me conectar com voz</label>
					</div>

					<footer className="mt-4 flex justify-end gap-4">
						<Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
							Cancelar
						</Dialog.Close>
						<button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
							<GameController size={24} />
							Encontrar duo
						</button>
					</footer>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	);
}
