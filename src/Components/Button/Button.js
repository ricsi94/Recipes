export default function Button({ className, onClick, linktext }) {
	return (
		<button
			className={`cursor-pointer text-white p-0 rounded-[2em] right-1  px-6 py-2 font-semibold tracking-wider ${className}`}
			type="submit"
			onClick={onClick}
		>
			{linktext}
		</button>
	)
}
