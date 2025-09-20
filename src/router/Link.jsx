import { normalizePath } from './routerUtils.js'
import { useRouter } from './RouterContext.js'

export function Link({ to, children, className = '', activeClassName = '', ...props }) {
  const { navigate, path } = useRouter()
  const normalizedTarget = normalizePath(to)
  const isActive = path === normalizedTarget

  const combinedClassName = [className, isActive && activeClassName].filter(Boolean).join(' ')

  const handleClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    event.preventDefault()
    navigate(normalizedTarget)
  }

  return (
    <a href={normalizedTarget} onClick={handleClick} className={combinedClassName} {...props}>
      {children}
    </a>
  )
}