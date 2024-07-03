// Modules
import { useEffect, useState, useRef } from "react"
import useOutsideClick from "./use-outsideclick"
import useDebounce from "./use-debounce"

export default function useSuggestion(params) {
	const { url, whattoload, searchtextparam = "" } = params
	const [searchtext, setSearchtext] = useState(searchtextparam)
	const [suggestions, setSuggestions] = useState([])
	const [accepted, setAccepted] = useState(false)
	const [show, setShow] = useState(false)
	const debounceSearchtext = useDebounce(searchtext, 500)
	const suggestionref = useRef()
	useOutsideClick(suggestionref, () => {
		setShow(false)
	})

	useEffect(() => {
		async function Load_Suggestions(text) {
			let response = await fetch(url + text)
			let res_suggestions = await response.json()
			setSuggestions((prev) => {
				return res_suggestions
			})
			return res_suggestions
		}

		async function basic() {
			if (debounceSearchtext !== "" && !accepted) {
				let res_suggestions = await Load_Suggestions(debounceSearchtext)
				if (res_suggestions.length >= 1) {
					setShow(true)
				}
			}

			if (debounceSearchtext !== "" && accepted) {
				setShow(false)
				let res_suggestions = await Load_Suggestions(debounceSearchtext)
				if (whattoload === "Food Names") {
					if (
						res_suggestions.length === 1 &&
						res_suggestions[0]["foodname"] === debounceSearchtext
					) {
						setShow(false)
					}
				}
				if (whattoload === "Ingredient Names") {
					if (
						res_suggestions.length === 1 &&
						res_suggestions[0]["ingredientname"] === debounceSearchtext
					) {
						setShow(false)
					}
				}
			}
		}

		basic()
	}, [debounceSearchtext])

	function handleOnchange(e) {
		setSearchtext(e.target.value)
		if (e.target.value === "") {
			setShow(false)
			return
		}
	}
	function HandleSuggectionClick(e) {
		setSearchtext(e.target.innerText)
		setAccepted(true)
		setShow(false)
		setTimeout(() => {
			setAccepted(false)
		}, 500)
	}

	return {
		suggestionref,
		searchtext,
		setSearchtext,
		handleOnchange,
		HandleSuggectionClick,
		show,
		suggestions,
	}
}
