// Modules
import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

export default function Navbar({ HomeAnchor, PopularAnchor }) {
	const SVGPathVariant = {
		start: {
			opacity: 0.5,
			pathLength: 0,
		},
		animate: {
			opacity: 1,
			pathLength: 1,
			transition: {
				delay: 0.5,
				duration: 2,
			},
		},
	}

	useEffect(() => {
		window.onscroll = function () {
			if (window.innerWidth < 1200) {
				document.getElementsByTagName("header")[0].style.height = "70px"
				document.getElementById("logo").style.width = "100%"
				return
			}

			if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
				document.getElementsByTagName("header")[0].style.height = "60px"
			} else {
				document.getElementsByTagName("header")[0].style.height = "70px"
				document.getElementById("logo").style.width = "100%"
			}
		}
	}, [])

	const location = useLocation().pathname.split("/")[1]
	const navigate = useNavigate()

	// Scroll Home to Top
	const ScrollToHome = () => {
		HomeAnchor.current?.scrollIntoView({ behavior: "smooth" })
	}

	// Navigate to Home and Scroll to Top
	const NavigateAndScrollHome = async () => {
		await navigate("/")
		await HomeAnchor.current.scrollIntoView({ behavior: "smooth" })
	}

	// Scroll to Popular section
	const ScrollToPopular = () => {
		PopularAnchor.current?.scrollIntoView({ behavior: "smooth" })
	}

	// Navigate to Home and Scroll to Popular section
	const NavigateAndScrollPopular = async () => {
		await navigate("/")
		setTimeout(async () => {
			await PopularAnchor.current.scrollIntoView({ behavior: "smooth" })
		}, 50)
	}

	function Hamburger_onclick() {
		document.querySelector("nav").classList.toggle("max-lg:top-[70px]")
	}

	function Handle_Nav_Click(e) {
		document.querySelector("nav").classList.remove("max-lg:top-[70px]")

		// X - Y : WHERE LINK GOES - WHERE I AM NOW

		if (e === "logo") {
			NavigateAndScrollHome()
			return
		}
		if (e.target.id === "home-home") {
			ScrollToHome()
		}
		if (e.target.id === "home-another-page") {
			NavigateAndScrollHome()
		}
		if (e.target.id === "popular-home") {
			ScrollToPopular()
		}
		if (e.target.id === "popular-another-page") {
			NavigateAndScrollPopular()
		}
	}

	return (
		<header className=" w-full h-[70px] flex items-center justify-between transition-all duration-300 fixed backdrop-saturate-[100%] bg-white bg-opacity-[.99] backdrop-blur-[10px] shadow-md z-[2] pl-20  py-0 border-b-gray-100 border-b border-solid max-lg:px-5 max-lg:py-0">
			<div
				className=" flex items-center transition-all duration-300 cursor-pointer"
				id={location ? "home-another-page" : "home-home"}
				onClick={(e) => Handle_Nav_Click("logo")}
			>
				<svg
					id="logo"
					className="mr-4 transition-[3s]"
					width="100%"
					height="32"
					viewBox="0 0 645 362"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<motion.path
						variants={SVGPathVariant}
						initial="start"
						animate="animate"
						d="M630 36.5L476 190.5C476 190.5 342.667 322 261.668 322C168.751 322 15.1675 283.417 15.1675 190.5C15.1675 96 162.769 36.5 261.5 36.5C357 36.5 481 190.5 481 190.5L630 327.5V36.5Z"
						stroke="rgb(55 65 81)"
						strokeWidth="30"
					/>
				</svg>
				<span className="text-gray-700 text-2xl font-semibold">RECIPES</span>
			</div>

			<nav className="mr-12 max-lg:bg-white max-lg:bg-opacity-[.99] max-lg:block max-lg:absolute max-lg:top-[-1000%] max-lg:w-full max-lg:h-fit max-lg:backdrop-saturate-[100%] max-lg:backdrop-blur-[10px] max-lg:shadow-md max-lg:transition-[0.3s] max-lg:text-center max-lg:z-[-1] max-lg:m-0 max-lg:p-[30px] max-lg:border-b-gray-100 max-lg:border-b max-lg:border-solid max-lg:left-0">
				<ul className="flex max-lg:block">
					<li className="flex items-center">
						<span
							id={location ? "home-another-page" : "home-home"}
							className="block text-gray-700 text-2xl transition-[0.2s] px-8 py-2 lg:hover:shadow-[0_2px_0px_0_gray] max-lg:py-4 max-lg:w-full cursor-pointer"
							onClick={(e) => Handle_Nav_Click(e)}
						>
							Home
						</span>
					</li>
					<li className="flex items-center">
						<span
							id={location ? "popular-another-page" : "popular-home"}
							className="block text-gray-700 text-2xl transition-[0.2s] px-8 py-2 lg:hover:shadow-[0_2px_0px_0_gray] max-lg:py-4 max-lg:w-full cursor-pointer"
							onClick={(e) => Handle_Nav_Click(e)}
						>
							Popular
						</span>
					</li>
					<li className="flex items-center">
						<NavLink
							className="block text-gray-700 text-2xl transition-[0.2s] px-8 py-2 lg:hover:shadow-[0_2px_0px_0_gray] max-lg:py-4 max-lg:w-full"
							to="/search"
							onClick={Handle_Nav_Click}
						>
							Search
						</NavLink>
					</li>
					<li className="flex items-center">
						<NavLink
							className="block text-gray-700 text-2xl transition-[0.2s] px-8 py-2 lg:hover:shadow-[0_2px_0px_0_gray] max-lg:py-4 max-lg:w-full"
							to="/whatcanicook"
							onClick={Handle_Nav_Click}
						>
							What can I cook?
						</NavLink>
					</li>
				</ul>
			</nav>

			<div className="cursor-pointer hidden ml-5 mr-5 max-lg:block" onClick={Hamburger_onclick}>
				<div className="w-[30px] h-0.5 mx-0 my-1.5 bg-gray-900"></div>
				<div className="w-[30px] h-0.5 mx-0 my-1.5 bg-gray-900"></div>
				<div className="w-[30px] h-0.5 mx-0 my-1.5 bg-gray-900"></div>
			</div>
		</header>
	)
}
