export const removeOverlay = () => {
  const overlay = document.getElementById('loading-overlay')

  // add fadeOut animation to the loading overlay then remove it
  if (overlay) {
    overlay.addEventListener('animationend', () => {
      overlay.style.display = 'none'
      overlay.style.animation = ''
      console.log('Remove overlay after animation end')
      overlay.remove()
    })

    setTimeout(() => {
      console.log('Force remove overlay after 1 seconds')
      overlay.remove()
    }, 2000)

    overlay.style.animation = 'fadeOut 0.5s forwards'
  }
}
