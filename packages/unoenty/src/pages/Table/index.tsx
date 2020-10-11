import React, { useState, ReactElement } from "react"
import { Grid, Button } from "@material-ui/core"
import { useParams, useHistory } from "react-router-dom"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"

import { useSocketStore } from "@/store/Socket"

import useDidMount from "@/hooks/useDidMount"
import useSocket from "@/hooks/useSocket"

import useStyles from "@/pages/Table/styles"

import { LoadingComponent, Alert, Divider } from "@/components"

import Device from "@/utils/device"

import CardStack from "@/pages/Table/CardStack"
import CardDeck from "@/pages/Table/CardDeck"
import CardDeckPlaceholder from "@/pages/Table/CardDeckPlaceholder"
import CustomCardDragPreview from "@/pages/Table/CustomCardDragPreview"
import Latency from "@/pages/Table/Latency"
import TableChat from "@/pages/Table/TableChat"

import CardProvider from "@/store/Card"

import TableSkeleton from "@/skeletons/Table"

import { CardColors, CardData, Game } from "@uno-game/protocols"

const Table = (): ReactElement => {
	const { gameId } = useParams<{ gameId: string }>()
	const history = useHistory()

	const socketStore = useSocketStore()
	const socket = useSocket()
	const classes = useStyles()

	const [loadingTable, setLoadingTable] = useState(true)

	const buyCard = () => {
		socket.buyCard(gameId)
	}

	const onDrop = (cardIds: string[], selectedColor: CardColors) => {
		socket.putCard(gameId, cardIds, selectedColor)
	}

	const openWaitForRetryModal = () => {
		Alert.warning({
			title: "Waiting",
			message: "Waiting for other players to click on retry button...",
			closable: false,
		})

		socket.onGameStart(() => {
			Alert.close()
		})
	}

	const toggleRetry = () => {
		socket.toggleReady(gameId)
		socket.toggleOnlineStatus(gameId)

		openWaitForRetryModal()
	}

	const openRequestRetryModal = () => {
		Alert.success({
			message: "In case you want to keep on playing, click on 'READY?' button...",
			title: "Retry",
			closeButtonText: "QUIT",
			onClose: () => {
				window.location.href = "/"
			},
			customButtons: [
				<Button
					fullWidth
					color="primary"
					variant="contained"
					onClick={toggleRetry}
				>
					READY?
				</Button>,
			],
		})
	}

	const joinGame = async () => {
		const game = await socket.joinGame(gameId)

		const currentPlayer = socket.getCurrentPlayer(game.players)

		if (game.status === "ended") {
			if (!currentPlayer || currentPlayer?.ready === true) {
				openWaitForRetryModal()
			} else if (currentPlayer?.ready === false) {
				openRequestRetryModal()
			} else {
				history.push("/")
			}
		}

		setLoadingTable(false)
	}

	const onPlayerWon = () => {
		if (socket.currentPlayer?.status === "afk") {
			return toggleRetry()
		}

		socket.onPlayerWon((_, playerName: string) => {
			Alert.success({
				message: `${playerName} won the game!`,
				title: `${playerName} won!`,
				closeButtonText: "QUIT",
				onClose: () => {
					window.location.href = "/"
				},
				customButtons: [
					<Button
						fullWidth
						color="primary"
						variant="contained"
						onClick={toggleRetry}
					>
						READY?
					</Button>,
				],
			})
		})
	}

	const setupTable = () => {
		joinGame()
		onPlayerWon()
	}

	const onReconnect = () => {
		socket.onReconnect(() => setupTable())
	}

	useDidMount(() => {
		setupTable()
		onReconnect()
	})

	return (
		<LoadingComponent
			loading={loadingTable}
			customLoadingElement={<TableSkeleton />}
		>
			<>
				<TableChat />

				<CardProvider>
					<DndProvider
						backend={Device.isTouchDevice ? (
							TouchBackend
						) : (
							HTML5Backend
						)}
					>
						<Grid
							container
							style={{
								height: "100%",
								overflow: "hidden",
								padding: "16px",
								userSelect: "none",
							}}
						>
							<Grid container>
								<Grid item xs={2}>
									<CardDeckPlaceholder
										cards={socket.otherPlayers?.[1]?.handCards}
										player={socket.otherPlayers?.[1]}
										transform="rotate(135deg)"
									/>
								</Grid>
								<Grid item xs={8}>
									<Grid container justify="center" alignItems="center">
										<CardDeckPlaceholder
											cards={socket.otherPlayers?.[2]?.handCards}
											player={socket.otherPlayers?.[2]}
											transform="rotate(180deg)"
										/>
									</Grid>
								</Grid>
								<Grid item xs={2}>
									<CardDeckPlaceholder
										cards={socket.otherPlayers?.[3]?.handCards}
										player={socket.otherPlayers?.[3]}
										transform="rotate3d(2.5, 1, 0, 180deg)"
									/>
								</Grid>
							</Grid>
							<Grid container alignItems="center">
								<Grid item xs={2}>
									<Grid container justify="flex-start">
										<CardDeckPlaceholder
											cards={socket.otherPlayers?.[0]?.handCards}
											player={socket.otherPlayers?.[0]}
											transform="rotate(90deg)"
										/>
									</Grid>
								</Grid>
								<Grid item xs={8}>
									<Grid container justify="center" alignItems="center">
										<CardStack
											cards={socketStore?.game?.usedCards as CardData[]}
											game={socketStore.game as Game}
											onDrop={onDrop}
										/>

										{socket?.currentPlayer?.canBuyCard && (
											<>
												<Divider size={5} />

												<Button
													color="primary"
													variant="contained"
													onClick={buyCard}
													className={classes.buyCardButton}
												>
													BUY CARD
												</Button>
											</>
										)}
									</Grid>
								</Grid>
								<Grid item xs={2}>
									<Grid container justify="flex-end">
										<CardDeckPlaceholder
											cards={socket.otherPlayers?.[4]?.handCards}
											player={socket.otherPlayers?.[4]}
											transform="rotate3d(1, 1, 0, 180deg)"
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid container alignItems="center">
								<Grid item xs={1}>
									<Latency />
								</Grid>
								<Grid item xs={10}>
									<Grid container justify="center">
										{socket?.currentPlayer ? (
											<>
												<CustomCardDragPreview />

												<CardDeck
													cards={socket.currentPlayer?.handCards}
													player={socket.currentPlayer}
												/>
											</>
										) : (
											<CardDeckPlaceholder
												cards={socket.otherPlayers?.[5]?.handCards}
												player={socket.otherPlayers?.[5]}
											/>
										)}
									</Grid>
								</Grid>
								<Grid item xs={1}></Grid>
							</Grid>
						</Grid>
					</DndProvider>
				</CardProvider>
			</>
		</LoadingComponent>
	)
}

export default Table
