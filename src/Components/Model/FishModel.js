import React, { useEffect, useRef, useState } from "react"

import { useFrame, useThree } from "@react-three/fiber"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export const FishModel = React.forwardRef((props, ref) => {
	const { mouse } = useThree()
	const [hovered, setHovered] = useState(false)

	const gltf = useLoader(GLTFLoader, "./fish.gltf")

	gltf.scene.scale.set(5, 5, 5)

	const groupRef = useRef()

	useFrame(() => {
		if (groupRef.current && hovered) {
			groupRef.current.rotation.y = (mouse.x * Math.PI) / 4
		}
		if (groupRef.current && !hovered) {
			groupRef.current.rotation.y += 0.005
		}
	})

	return (
		<group
			ref={groupRef}
			position={[-3, 10, 3]}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
		>
			<primitive object={gltf.scene} ref={ref} position={[-11, -5, 0]} />
		</group>
	)
})

export const Camera = ({ target }) => {
	const { camera } = useThree()

	useEffect(() => {
		if (target.current) {
			camera.position.set(10, 10, 10) // Position the camera above the model, slightly offset for better view
			camera.lookAt(target.current.position) // Make the camera look at the model
		}
	}, [camera, target])

	return null
}
