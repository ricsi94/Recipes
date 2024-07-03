// Modules
import { useParams } from "react-router-dom"
import useSuggestion from "../../hooks/use-suggestion"

// Pages and Components
import Input from "../../Components/Input/Input"
import Card from "../../Components/Card/Card"
import SuggestionList from "../../Components/SuggestionList/SuggestionList"

export default function Search() {
	let { searchtextparam } = useParams()
	const {
		suggestionref,
		searchtext,
		handleOnchange,
		HandleSuggectionClick,
		show,
		suggestions: foodNames,
	} = useSuggestion({
		url: "http://localhost/apirouter.php?search=",
		whattoload: "Food Names",
		searchtextparam,
	})

	return (
		<main className="pt-24">
			<section className="mb-20 max-lg:h-auto ">
				<div className="m-auto text-center w-[70%]">
					<h2 className="text-5xl leading-15 font-semibold text-gray-700 mb-5">Search</h2>
				</div>
				<div
					ref={suggestionref}
					className="mt-8 m-auto relative w-[400px] max-lg:w-4/5 text-center flex flex-col"
				>
					<Input value={searchtext || ""} placeholder="Pancake" onChange={handleOnchange} />

					{show && foodNames.length > 0 && (
						<SuggestionList
							suggestionlist={foodNames}
							suggestionclick={HandleSuggectionClick}
							className="absolute w-full mt-[3em]"
						/>
					)}
				</div>

				{foodNames.length == 0 && (
					<div>
						<svg
							className="mx-auto mt-[8em] animate-bounce"
							width="144"
							height="297"
							viewBox="0 0 144 297"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M67.1823 0.689202C68.8507 0.239757 70.6039 0 72.4114 0C74.2258 0 75.9856 0.241615 77.6598 0.694427C82.5249 0.86457 87.2543 3.23693 90.2616 7.53178L140.907 79.8607C145.992 87.1236 144.227 97.1341 136.964 102.22C129.701 107.305 119.691 105.54 114.605 98.2772L92.4789 66.6773V277C92.4789 288.046 83.4571 297 72.4114 297C61.3657 297 52.3438 288.046 52.3438 277V66.451L30.0589 98.2771C24.9733 105.54 14.9628 107.305 7.69991 102.22C0.436977 97.1341 -1.32814 87.1236 3.75742 79.8607L54.4027 7.5318C57.4466 3.18464 62.2548 0.807071 67.1823 0.689202Z"
								fill="green"
							/>
						</svg>
					</div>
				)}
			</section>

			<section className="w-full mt-[14em]">
				<div className="flex flex-wrap gap-8 w-4/5 justify-around m-auto">
					{foodNames.length > 0 &&
						foodNames.map((recipe) => (
							<Card
								key={recipe.foodid}
								foodname={recipe.foodname}
								detail={recipe.leiras}
								image={recipe.kep}
								time={recipe.ido}
								link={"/recipe/" + recipe.foodname}
							/>
						))}
				</div>
			</section>
		</main>
	)
}
