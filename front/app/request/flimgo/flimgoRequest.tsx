import Requester from "../requester";
import { RefreshInput, LoginInput } from "../../../../back/inputs/inputs"
import { LoginOutput } from "../../../../back/outputs/outputs"
import { readdirSync } from "fs";

function storeTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
}

export default class FlimgoRequester extends Requester {
    constructor() {
        if (process.env.NEXT_PUBLIC_FLIMGO_URL != undefined)
            super(process.env.NEXT_PUBLIC_FLIMGO_URL)
        else throw "Missing api url" // TODO disconnect user and popup no internet or service unavailable
        this.refreshFunction = async () => {
            let body: RefreshInput = {
                accessToken: this.bearerToken,
                refreshToken: this.refreshToken
            }
            const res = await this.fetch("authentication/refresh", {
                method: "POST",
                body: JSON.stringify(body)
            })
            if (res.status == 201) {
                const bodyRes: LoginOutput = await res.json()
                storeTokens(bodyRes.accessToken, bodyRes.refreshToken)
            } else throw "Refresh fail" // TODO manage error, disconnect user and ask for reconnect
        }
    }

    public async login(username: string, password: string): Promise<void> {
        const body: LoginInput = {
            email: username,
            password: password
        }
        const res = await this.fetch("authentication/login", {
            method: "POST",
            body: JSON.stringify(body)
        })

        if (res.status == 201) {
            let resBody: LoginOutput = await res.json()

            storeTokens(resBody.accessToken, resBody.refreshToken)
        } else throw "Auth error" // TODO exception
    }
}