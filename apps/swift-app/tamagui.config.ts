import { defaultConfig } from "@tamagui/config/v5";
import { createAnimations } from "@tamagui/animations-react-native";
import { createTamagui } from "tamagui";

const animations = createAnimations({
  bouncy: { type: "spring", damping: 9, mass: 0.9, stiffness: 120 },
  medium: { type: "spring", damping: 16, stiffness: 90, mass: 0.8 },
  quick: { type: "spring", damping: 25, mass: 1, stiffness: 550 }
});

const config = createTamagui({
  ...defaultConfig,
  animations,
});

type Conf = typeof config;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

export default config;
