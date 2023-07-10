import { Component, NgZone, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataBaseService } from 'src/app/services/db/data-base.service';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent{
  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();
  source = '';
  selectedValue: string;
  retimg: any;
  curFile?: File;
  saveVal: boolean= false;
  imageData: any;
  tooltipMessage = "Please Login to save this data for future use."
  submit: boolean = false;
  greenSlider: any ;
  redSlider: any;
  private subscription1: Subscription;
  name: string = "";
  blueSlider: any;
  greenSliderEn: boolean = true;
  redSliderEn: boolean = true;
  private subscription: Subscription;
  blueSliderEn: boolean = true;
  loggedIn: boolean = false;
  ;
  types=[
    {
      value: "1",
      viewValue: "Protan"
    },
    {
      value: "2",
      viewValue: "Deutan"
    },
    {
      value: "3",
      viewValue: "Tritan"
    },
    {
      value: "4",
      viewValue: "Custom"
    }
  ]
  constructor( private db: DataBaseService, private sanitizer: DomSanitizer, private zone: NgZone) {
    this.selectedValue = "";
    this.subscription = this.db.getGoHome().subscribe(value => {
      this.source = '';
    })
    // this.checkLoginStatus();
    this.subscription1 = this.db.getLoginStatus().subscribe(res=>{
      if(res){
        if(this.db.getLocalData('user')){
          let val = this.db.getLocalData('user')
          this.name = val.name;
          this.loggedIn = true;
          this.setParamVal()
        }
      }
      else {
        this.name = "";
        this.loggedIn = false;
      }
    })
    if(this.db.getLocalData('user')){
      let val = this.db.getLocalData('user')
      this.name = val.name;
      this.loggedIn = true;
      this.setParamVal()
    }
  }

  setParamVal() {
    let obj = this.db.getLocalData('params')
    if(!obj) {}
    else{
      this.selectedValue = obj.selectedValue;
      this.blueSlider = obj.blueSlider;
      this.redSlider = obj.redSlider;
      this.greenSlider = obj.greenSlider;
    }
  }

  updateSource($event: any){
    this.submit = false;
    this.source = ''
    this.image($event.target['files'][0]);
  }
  resetInput(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      target.value = '';
    }
  }

  savCh(){
    console.log(this.saveVal)
  }

  formatLabel(value: number){
    return value;
  }
  onChipClick(value: any){
    switch(value){
      case '1': 
        this.redSliderEn = true;
        this.blueSliderEn = true;
        this.greenSliderEn = true
        this.redSlider = 247;
        this.greenSlider = 75;
        this.blueSlider = 0;
        this.blueSliderEn = false;
        break;
      case '2':
        this.redSliderEn = true;
        this.blueSliderEn = true;
        this.greenSliderEn = true
        this.redSlider = 9;
        this.greenSlider = 181;
        this.blueSlider = 0;
        this.blueSliderEn = false;
        break;
      case '3':
        this.redSliderEn = true;
        this.blueSliderEn = true;
        this.greenSliderEn = true
        this.redSlider = 0;
        this.greenSlider = 0;
        this.blueSlider = 206;
        this.redSliderEn = false;
        this.greenSliderEn = false;
        break;
      case '4':
        this.redSliderEn = true;
        this.blueSliderEn = true;
        this.greenSliderEn = true
        this.redSlider = 0;
        this.greenSlider = 0;
        this.blueSlider = 0;
        break;
      default:
        console.log('No value Exist');
    }
  }
  image(file: File){
    this.curFile = file;
    let reader = new FileReader;
    reader.onload = (e: any) =>{
      this.source = e.target.result;
      this.onChange.emit(file)
    };
    reader.readAsDataURL(file)
  }

  sanatize(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  _arrayBufferToBase64( buffer: any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  onSubmit(){
    let obj = {
      'selectedValue': this.selectedValue,
      'redSlider': this.redSlider,
      'blueSlider': this.blueSlider,
      'greenSlider': this.greenSlider
    }
    this.db.setParamLocal(obj)
    if(this.saveVal) this.db.setParamVal(this.name,obj).subscribe((res: any)=>{
      return true;
    })
    if(this.curFile)
      this.db.upload(this.curFile, obj).subscribe( (res: any) =>{
        let byteArray = new Uint8Array(res);
        let charString = byteArray.reduce((data: any, byte:any) => {
          return data + String.fromCharCode(byte);
        },'');
        let base64String = btoa(charString);
        this.imageData = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64String);
        this.submit = true
    })
  }

  downloadImage() {
    let filename = window.prompt('Enter a filename:', 'image');
    if(filename){
      let link = document.createElement('a');
      link.href = this.imageData['changingThisBreaksApplicationSecurity'];
      link.download = filename + '.jpeg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

}
