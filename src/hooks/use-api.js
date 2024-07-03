// Modules
import { useState, useCallback } from "react"

const useAPI = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)
	const [error, setError] = useState(null)

	const RequestHandler = useCallback(async (config, cleaning = () => {}) => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await fetch(config.url, {
				headers: config.headers ? config.headers : {},
				method: config.method ? config.method : "GET",
				body: config.body ? JSON.stringify(config.body) : null,
			})

			if (!response.ok) {
				throw new Error("Fail!")
			}

			const JSONdata = await response.json()
			cleaning(JSONdata)
		} catch (error) {
			setError(error.message || "Fail!")
		}
		setIsLoading(false)
		setIsLoaded(true)
	}, [])

	return {
		isLoading,
		isLoaded,
		error,
		RequestHandler,
	}
}

export default useAPI
