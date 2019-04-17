import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {SimpleCrypt} from 'ngx-simple-crypt';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  formG = new FormGroup({
    hash: new FormControl('My4IMTACc3tVHApgIgw3FxECCVRtP01NcigtKjsNLkcjXhoiDh4UBCpWe0EoDwJiKGUBEhEcB0MvAygoajA0BSgfXwxpWjFWdH0ILiAtHwNTWWYEBy9nPxYOMV4UIh5mBHglPiN5bTFRHAQ0JQI+dCY2JFkqUX0jb2h1JBcGMx06AQ5nOCA+YgJFGyNmNDcYAmMdEx4rPD0hBw1fHRd5Tg0eNBx8JnIBFFAEUCAFexwGAURTUT4zW2Q7AD8FbScENgcnIzISLiAdL1oiZAECZC11ETEgWzdeYTIEbWNzLhMjHFp4I14aIggfEBoQNHxHODwFOgcVHXQoOXxeKXZ8LX8WNxwCMgkWYmQ+C3RWKiogRzEZeQQGVBM0HWs='),
    tokenStamp: new FormControl('VldCS1RFNUsxREQweER1YXUwZTg3dz09O0JCQ3VJbzBqN21LbC1WdElnNXFxV1BTSw==')
  });
  hashControl = this.formG.controls['hash'] as FormControl;
  tokenStampControl = this.formG.controls['tokenStamp'] as FormControl;
  decoded = {};

  simpleCrypt = new SimpleCrypt();

  constructor(){
  }

  decode(hash: string, ts: String){
    console.log('decoding...');
    try{
      this.decoded = JSON.parse(b64DecodeUnicode(this.simpleCrypt.decode(b64ToUtf8(ts),hash)));
    }catch(e){
      this.decoded = {
        "decodeStatus": "error"
      };
    }
  }

  ngOnInit(){
    this.decode(this.hashControl.value,this.tokenStampControl.value);

    this.hashControl.valueChanges.subscribe(value=>{
      if(value){
        this.decode(value,this.tokenStampControl.value);
      }
    })

    this.tokenStampControl.valueChanges.subscribe(value=>{
      if(value){
        this.decode(this.hashControl.value,value);
      }
    })
  }
}

export function b64ToUtf8(str) {
    return decodeURIComponent(atob(str));
}


export function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
    }));
}