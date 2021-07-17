import {makeAutoObservable} from "mobx";


export default class DeviceStore {
    constructor() {
        this._types=[]
        this._brands=[]
        this._devices=[]
        this._selectedType={}
        this._selectedBrand={}
        this._page=1
        this._totalCount=0
        this._limit=3
        makeAutoObservable(this)
    }

    //ф-и, к-е изменяют состояние
    setTypes(types){
        this._types = types
    }
    setBrands(brands){
        this._brands = brands
    }
    setDevice(device){
        this._devices = device
    }
    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand){
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page){
        this._page = page
    }

    setTotalCount(count){
        this._totalCount = count
    }


    //computing function
    get types (){
        return this._types
    }
    get devices (){
        return this._devices
    }
    get brands (){
        return this._brands
    }
    get selectedType (){
        return this._selectedType
    }
    get selectedBrand (){
        return this._selectedBrand
    }
    get page (){
        return this._page
    }
    get limit (){
        return this._limit
    }
    get totalCount (){
        return this._totalCount
    }


}