import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { LogBox, SafeAreaView, StatusBar } from 'react-native'
import { runAllConfigurations } from './src/config/config'
import AppProvider from './src/hooks'
import Home from './src/screens/Home'
import { themes } from './src/utils/theme/themes'

runAllConfigurations()

LogBox.ignoreLogs([
  'Setting a timer'
])

export default function App() {
  return (
    <>
      <ExpoStatusBar
        style="light"
        backgroundColor={themes.light.colors.primaryDark}
      />
      <AppProvider>
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
          <Home />
        </SafeAreaView>
      </AppProvider>
    </>
  )
}