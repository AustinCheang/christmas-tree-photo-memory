# Christmas Tree Photo Memory

An immersive 3D Christmas tree experience where you can upload your photos as polaroid ornaments. Features hand gesture control, dynamic chaos-to-order assembly, and luxurious emerald and gold aesthetics.

## Features

- **Photo Memories**: Upload up to 50 photos that appear as polaroid ornaments on the tree
- **Hand Gesture Control**: Use your webcam to control the experience
  - Open hand: Explode tree into chaos mode
  - Closed fist: Restore tree to formed shape
  - Two hands + pinch: Navigate through photos in fullscreen view
- **Christmas Audio**: Play festive music during the show
- **Volumetric 3D Tree**: 30,000 particle foliage with gold/red ornaments
- **Interactive Camera**: Hand movement controls viewing angle

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AustinCheang/christmas-tree-photo-memory.git
   cd christmas-tree-photo-memory
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Download hand detection model:**
   ```bash
   npm run download-model
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:3010`
   - Allow camera access for gesture control

## Usage

### Upload Photos

1. Click the "Upload Photos" button in the bottom-left corner
2. Select up to 50 images from your device
3. Photos will appear as polaroids hanging on the tree

### Gesture Controls

1. Position your hand in front of the webcam (visible in top-right preview)
2. **Move your hand** to control the camera angle
3. **Open your hand** (spread fingers): Explode into chaos mode
4. **Close your fist**: Restore tree formation
5. **Show two hands**: Enter photo viewing mode
   - Left hand pinch: Previous photo
   - Right hand pinch: Next photo

### Play Show

1. After uploading photos, click the "Play" button at bottom center
2. Music will start and tree will explode
3. Click "Stop" to end the show

### Mouse Controls

When no hand is detected:
- **Click and drag** to rotate the view
- **Scroll** to zoom in/out

## Tech Stack

- React 19 with TypeScript
- React Three Fiber (R3F) for 3D rendering
- Three.js for WebGL graphics
- @react-three/drei for helpers
- @react-three/postprocessing for bloom effects
- MediaPipe for hand gesture detection
- Tailwind CSS for styling

## License

MIT
