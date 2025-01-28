export class User {
    id: number
    firstName: string
    lastName: string
    userName: string
    email: string
    password: string
    image?: string

    constructor( id: number, firstName: string, lastName: string, userName: string, email: string, password: string, image: string) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
        this.email = email
        this.password = password
        this.image = image
    }

}