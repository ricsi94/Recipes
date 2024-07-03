// Pages and Components
import SuggestionElem from "../SuggestionElem/SuggestionElem"

export default function SuggestionList({ className, suggestionlist, suggestionclick }) {
	return (
		<div className={`mt-2 py-2 border border-gray-500 rounded-lg px-2 ${className}`}>
			<ul>
				{suggestionlist.slice(0, 3).map((suggestion) => {
					if (suggestion.foodname) {
						return (
							<SuggestionElem
								key={suggestion.foodid}
								suggestion={suggestion}
								suggestionclick={suggestionclick}
							/>
						)
					}
					if (suggestion.ingredientname) {
						return (
							<SuggestionElem
								key={suggestion.ingredientid}
								suggestion={suggestion}
								suggestionclick={suggestionclick}
							/>
						)
					}
				})}
			</ul>
		</div>
	)
}
