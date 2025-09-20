export function normalizePath(path) {
  if (!path) {
    return '/'
  }

  const trimmed = path.trim()
  if (trimmed === '' || trimmed === '/') {
    return '/'
  }

  const [pathname] = trimmed.split('?')
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const withoutTrailingSlash = normalized.replace(/\/+$/, '')
  return withoutTrailingSlash === '' ? '/' : withoutTrailingSlash
}