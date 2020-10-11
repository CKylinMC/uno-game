import React, { ReactElement } from "react"
import {
	Card,
	Avatar,
	Grid,
	Typography,
} from "@material-ui/core"
import Chip from "@material-ui/core/Chip"

import useStyles from "@/pages/Room/PlayerItem/styles"
import { PlayerData } from "@uno-game/protocols"

type PlayerItem = {
	player: PlayerData
}

const PlayerItem = (props: PlayerItem): ReactElement => {
	const { player } = props

	const classes = useStyles()

	return (
		<Card
			className={classes.cardContainer}
		>
			<Grid
				container
				alignItems="center"
				justify="space-between"
				className={classes.cardContent}
			>
				<Chip
					className={classes.cardStatus}
					color={player.ready ? "primary" : "secondary"}
				/>

				<Typography className={classes.cardTitle}>
					{player.name}
				</Typography>

				<Avatar>
					{player.name[0]}
				</Avatar>

				<Chip
					label={player.ready ? "READY" : "WAITING"}
					color={player.ready ? "primary" : "secondary"}
				/>
			</Grid>
		</Card>
	)
}

export default PlayerItem
