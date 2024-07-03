export default function SuggestionElem({ suggestion, suggestionclick }) {
	if (suggestion.foodname)
		return (
			<li
				onClick={suggestionclick}
				className="py-1 hover:bg-gray-200 rounded-lg p-1 cursor-pointer"
			>
				{suggestion.foodname}
			</li>
		)

	if (suggestion.ingredientname)
		return (
			<li
				onClick={suggestionclick}
				className="py-1 hover:bg-gray-200 rounded-lg p-1 cursor-pointer"
			>
				{suggestion.ingredientname}
			</li>
		)
}
