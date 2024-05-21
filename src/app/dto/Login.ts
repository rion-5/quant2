import { User } from "./User";

export class Login{
    success: boolean = false;
    user: User = new User;
    message: string = 'Login failed.';
    token: string = '';
}