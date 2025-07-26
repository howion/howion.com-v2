export type WaitForPromiseResult<T, F> =
    | {
          success: true
          result: T
      }
    | {
          success: false
          error: F
      }

export async function waitForPromise<T, F = Error>(promise: Promise<T>): Promise<WaitForPromiseResult<T, F>> {
    try {
        const result = await promise
        return { success: true, result }
    } catch (e: any) {
        return { success: false, error: e }
    }
}
