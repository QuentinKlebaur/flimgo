import { RequestInit } from "next/dist/server/web/spec-extension/request";

export async function request() {
    fetch("oui", )
    let a : RequestInit
}

export default class Requester {
    baseURL: string
    bearerToken: string
    refreshToken: string
    refreshFunction: () => Promise<void>

    constructor(baseURL: string) {
        this.baseURL = baseURL
        this.bearerToken = ""
        this.refreshToken = ""
        this.refreshFunction = async () => {}
    }

    async fetch(endpoint: string, init?: globalThis.RequestInit): Promise<Response> {
        let header = new Headers(init?.headers)
        header.append("Content-Type", "application/json")
        let myInit = {
            body: init?.body,
            method: init?.method,
            headers: header
        }
        return await fetch(this.baseURL + endpoint, myInit);
    }

    async fetchAuth(endpoint: string, init?: globalThis.RequestInit): Promise<Response> {
        let header = new Headers(init?.headers)
        header.append("Authorization", `Bearer ${this.bearerToken}`)
        let myInit: globalThis.RequestInit = {
            body: init?.body,
            method: init?.method,
            headers: header
        }
        let res = await fetch(this.baseURL + endpoint, myInit)
        if (res.status == 401)
            this.refreshFunction()
        else
            return res;
        header = new Headers(init?.headers)
        header.append("Authorization", `Bearer ${this.bearerToken}`)
        myInit = {
            body: init?.body,
            method: init?.method,
            headers: header
        }
        return await this.fetch(endpoint, myInit)
    }
}