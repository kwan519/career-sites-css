import { createContext, useContext } from 'react'

export type ThemeContent = {
  theme: ITheme | undefined
  siteId: string | undefined
}
export const ThemeContext = createContext<ThemeContent>({
	theme: undefined,
  siteId: undefined
})
export const useThemeContext = () => useContext(ThemeContext)