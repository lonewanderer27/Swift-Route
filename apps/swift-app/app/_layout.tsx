import config from "@/tamagui.config";
import { TamaguiProvider, ToastProvider } from 'tamagui'
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <ToastProvider>
        <Stack />
      </ToastProvider>
    </TamaguiProvider>
  )
}
