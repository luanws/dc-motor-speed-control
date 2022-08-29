import React from 'react'
import { SettingsProvider } from './settings'
import { ThemeProvider } from './theme'

const AppProvider: React.FC = ({ children }) => (
  <SettingsProvider>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </SettingsProvider>
)

export default AppProvider
