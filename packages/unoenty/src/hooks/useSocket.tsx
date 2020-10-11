import { useSocketStore } from "@/store/Socket"
import { connectSocket, getPlayerData } from "@/services/socket"

import {
	PlayerData,
	Game,
	PlayerState,
	GameEvents,
	CardColors,
	ChatMessage,
} from "@uno-game/protocols"

const useSocket = (): {
	currentPlayer: PlayerData,
	otherPlayers: PlayerData[],
	getCurrentPlayer: (players?: PlayerData[] | undefined) => PlayerData,
	createGame: () => Promise<Game>,
	joinGame: (gameId: string) => Promise<Game>,
	toggleReady: (gameId: string) => void,
	buyCard: (gameId: string) => void,
	putCard: (gameId: string, cardIds: string[], selectedColor: CardColors) => void,
	toggleOnlineStatus: (gameId: string) => void,
	sendChatMessage: (chatId: string, content: string) => void,
	onGameStart: (fn: () => void) => void,
	onPlayerWon: (fn: (playerId: string, playerName: string) => void) => void,
	onCardStackBuyCardsCombo: (fn: (amountToBuy: number) => void) => void,
	onNewChatMessage: (fn?: () => void) => void,
	onPlayerGotAwayFromKeyboard: (fn: (playerId: string) => void) => void,
	onPlayerStateChange: (fn: (playerState: PlayerState, playerId: string, amountToBuy?: number) => void) => void
	onPong: (fn: (latency: number) => void) => void,
	onReconnect: (fn: () => void) => void,
} => {
	const socketStore = useSocketStore()

	const getCurrentPlayer = (players?: PlayerData[]): PlayerData => {
		const playerId = socketStore.playerId

		const player = (players || socketStore?.game?.players)?.find(player => player.id === playerId)

		return player as PlayerData
	}

	const getOtherPlayers = (): PlayerData[] => {
		const totalPlayers = socketStore?.game?.players?.length as number

		const playerId = socketStore.playerId

		let currentPlayerIndex = socketStore?.game?.players?.
			findIndex(player => player.id === playerId) as number

		if (currentPlayerIndex === -1) {
			currentPlayerIndex = totalPlayers
		}

		const otherPlayersBeforeCurrentPlayer = socketStore?.game?.players?.
			slice(0, currentPlayerIndex)

		const otherPlayersAfterCurrentPlayer = socketStore?.game?.players?.
			slice(currentPlayerIndex + 1, socketStore?.game?.players?.length)

		let otherPlayers = [
			...otherPlayersAfterCurrentPlayer || [],
			...otherPlayersBeforeCurrentPlayer || [],
		]

		/**
		 * Improves layout location
		 */
		if (totalPlayers <= 4) {
			otherPlayers = [
				otherPlayers[0],
				{} as PlayerData,
				otherPlayers[1],
				{} as PlayerData,
				otherPlayers[2],
				{} as PlayerData,
				otherPlayers[3],
			]
		}

		return (otherPlayers || []) as PlayerData[]
	}

	const createGame = async (): Promise<Game> => {
		socketStore.io.emit("CreateGame")

		const game = await new Promise<Game>(resolve => {
			socketStore.io.on("GameCreated", (game: Game) => {
				resolve(game)
			})
		})

		return game
	}

	const joinGame = async (gameId: string): Promise<Game> => {
		socketStore.io.emit("JoinGame", gameId)

		const game = await new Promise<Game>((resolve) => {
			socketStore.io.on("PlayerJoined", resolve)
		})

		socketStore.set({ game })

		return game
	}

	const toggleReady = (gameId: string) => {
		socketStore.io.emit("ToggleReady", gameId)
	}

	const buyCard = (gameId: string) => {
		socketStore.io.emit("BuyCard", gameId)
	}

	const putCard = (gameId: string, cardIds: string[], selectedColor: CardColors) => {
		socketStore.io.emit("PutCard", gameId, cardIds, selectedColor)
	}

	const toggleOnlineStatus = (gameId: string) => {
		socketStore.io.emit("ChangePlayerStatus", gameId, "online")
	}

	const sendChatMessage = (chatId: string, content: string) => {
		socketStore.io.emit("SendChatMessage", chatId, content)
	}

	const onGameStart = (fn: () => void) => {
		socketStore.io.on("GameStarted", fn)
	}

	const onPlayerWon = (fn: (playerId: string, playerName: string) => void) => {
		socketStore.io.on("PlayerWon", fn)
	}

	const onCardStackBuyCardsCombo = (fn: (amountToBuy: number) => void) => {
		socketStore.io.on("CardStackBuyCardsCombo", fn)
	}

	const onNewChatMessage = (fn?: () => void) => {
		socketStore.io.on("NewMessage", (message: ChatMessage) => {
			socketStore.addChatMessage(message)

			if (fn) {
				fn()
			}
		})
	}

	const onPlayerGotAwayFromKeyboard = (fn: (playerId: string) => void) => {
		socketStore.io.on("PlayerGotAwayFromKeyboard", (playerId: string) => {
			fn(playerId)
		})
	}

	const onPlayerStateChange = (fn: (playerState: PlayerState, playerId: string, amountToBuy?: number) => void) => {
		const events: { [key in GameEvents]?: PlayerState } = {
			PlayerUno: "Uno",
			PlayerBlocked: "Blocked",
			PlayerBuyCards: "BuyCards",
		}

		Object.entries(events)
			.forEach(([event, playerState]) => {
				socketStore.io.on(event, (playerId: string, amountToBuy?: number) => {
					if (playerState) {
						fn(playerState, playerId, amountToBuy)
					}
				})
			})
	}

	const onPong = (fn: (latency: number) => void) => {
		socketStore.io.on("pong", fn)
	}

	const onReconnect = (fn: () => void) => {
		socketStore.io.on("reconnect", async () => {
			const playerIdFromRoom = await connectSocket()

			const playerData = await getPlayerData(playerIdFromRoom)

			socketStore.set({
				...socketStore,
				playerId: playerData.id,
			})

			fn()
		})
	}

	return {
		get currentPlayer (): PlayerData {
			return getCurrentPlayer()
		},
		get otherPlayers (): PlayerData[] {
			return getOtherPlayers()
		},
		getCurrentPlayer,
		createGame,
		joinGame,
		sendChatMessage,
		toggleOnlineStatus,
		onGameStart,
		onPlayerWon,
		onPlayerStateChange,
		onCardStackBuyCardsCombo,
		onNewChatMessage,
		onReconnect,
		onPlayerGotAwayFromKeyboard,
		onPong,
		toggleReady,
		buyCard,
		putCard,
	}
}

export default useSocket
