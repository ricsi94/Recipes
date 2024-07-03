// Modules
import { useEffect } from "react"

export default function useOutsideClick(ref, HandlerFunction) {
	useEffect(() => {
		const EventHandler = (event) => {
			if (!ref.current || ref.current.contains(event.target)) {
				return
			}
			HandlerFunction(event)
		}
		document.addEventListener("mousedown", EventHandler)
		document.addEventListener("touchstart", EventHandler)
		return () => {
			document.removeEventListener("mousedown", EventHandler)
			document.removeEventListener("touchstart", EventHandler)
		}
	}, [ref, HandlerFunction])
}
