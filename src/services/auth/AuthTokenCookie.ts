const AUTH_TOKEN_COOKIE_NAME = 'auth_token'
const AUTH_TOKEN_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export function setAuthTokenCookie(token: string): void {
    if (typeof document === 'undefined') {
        return
    }

    const encodedToken = encodeURIComponent(token)
    document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=${encodedToken}; Path=/; Max-Age=${AUTH_TOKEN_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`
}

export function getAuthTokenCookie(): string | null {
    if (typeof document === 'undefined') {
        return null
    }

    const cookies = document.cookie ? document.cookie.split('; ') : []
    const tokenCookie = cookies.find((cookie) => cookie.startsWith(`${AUTH_TOKEN_COOKIE_NAME}=`))

    if (!tokenCookie) {
        return null
    }

    return decodeURIComponent(tokenCookie.substring(AUTH_TOKEN_COOKIE_NAME.length + 1))
}

export function clearAuthTokenCookie(): void {
    if (typeof document === 'undefined') {
        return
    }

    document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`
}
