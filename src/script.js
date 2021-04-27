import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'


const loader = new THREE.TextureLoader()
const texture = loader.load('/texture.png')
const displacement = loader.load('/DisplacementMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneBufferGeometry(5, 5, 256, 256)

// Materials
const materials = new THREE.MeshStandardMaterial({
    color: 'gray',
    map: texture,
    displacementMap: displacement,
    displacementScale: 2
})

// Mesh
const plane = new THREE.Mesh(geometry, materials)
scene.add(plane)
plane.rotation.x = 6
// plane.rotation.z = 43
gui.add(plane.rotation, 'x')

// Lights

const pointLight = new THREE.PointLight('#5244ea', 7)
pointLight.position.x = 4.4
pointLight.position.y = 30
pointLight.position.z = 1
scene.add(pointLight)

gui.add(pointLight.position, 'x')
gui.add(pointLight.position, 'y')
gui.add(pointLight.position, 'z')

const baseColor = {color: '#5244ea'}
gui.addColor(baseColor, 'color').onChange(() => {
    pointLight.color.set(baseColor.color)
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.OrthographicCamera(-2, 2, 3, 0, 1, 50)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)

gui.add(camera.rotation, 'x')
gui.add(camera.rotation, 'y')
gui.add(camera.rotation, 'z')

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const PERIOD = 8; // loop every 8 calls to updateNumber
const SCALE = 255; // go between 0 and this

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    pointLight.position.y = Math.sin(elapsedTime) + 24
    let value = (Math.sin(elapsedTime * 2 * Math.PI / PERIOD) * (SCALE / 2) + (SCALE / 2));
    pointLight.color.setRGB(value / 255, value / 255, 234 / 255)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()