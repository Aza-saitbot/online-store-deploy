import {makeAutoObservable} from "mobx";


export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user={}
        makeAutoObservable(this)
    }

    //ф-и, к-е изменяют состояние
    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }

    //computing function
    get isAuth (){
        return this._isAuth
    }
    get user (){
        return this._user
    }
}