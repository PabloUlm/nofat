export interface IUser {
    email: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    uid?: string;
}

export interface IUserData {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    firstName?: string;
    secondName?: string;
}
