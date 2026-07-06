import { Canvas } from "@react-three/fiber";
import DustField from "./DustField";

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
      <DustField />
    </Canvas>
  );
}
