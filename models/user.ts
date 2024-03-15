export interface User {
    _id: string,
    name: string,
    email: string,
    password: string
}

export interface AuthenticationResponse {
    user: {
        name: string
    },
    token: string
}