import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelpdeskService } from 'src/app/core/services/helpdesk.service';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { BaseService } from 'src/app/core/services';


@Component({
  selector: 'app-ticket-system',
  templateUrl: './ticket-system.component.html',
  styleUrls: ['./ticket-system.component.css']
})
export class TicketSystemComponent implements OnInit {

  content = '';
  subject = '';
  ticketID = '';
  replyContent = '';
  reply;

  show_Reply_Editor = false;
  openTicket = true;

  blured = false
  focused = false

  constructor(
    public dialogRef: MatDialogRef<TicketSystemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public helpDesk: HelpdeskService,
    public baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.Editor();
    this.TicketData();

  }

  async cancel() {
    this.dialogRef.close();
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  async Editor() {
    try {
      if (this.data.Ticketstatus != 'Closed') {
        this.show_Reply_Editor = true;
      } 
    } catch (error) {
      
    }
  }

  async TicketData() {
    let result;
    try {
      result = await this.helpDesk.getTicketData(this.data)

      this.subject = result.body.data.rows[0].subject;
      this.ticketID = result.body.data.rows[0].ticket_id;
      let value = result.body.data.rows[0].content;

      this.content = value.replace("\`", "");

    } catch (error) {
      throw new error('Ticekt Data: Ticket System: ' + error);
    }
  }


  async replyTicket() {

    let payload = {
      ticketID: this.data.ticket_id,
      userID: sessionStorage.getItem('userID'),
      replyContent:this.replyContent + '<br>' + '<br>' + this.content
    }
    console.log('reply ticket::' + JSON.stringify(payload))
    let result;
    try {
      result = await this.helpDesk.replyTicket(payload);

      if (result.body.status == 1 && result.body.data.affectedRows == 1) {
        this.baseService.showSnackBar(' User Submit Ticket Successfully', 'Success', 0);
        this.replyContent = '';
        this.TicketData();
        
        this.closeTable();
        this.delay(5000);      
        this.openTable();

      } else {
        this.baseService.showSnackBar('Something Went Wrong During Ticket Reply', result.body.status + ' : ' + result.body.info , 0);
      }
    } catch (error) {
      throw new error('Ticket Reply Error: Ticket System: ' + error);
    }
  }

  async ticketClosed() {

    let payload = {
      ticketID: this.data.ticket_id
    }
    let result;
    try {
      result = await this.helpDesk.ticketClosed(payload);

      if (result.body.status == 1 && result.body.data.affectedRows == 1) {
        this.baseService.showSnackBar('Ticket Closed Successfully', 'Success', 0);
        this.cancel();
      } else {
        this.baseService.showSnackBar('Something Went Wrong During Ticket Closed', result.body.status + ' : ' + result.body.info , 0);
      }
    } catch (error) {
      throw new error('Ticket Closed: Ticket System: ' + error);
    }
  }

  openTable = async () => {
    this.openTicket = true;
   }
 
   closeTable = async () => {
     this.openTicket = false;
   }


  created(event) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }

  addBindingCreated(quill) {
    quill.keyboard.addBinding({
      key: 'b'
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING B', range, context)
    })

    quill.keyboard.addBinding({
      key: 'B',
      shiftKey: true
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING SHIFT + B', range, context)
    })
  }

  editormodules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

}