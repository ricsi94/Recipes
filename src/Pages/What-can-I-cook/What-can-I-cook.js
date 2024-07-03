// Modules
import { useState, useRef } from "react"
import useAPI from "../../hooks/use-api"
import useSuggestion from "../../hooks/use-suggestion"

// Pages and Components
import Input from "../../Components/Input/Input"
import Button from "../../Components/Button/Button"
import Card from "../../Components/Card/Card"
import SuggestionList from "../../Components/SuggestionList/SuggestionList"

import { Canvas } from "@react-three/fiber"
import { FridgeModel, Camera } from "../../Components/Model/FridgeModel"

export default function What_can_I_cook() {
	const {
		suggestionref,
		searchtext,
		setSearchtext,
		handleOnchange,
		HandleSuggectionClick,
		show,
		suggestions: ingredientNames,
	} = useSuggestion({
		url: "http://localhost/apirouter.php?ingredient=",
		whattoload: "Ingredient Names",
	})

	const [addedIngredients, setAddedIngredients] = useState([])

	const [foundRecipes, setFoundRecipes] = useState([])

	const { isLoading: isCardLoading, error: isCardError, RequestHandler: fetchRecipes } = useAPI()

	const modelRef = useRef()

	function HandleAddClick() {
		if (addedIngredients.includes(searchtext) || searchtext == "") {
			setSearchtext("")
			return
		}
		setAddedIngredients((prevArray) => [...prevArray, searchtext])
		setSearchtext("")

		const getRecipes = (elems) => {
			setFoundRecipes(elems)
		}

		fetchRecipes(
			{
				url: "http://localhost/apirouter.php?whatcanicook",
				method: "POST",
				body: [...addedIngredients, searchtext],
			},
			getRecipes
		)
	}

	function HandleClearClick() {
		setAddedIngredients((prevArray) => [])
		setFoundRecipes([])
	}

	return (
		<main className="pt-24">
			<h2 className=" text-center  text-5xl leading-15 font-semibold text-gray-700 mb-5">
				What can I cook?
			</h2>

			<section className="flex flex-wrap mb-20 max-lg:h-auto mt-20 max-lg:mt-0">
				<div className="flex-[60%] m-auto max-lg:flex-[100%] max-lg:order-1">
					<div className="w-[70%] text-center mx-auto max-lg:text-center max-lg:mt-16 max-lg:mx-auto">
						<p className="text-gray-500 mb-8">Add some ingredients to get the result !</p>
					</div>
					<div className="mb-8 w-fit  max-lg:w-4/5 flex m-auto gap-8 max-lg:flex-col">
						<div ref={suggestionref} className="flex flex-col md:w-[50%] max-lg:w-4/5 mx-auto">
							<Input placeholder="milk" value={searchtext} onChange={handleOnchange} />
							{show && ingredientNames.length > 0 && (
								<SuggestionList
									suggestionlist={ingredientNames}
									property={"ingredient"}
									suggestionclick={HandleSuggectionClick}
								/>
							)}
						</div>

						<Button
							className="max-lg:mx-auto self-start bg-blue-500 hover:bg-blue-700"
							linktext="Add"
							onClick={HandleAddClick}
						/>
						<Button
							className="max-lg:mx-auto self-start bg-red-500 hover:bg-red-700"
							linktext="Clear"
							onClick={HandleClearClick}
						/>
					</div>

					<div className="w-[40%] text-xl mx-auto mt-[7em] text-gray-700 max-lg:w-[80%]">
						<span className="underline">Ingredients</span>{" "}
						<span className="text-gray-700">
							{" "}
							: {addedIngredients.map((ingredient) => ingredient + ", ")}
						</span>
					</div>
				</div>
				<div className="flex-[20%] mt-0 mr-20 m-auto max-lg:mr-0 h-[20em]">
					<div className="w-full h-[20em]">
						<Canvas>
							<ambientLight intensity={0.9} />
							<pointLight position={[10, 10, 10]} />
							<FridgeModel ref={modelRef} />
							<Camera target={modelRef} />
						</Canvas>
					</div>
				</div>
			</section>

			<section className="w-full max-lg:mt-20">
				<div className="flex flex-wrap gap-8 w-4/5 justify-around m-auto">
					{isCardLoading && (
						<>
							<span className="text-2xl text-center mb-20">Loading...</span>
						</>
					)}
					{foundRecipes &&
						foundRecipes.map((recipe) => (
							<Card
								key={recipe.foodid}
								foodname={recipe.foodname}
								detail={recipe.leiras}
								image={recipe.kep}
								time={recipe.ido}
								link={"/recipe/" + recipe.foodname}
							/>
						))}
					{isCardError && <h2 className="text-xl mb-20">Error . We could not get the recipes .</h2>}
				</div>

				<div className="text-center">
					<p>
						3D model by{" "}
						<a href="https://sketchfab.com/whitend.3d" className="underline">
							Whitend
						</a>{" "}
						used under
						<a href="https://creativecommons.org/licenses/by/4.0/" className="underline">
							CC BY 4.0
						</a>
						.
					</p>
					<a
						href="https://sketchfab.com/3d-models/house-props-fridge-2fdaa56bbd85404cb4206dcaedc16658"
						className="underline"
					>
						{" "}
						View original model
					</a>{" "}
					on Sketchfab.
					<p>Changes were made to the original model. The model was converted to GLTF format.</p>
				</div>
			</section>
		</main>
	)
}
