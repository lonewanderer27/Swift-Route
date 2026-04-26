import config from "@/tamagui.config";
import { TamaguiProvider } from 'tamagui'
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <Stack />
    </TamaguiProvider>
  )
}
