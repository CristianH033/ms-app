export const setMetaThemeColor = (
  colorScheme: 'light' | 'dark' | 'auto',
  light: string,
  dark: string
) => {
  const metaThemeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][media="(prefers-color-scheme: light)"],meta[name="theme-color"]'
  )
  const darkMetaThemeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]'
  )

  const lightColorValue = colorScheme === 'auto' || colorScheme === 'light' ? light : dark
  const darkColorValue = colorScheme === 'auto' || colorScheme === 'dark' ? dark : light

  metaThemeColor?.setAttribute('content', lightColorValue)
  darkMetaThemeColor?.setAttribute('content', darkColorValue)
}

export const setRootColorScheme = (colorScheme: 'light' | 'dark' | 'auto') => {
  const value = colorScheme === 'auto' ? 'light dark' : colorScheme
  document.documentElement.style.setProperty('color-scheme', value)
}
