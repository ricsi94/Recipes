// Modules
import useAPI from "../../hooks/use-api"
import { useEffect, useState, useRef, Suspense } from "react"
import useSuggestion from "../../hooks/use-suggestion"
import { Link } from "react-router-dom"

// Pages and Components
import Card from "../../Components/Card/Card"
import Button from "../../Components/Button/Button"
import Input from "../../Components/Input/Input"
import SuggestionList from "../../Components/SuggestionList/SuggestionList"

// 3D
import { Canvas } from "@react-three/fiber"
import { FishModel, Camera } from "../../Components/Model/FishModel"

// Styles
import "./Home.css"

export default function Home({ HomeAnchor, PopularAnchor }) {
	const [popular, setPopular] = useState([])

	const {
		suggestionref,
		searchtext,
		handleOnchange,
		HandleSuggectionClick,
		show,
		suggestions: foodNames,
	} = useSuggestion({
		url: "http://localhost/apirouter.php?recipenamesearch=",
		whattoload: "Food Names",
	})
	const { isLoading: isCardLoading, error: isCardError, RequestHandler: fetchRecipes } = useAPI()

	const modelRef = useRef()

	useEffect(() => {
		const getRecipes = (elems) => {
			setPopular(elems)
		}

		fetchRecipes({ url: "http://localhost/apirouter.php?popularrecipes" }, getRecipes)
	}, [])

	return (
		<main className="pt-24" ref={HomeAnchor}>
			<section className="flex flex-wrap max-lg:h-auto max-lg:mb-[7em]">
				<div className="flex-[50%] mx-auto mt-20 max-lg:mt-0 max-lg:flex-[100%]">
					<div className="w-[70%] ml-20 max-lg:text-center max-lg:mt-16 max-lg:m-auto">
						<h2 className="text-5xl leading-15 font-semibold text-gray-700 mb-5 font-poppins">
							Find the best food recipe today!
						</h2>
						<p className="text-gray-500 mb-8">
							There are 38 recipes available on the website. Feel free to search among them !
						</p>
					</div>
					<div className="mb-8 w-[400px] max-lg:w-4/5 flex max-lg:m-auto ml-20 gap-8 max-lg:flex-col">
						<div ref={suggestionref} className="flex flex-col  max-lg:w-4/5 mx-auto">
							<Input
								className="max-lg:pr-0"
								placeholder="Pancake"
								value={searchtext}
								onChange={handleOnchange}
							/>
							{show && foodNames.length > 0 && (
								<SuggestionList
									suggestionlist={foodNames}
									suggestionclick={HandleSuggectionClick}
								/>
							)}
						</div>

						<Link className="max-lg:mx-auto" to={`/search/${searchtext}`}>
							<Button className="bg-red-500 hover:bg-red-700" linktext="Search" />
						</Link>
					</div>
				</div>
				<div className="flex-[50%] m-auto ">
					<Canvas style={{ height: "50vh" }}>
						<ambientLight intensity={0.9} />
						<pointLight position={[10, 10, 10]} />
						<FishModel ref={modelRef} />
						<Camera target={modelRef} />
					</Canvas>
				</div>
			</section>
			<section className="w-full bg-green-100 mt-20" ref={PopularAnchor}>
				<div className="relative">
					<div className="absolute w-full overflow-hidden leading-0  left-0 top-0 mt-[-3em]">
						<svg
							className="relative block w-full h-20"
							width="1200"
							height="150"
							viewBox="0 0 1200 150"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="none"
						>
							<path
								d="M1200 150L0 150L0 0C40.4283 22.5 140.608 78.8 217.902 84C295.195 89.2 352.548 67.5 371.563 56C382.869 34.6667 421.413 0.988672 464.582 15.3887C507.752 29.7887 523.683 46.6667 528.822 56L581.242 10V56C617.216 64.8333 722.364 84.8 855.161 94C987.957 103.2 1140.39 53.5 1200 37V150Z"
								fill="rgb(220 252 231)"
							/>
						</svg>
					</div>
				</div>
				<h2 className="text-center text-4xl text-gray-700 py-16">Popular foods</h2>
				<div className="flex flex-wrap gap-8 w-4/5 justify-around m-auto">
					{isCardLoading && (
						<>
							<span className="text-2xl text-center mb-20">Loading...</span>
						</>
					)}
					{popular &&
						popular.map((recipe) => (
							<Card
								key={recipe.foodid}
								foodname={recipe.foodname}
								detail={recipe.leiras}
								image={recipe.kep}
								time={recipe.ido}
								link={"/recipe/" + recipe.foodname}
							/>
						))}
					{isCardError && (
						<h2 className="text-xl mb-20">Error . We could not get the popular recipes .</h2>
					)}
				</div>
				<div className="text-center">
					<p>
						3D model by{" "}
						<a href="https://sketchfab.com/Suushimi" className="underline">
							Suushimi
						</a>{" "}
						used under
						<a href="https://creativecommons.org/licenses/by-nc/4.0/" className="underline">
							CC BY-NC 4.0
						</a>
						.
					</p>
					<a
						href="https://sketchfab.com/3d-models/cut-fish-c9bcb782e5ef4d37bd8671f1f82a0fbc"
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
