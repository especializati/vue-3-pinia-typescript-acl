import Permission from "./Permission";

export default class User {
    // private _permissions: Permission[] = []

    constructor (
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly password?: string,
        public _permissions: Permission[] = []
    ) {}

    addPermission(permission: Permission): void {
        this._permissions.push(permission)
    }

    syncPermissions(permissions: Permission[]): void {
        this._permissions = permissions
    }

    get permissions(): Permission[] {
        return this._permissions
    }
}