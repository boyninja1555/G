import { Token } from "../types/interfaces"
import { tableExists, readTable } from "./database-manager"

const TOKENS: Record<string, Token> = {
    "example-token": {
        handle: "boyninja15",
        password: "Grant2013!",
    },
}

const MAX_TOKEN_LENGTH = 30

export function createToken(handle: string, password: string) {
    for (const token of Object.keys(TOKENS)) {
        if (TOKENS[token].handle === handle && TOKENS[token].password === password) {
            return token
        }
    }

    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let token = ""

    for (let index = 0; index < MAX_TOKEN_LENGTH; index++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    
    TOKENS[token] = {
        handle,
        password,
    }
    return token
}

export function verifyToken(token: string) {
    if (Object.prototype.hasOwnProperty.call(TOKENS, token)) {
        const credentials = TOKENS[token]

        if (!tableExists(`users/${credentials.handle}`, "json")) {
            return null
        }
        
        const userInfo = readTable(`users/${credentials.handle}`, "json")

        if (credentials.password !== userInfo.password) {
            return null
        }
        
        userInfo.name.handle = credentials.handle
        return userInfo
    } else {
        return null
    }
}
