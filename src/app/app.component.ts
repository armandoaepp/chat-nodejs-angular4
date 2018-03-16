import { Component } from '@angular/core';
import {ChatIoService} from './chat-io.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers:[ChatIoService]
})
export class AppComponent {

    user:String;
    room:String;
    messageText:String;
    messageArray:Array<{user:String,message:String}> = [];

    constructor(private _chatService:ChatIoService){
        this._chatService.newUserJoined()

        .subscribe(data=> this.messageArray.push(data));
        this._chatService.newMessageReceived()

        .subscribe(data=>this.messageArray.push(data));
        console.log('user', this.user);
    }
    sendMessage()
    {
      console.log('sendMessage');

        this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
        this.messageText = null ;
    }

}