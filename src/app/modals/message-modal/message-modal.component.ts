import { Component, OnInit } from '@angular/core';

export interface DisplayMessage {
  title: string;
  message: string;
}
@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {

  initialState: DisplayMessage;
  constructor() { }

  ngOnInit(): void {
  }

}
