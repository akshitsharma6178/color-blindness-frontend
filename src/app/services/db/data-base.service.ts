import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  url = 'color-blindness-backend.vercel.app'
  private goHome = new BehaviorSubject<boolean>(false);
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  set(keys: any, value: any){
    let key = CryptoJS.enc.Utf8.parse(keys);
    let iv = CryptoJS.enc.Utf8.parse(keys);
    let enc = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key, 
    {
      keySize: 128/8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return enc.toString();
  }

  setUserData(data: any){
    localStorage.setItem('user',JSON.stringify(data))
  }

  removeUserData(){
    localStorage.removeItem('user');
  }

  getLocalData(key: string): any {
    let val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null; 
  }

  getData(){
    let data = this.http.get(`https://${this.url}/`)
    return data
  }

  sendImg(data: any){
    this.http.post(`https://${this.url}/python`,data).subscribe(resp => {
      return resp;
    })
  }

  upload(file: File, obj: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('obj', JSON.stringify(obj))


    let res =  this.http.post(`https://${this.url}/upload`, formData, {responseType: 'arraybuffer'});
    return res
  }

  setGoHome (value: boolean){
    this.goHome.next(value);
  }

  setLoggedIn (value: boolean){
    this.isLoggedIn.next(value)
  }

  getLoginStatus(){
    return this.isLoggedIn.asObservable();
  }

  getGoHome(){
    return this.goHome.asObservable();
  }

  login(user:string, pass:string) {
    const body = {user, pass}
    return this.http.post(`https://${this.url}/login`, body);
  }

  register(name: string, user:string, pass:string) {
    const body = {name, user, pass}
    return this.http.post(`https://${this.url}/register`, body);
  }

  setParamVal(email: string, sliderDat: any){
    // let data = JSON.stringify(sliderDat) 
    const body = {email, sliderDat}
    return this.http.post(`https://${this.url}/setParmVal`, body)
  }

  getParamVal(name: string) {
    const body = {name}
    return this.http.post(`https://${this.url}/getParmVal`, body)
  }

  removeParam(name: string) {
    localStorage.removeItem(name);
  }

  getFile(path: any) {
    return this.http.post(`https://${this.url}/file`, path)
  }

  setParamLocal(data: any){
    localStorage.setItem('params', JSON.stringify(data));
  }

}
