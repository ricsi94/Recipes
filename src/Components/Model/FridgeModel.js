import React, { useEffect, useRef } from "react"

import { useFrame, useThree } from "@react-three/fiber"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export const FridgeModel = React.forwardRef((props, ref) => {
	const gltf = useLoader(GLTFLoader, "./fridge.gltf")

	gltf.scene.scale.set(1.5, 1.5, 1.5)

	const groupRef = useRef()

	useEffect(() => {
		if (ref.current) {
			ref.current.rotation.y = 2
		}
	}, [])

	useFrame(({ clock }) => {
		if (ref.current) {
			ref.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.2 - 1.5
			ref.current.rotation.y += 0.005
		}
	})
	return <primitive object={gltf.scene} ref={ref} position={[0, 0, 0]} />
})

export const Camera = ({ target }) => {
	const { camera } = useThree()

	useEffect(() => {
		if (target.current) {
			camera.position.set(-3, 0, -2)
			camera.lookAt(target.current.position)
		}
	}, [camera, target])

	return null
}
