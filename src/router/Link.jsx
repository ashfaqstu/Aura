import { normalizePath } from './routerUtils.js'
import { useRouter } from './RouterContext.js'

export function Link({ to, href, children, className = '', activeClassName = '', ...props }) {
  const { navigate, path } = useRouter()
  const hasRouterTarget = typeof to === 'string' && to.trim() !== ''
  const normalizedRouterTarget = hasRouterTarget ? normalizePath(to) : null
  const isActive = hasRouterTarget && path === normalizedRouterTarget

  const combinedClassName = [className, isActive ? activeClassName : ''].filter(Boolean).join(' ')

  const handleClick = (event) => {
    if (!hasRouterTarget) {
      return
    }

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
    navigate(normalizedRouterTarget)
  }

  const targetHref = hasRouterTarget ? normalizedRouterTarget : href ?? '#'

  return (
    <a href={targetHref} onClick={handleClick} className={combinedClassName} {...props}>
      {children}
    </a>
  )
}
