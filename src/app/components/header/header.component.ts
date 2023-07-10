import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataBaseService } from 'src/app/services/db/data-base.service';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';


export interface DialogData {
  uname: string;
  pass: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  uname: string='';
  pass: string='';
  aboutText: string = "Our website is dedicated to providing a more inclusive experience for individuals with color blindness. We understand that color blindness can make it difficult to navigate software and websites, which is why we've developed a Colorblindness Selection Menu that makes it easy to customize the colors on your screen to suit your specific needs. Our mission is to make technology accessible for everyone, and we're committed to ensuring that individuals with color blindness can enjoy the same level of usability and functionality as everyone else. With our Colorblindness Selection Menu, you can enjoy a more personalized and user-friendly experience"
  config: MatSnackBarConfig = new MatSnackBarConfig();
  loggedIn : boolean = false;
  name: string = ""
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private db: DataBaseService) { 
    this.config.panelClass = ['custom-snackbar']
    this.config.horizontalPosition = 'center';
    this.config.verticalPosition = 'bottom';
    if(this.db.getLocalData('user')){
      let val = this.db.getLocalData('user')
      this.name = val.name;
      this.uname = val.email;
      this.loggedIn = true;
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(loginDialog,{
      width: '250px',
      data: {uname: this.uname, pass: this.pass}
    })
    dialogRef.afterClosed().subscribe(res => {
        this.uname = res.uname.value;
        this.pass = res.pass.value;
        let encpass =  this.db.set('202192602$#@MUNAK', this.pass)
        if(res.conf_pass.value){
          if (this.pass === res.conf_pass.value) {
            this.db.register(res.name.value, this.uname, encpass).subscribe((res: any) => {
              if (res.message === 'User registered successfully') {
                this.openCustomSnackBar(res.message);
                this.loggedIn = true;
                this.name = res.name.value.toUpperCase();
                let obj = {
                  'name': this.name,
                  'email': this.uname
                }
                this.db.setUserData(obj)
                this.db.setLoggedIn(true);
              } else {
                this.openCustomSnackBar(res.message);
              }
            }, err => {
              console.error(err);
              this.openCustomSnackBar('Internal server error'); 
            });
          } else {
            this.openCustomSnackBar('Passwords do not match'); 
          }
        }

  else{
    this.db.login(this.uname, encpass).subscribe((res: any) => {
      if (res.login) {
        this.loggedIn = true;
        this.name = res.name.toUpperCase();
        let obj = {
          'name': this.name,
          'email': this.uname
        }
        this.db.setUserData(obj)
        this.db.setLoggedIn(true);
      } else {
        this.openCustomSnackBar(res.message); 
      }
    }, err => {
      console.error(err);
      this.openCustomSnackBar('Internal server error'); 
    });
  }
    })
  }

  logOut(){
    this.loggedIn = false
    this.db.removeUserData();
    this.db.setLoggedIn(false);
    this.db.removeParam('params');

  }
  goHome(){
    this.db.setGoHome(false);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.openDialog()
  }

  openSnackBar(){
    this._snackBar.open(this.aboutText,'Close', this.config);
  }
  openCustomSnackBar(msg: any){
    this._snackBar.open(msg,'Close');
  }

}

@Component ({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html'
})
 export class loginDialog{
  register:boolean=false;
  data= {
    name: new FormControl(null, [Validators.required]),
    uname: new FormControl(null, [Validators.email, Validators.required]),
    pass: new FormControl(null, [Validators.required]),
    conf_pass: new FormControl(null)
  }
  constructor(public dialogRef: MatDialogRef<HeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  modeChange(){
    this.register = !this.register
    this.data.uname.reset()
    this.data.name.reset()
  }
 }

