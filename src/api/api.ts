export function success<T>(data: T): Response {
    return new Response(
        JSON.stringify({
            success: true,
            data: data
        }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export function failure(message?: string, status: number = 500): Response {
    return new Response(
        JSON.stringify({
            success: false,
            error: message || 'An unknown error occurred'
        }),
        {
            status: status,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}
