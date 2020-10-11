class Storage {
	get<Data extends Record<string, unknown>> (key: string): Data | null {
		try {
			const stringifiedData = localStorage.getItem(key)

			if (stringifiedData) {
				const parsedData = JSON.parse(stringifiedData)

				return parsedData
			} else {
				return null
			}
		} catch (error) {
			console.log(error)
			return null
		}
	}

	set (key: string, data: Record<string, unknown>) {
		try {
			const stringifiedData = JSON.stringify(data)

			localStorage.setItem(key, stringifiedData)
		} catch (error) {
			console.log(error)
		}
	}

	delete (key: string) {
		try {
			localStorage.removeItem(key)
		} catch (error) {
			console.log(error)
		}
	}
}

export default new Storage()
