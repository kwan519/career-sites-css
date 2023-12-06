import { createContext, useContext } from 'react'

export type ThemeContent = {
  theme: ITheme | undefined
}
export const ThemeContext = createContext<ThemeContent>({
	theme: undefined
})
export const useThemeContext = () => useContext(ThemeContext)