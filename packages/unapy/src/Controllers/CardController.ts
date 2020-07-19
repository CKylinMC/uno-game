import CardService from "@unapy/Services/CardService"
import { Request, Response } from "express"

class CardController {
	async getCardList (req: Request, res: Response) {
		const cards = CardService.setupInitialCards()

		return res.status(200).json({ cards })
	}
}

export default new CardController()
