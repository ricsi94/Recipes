export default function RecipeTable({ ingredients }) {
	return (
		<div className="relative bg-gray-100 rounded-xl overflow-hidden mb-8">
			<div className="shadow-sm overflow-hidden my-8">
				<table className="border-collapse table-auto w-full text-sm">
					<thead>
						<tr>
							<th className="border-b  font-semibold text-xl p-4 pl-8 pt-0 pb-3 text-gray-800 text-left">
								Ingredient
							</th>
							<th className="border-b  font-semibold text-xl p-4 pl-8 pt-0 pb-3 text-gray-800 text-left">
								Quantity
							</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{ingredients &&
							ingredients.map((ingredient) => (
								<tr key={ingredient[0]}>
									<td className="border-b border-gray-100  p-4 pl-8 text-gray-800 ">
										{ingredient[0]}
									</td>
									<td className="border-b border-gray-100  p-4 pl-8 text-gray-800 ">
										{ingredient[1]} {ingredient[2]}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<div className="absolute inset-0 pointer-events-none border border-gray-200 rounded-xl "></div>
		</div>
	)
}
