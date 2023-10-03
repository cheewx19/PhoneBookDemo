import { Response } from "./response"

export class GetResponse<T> extends Response {
    value: T

    constructor(value: T, success?: boolean, error?: string) {
        super(success, error)
        this.value = value
    }
}