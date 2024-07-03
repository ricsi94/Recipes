// Modules
import { useEffect, useState } from "react"

export default function useDebounce(value, delay) {
	const [debounceValue, setDebounceValue] = useState(value)

	useEffect(() => {
		const timer = setTimeout(() => setDebounceValue(value), 300)

		return () => {
			clearTimeout(timer)
		}
	}, [value, delay])

	return debounceValue
}
