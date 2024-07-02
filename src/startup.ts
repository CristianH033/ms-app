export const removeOverlay = () => {
  const overlay = document.querySelector<HTMLDivElement>('div#loading-overlay')

  // add fadeOut animation to the loading overlay then remove it
  if (overlay) {
    overlay.addEventListener('animationend', () => {
      overlay.style.display = 'none'
      overlay.style.animation = ''
      overlay.remove()
    })

    overlay.style.animation = 'fadeOut 0.5s forwards'

    setTimeout(() => {
      overlay.remove()
    }, 2000)
  }
}
