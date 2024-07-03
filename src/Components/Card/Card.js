// Modules
import { Link } from "react-router-dom"

export default function Card({ link, foodname, time, detail, image }) {
	return (
		<div className="card shadow-[0_0px_5px_0px_grey] transition duration-300 w-2/5 flex-[0_1_30%] bg-[white] mb-[4em] rounded-md max-xl:flex-[40%] max-lg:flex-[50%]  overflow-hidden hover:shadow-[0_0px_20px_0px_grey] self-start">
			<figure className="aspect-video overflow-hidden flex">
				<Link to={link} className="w-full flex">
					<img
						className="w-full origin-center scale-img transition transform duration-300 ease-in object-cover"
						src={`http://localhost/images/${image}`}
						alt="Avatar"
					/>
				</Link>
			</figure>

			<div className="p-8">
				<div className="flex justify-between mb-4">
					<h4 className="text-xl flex-[2] font-semibold">{foodname}</h4>
					<div className="bg-orange-50 rounded-md border-2 border-orange-200 px-4 text-gray-900 flex justify-between items-center gap-4  self-start">
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
						<span>{time} min</span>
					</div>
				</div>
				<p className="mb-4 break-words">{detail.split(" ").splice(0, 30).join(" ")} ...</p>
				<Link to={link} className="text-blue-900 font-bold">
					Read more
				</Link>
			</div>
		</div>
	)
}
