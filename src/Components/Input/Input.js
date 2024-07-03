export default function Input({ className, placeholder, value, onChange }) {
	return (
		<input
			type="text"
			className={` border text-base pl-[1em] pr-[2.5em] py-[0.5em] rounded-full border-solid border-gray-500 placeholder-gray-500 ${className} `}
			placeholder={placeholder}
			value={value}
			onChange={(e) => onChange(e)}
		/>
	)
}
