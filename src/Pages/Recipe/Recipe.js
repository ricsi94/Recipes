// Modules
import { useParams } from "react-router-dom"
import useAPI from "../../hooks/use-api"
import { useEffect, useState } from "react"

// Pages and Components
import RecipeTable from "../../Components/RecipeTable/RecipeTable"

export default function Recipe() {
	const { foodname } = useParams()

	const { isLoading, error, RequestHandler: fetchRecipe } = useAPI()

	const [recipe, setRecipe] = useState("")

	useEffect(() => {
		const getRecipe = (elem) => {
			setRecipe(elem)
		}

		fetchRecipe({ url: `http://localhost/apirouter.php?recipe=${foodname}` }, getRecipe)
	}, [])

	const [serving, setServing] = useState(2)

	function HandleAddServing() {
		let newIngredients = recipe.ingredients.map((ingredient) => {
			console.log(ingredient[0], ingredient[1], serving, ingredient[1] / serving, ingredient[2])
			return [ingredient[0], Number(ingredient[1]) + Number(ingredient[1]) / serving, ingredient[2]]
		})
		setRecipe({ ...recipe, ingredients: newIngredients })
		setServing((prev) => prev + 1)
	}

	function HandleRemoveServing() {
		if (serving === 1) return
		let newIngredients = recipe.ingredients.map((ingredient) => {
			return [ingredient[0], Number(ingredient[1]) - Number(ingredient[1]) / serving, ingredient[2]]
		})
		setRecipe({ ...recipe, ingredients: newIngredients })
		setServing((prev) => prev - 1)
	}

	return (
		<main className="pt-24 px-16 max-lg:px-8">
			<h2 className="text-center text-3xl text-gray-700 mb-16">{foodname}</h2>
			<section className="flex flex-wrap max-lg:h-auto max-lg:mb-20 gap-36 max-lg:gap-16 mb-16">
				<div className="flex-[40%]  mx-auto max-lg:flex-[100%]">
					<img
						className="w-full rounded-xl shadow-lg mb-20"
						src={`http://localhost/images/${recipe.kep}`}
						alt=""
					/>
					<div className="mx-auto w-2/5 max-lg:w-4/5 items-center border-orange-200 border bg-orange-100 rounded-xl py-2 text-gray-800 mb-12">
						<p className="text-center text-xl font-semibold text-gray-800">Cooking time</p>
						<div className="flex justify-center  m-auto gap-4 items-center">
							<svg
								width="16"
								height="16"
								viewBox="0 0 457 457"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M228.5 437C343.651 437 437 343.651 437 228.5C437 113.349 343.651 20 228.5 20C113.349 20 20 113.349 20 228.5C20 343.651 113.349 437 228.5 437ZM228.5 457C354.697 457 457 354.697 457 228.5C457 102.303 354.697 0 228.5 0C102.303 0 0 102.303 0 228.5C0 354.697 102.303 457 228.5 457ZM220 253V93H240V243.152L359.014 334.701L346.82 350.554L220 253Z"
									fill="black"
								/>
							</svg>
							<span className="text-xl font-semibold text-gray-800">{recipe.ido} min</span>
						</div>
					</div>
					<div className="flex justify-center w-3/5 max-xl:w-full m-auto gap-4 items-center border-gray-200 border bg-gray-100 rounded-xl py-2">
						<span className="text-xl font-semibold text-gray-800">Serving</span>
						<div className="flex  justify-center items-center text-gray-900 gap-4">
							<button
								className={`cursor-pointer text-white p-0 rounded-[2em]  right-1  text-xl px-6 py-1 font-semibold tracking-wider bg-red-500 hover:bg-red-700 `}
								type="submit"
								onClick={HandleRemoveServing}
							>
								-
							</button>
							<span className="text-xl font-semibold text-gray-800">{serving}</span>
							<button
								className={`cursor-pointer text-white p-0 rounded-[2em]  right-1  text-xl px-6 py-1 font-semibold tracking-wider bg-green-500 hover:bg-green-700 `}
								type="submit"
								onClick={HandleAddServing}
							>
								+
							</button>
						</div>
					</div>
				</div>
				<div className="flex-[40%] mx-auto max-lg:order-1">
					<RecipeTable ingredients={recipe.ingredients} />
				</div>
			</section>
			<section className="w-3/5 max-xl:w-full p-8 rounded-3xl bg-gray-50 border m-auto mb-16">
				<h2 className="text-4xl font-semibold text-gray-800 mb-4">Description</h2>
				<p className="text-gray-800">{recipe.leiras}</p>
			</section>
		</main>
	)
}
