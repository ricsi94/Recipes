// Modules
import { HashRouter, Route, Routes, Navigate } from "react-router-dom"
import { useRef } from "react"

// Style
import "./App.css"

// Pages and Components
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import What_can_I_cook from "./Pages/What-can-I-cook/What-can-I-cook"
import Search from "./Pages/Search/Search"
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop"
import Recipe from "./Pages/Recipe/Recipe"

function App() {
	const HomeAnchor = useRef(null)
	const PopularAnchor = useRef(null)

	return (
		<div className="App">
			<HashRouter>
				<Navbar HomeAnchor={HomeAnchor} PopularAnchor={PopularAnchor} />
				<ScrollToTop>
					<Routes>
						<Route
							exact
							path="/"
							element={<Home HomeAnchor={HomeAnchor} PopularAnchor={PopularAnchor} />}
						/>
						<Route path="/whatcanicook" element={<What_can_I_cook />} />
						<Route path="/search/:searchtextparam" element={<Search />} />
						<Route path="/search/" element={<Search />} />
						<Route path="/recipe/:foodname" element={<Recipe />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</ScrollToTop>
			</HashRouter>
		</div>
	)
}

export default App
