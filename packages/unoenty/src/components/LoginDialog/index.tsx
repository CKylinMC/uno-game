import React, { useState, ReactElement } from "react"
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	ThemeProvider,
} from "@material-ui/core"

import Node from "@/utils/node"

import theme from "@/styles/theme"

type LoginDialogResponse = {
	name: string
}

type LoginDialogProps = {
	callback: (response: LoginDialogResponse) => void
}

const LoginDialog = (props: LoginDialogProps): ReactElement => {
	const { callback } = props

	const [dialogVisible, setDialogVisible] = useState(true)
	const [response, setResponse] = useState<LoginDialogResponse>({ name: "" })

	const handleConfirm = () => {
		setDialogVisible(false)

		callback(response)
	}

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()

		handleConfirm()
	}

	const handleChange = (key: keyof LoginDialogResponse, value: LoginDialogResponse[keyof LoginDialogResponse]) => {
		setResponse(lastState => ({
			...lastState,
			[key]: value,
		}))
	}

	return (
		<ThemeProvider theme={theme}>
			<Dialog open={dialogVisible} aria-labelledby="form-dialog-title">
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Login</DialogTitle>
					<DialogContent>
						<DialogContentText>
							You have to choose a name in order to play this game.
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							label="Name"
							onChange={({ target }) => handleChange("name", target.value)}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleConfirm}
							variant="contained"
							color="primary"
							type="submit"
						>
							Confirm
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</ThemeProvider>
	)
}

LoginDialog.open = async (): Promise<LoginDialogResponse> => new Promise(resolve => Node.renderComponent(
	"login-dialog",
	<LoginDialog
		callback={resolve}
	/>,
))

export default LoginDialog
