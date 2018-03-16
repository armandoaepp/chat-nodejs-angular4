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


        this._chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this._chatService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));
        console.log('user', this.user);
    }

    join(){
      console.log('join');
        this._chatService.joinRoom({user:this.user, room:this.room});
    }

    leave(){
      console.log('leave');

        this._chatService.leaveRoom({user:this.user, room:this.room});
    }

    sendMessage()
    {
      console.log('sendMessage');

        this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
    }

}

/*
import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class AppComponent {

  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg);
    });
  }


  private message = {
    author: 'armandoaepp',
    message: 'mensaje de prueba'
  }

  sendMsg() {
    console.log('new message from client to websocket: ', this.message);
    this.chatService.messages.next(this.message);
    this.message.message = '';
    // this.message = '';
  }

}*/