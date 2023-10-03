export class Response {
    error: string
    success: boolean

    constructor(success?: boolean, error?: string) {
        this.error = error || ""
        this.success = success ?? true
    }
}