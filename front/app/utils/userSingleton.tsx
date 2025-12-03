import { UserOutput } from "../../../back/outputs/outputs";

export default class UserSingleton {
    static username: string
    static email: string
    static loggedin: boolean = false

    static setUserData(userData: UserOutput) {
        this.username = userData.username
        this.email = userData.email
        this.loggedin = true
    }

    static disconnect() {
        this.loggedin = false
        this.username = ""
        this.email = ""
    }
}