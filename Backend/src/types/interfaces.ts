
export interface Token {
    handle: string
    password: string
}

export interface User {
    password: string
    name: {
        first: string
        last: string
    }
    emails?: string[]
    description: string
    pronouns: string[]
    // location: {
    //     universe: string
    //     galaxy: string
    //     solarSystem: string
    //     planet: string
    //     continent: string
    //     country: string
    //     state?: string
    //     region: string
    //     city?: string
    //     neighbourhood?: string
    //     street?: string
    //     houseNumber?: number
    // }
}

export interface Comment {
    handle: string
    content: string
}

export interface Post {
    name: string
    body: string
    poster: string
    comments: Comment[]
}
