import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';
import { HelpdeskService } from 'src/app/core/services/helpdesk.service';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { MatDialog } from '@angular/material/dialog';
import { TicketSystemComponent } from 'src/app/components/ticket-system/ticket-system.component';
import { Router } from '@angular/router';

// import 'quill-emoji/dist/quill-emoji.js'  

@Component({
  selector: 'app-helpdesk-contact-us',
  templateUrl: './helpdesk-contact-us.component.html',
  styleUrls: ['./helpdesk-contact-us.component.css']
})
export class HelpdeskContactUsComponent implements OnInit {

  menuItems = [];
  users = [];

  selectUser;
  selectMenu ='';
  content = '';
  subject = '';

  openTicketTable = true;
  blured = false
  focused = false
  modules = {}

  displayedColumns: string[] = ['ticket_id', 'TicketLoginID', 'TicketMenu', 'TicketSubject', 'TicketStatus', 'edit'];
  dataSource = [];

  constructor(
    public baseService: BaseService,
    public helpDesk: HelpdeskService,
    private dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getMenu();
    this.getUsers();
    this.getUserTicekts();
  }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async getMenu() {

    try {

      for (const menuItem of this.baseService.userMenuDetails) {
        this.menuItems.push(menuItem.menu);
      }
      this.menuItems.push('login');
      this.menuItems.push('others');
      // alert('menu::' + JSON.stringify(this.menuItems))

    } catch (error) {
      this.baseService.showSnackBar('Something Went Wrong getMenu', error, 0);
    }
  }

  async getUsers() {
    let payload = {
      accountID: this.baseService.userProfile.accountID
    };
    let result;

    try {
      result = await this.helpDesk.getUsers(payload);
      for (let i = 0; i < result.body.data.rows.length; i++) {
        let element = {
          userID: result.body.data.rows[i].user_id,
          loginID: result.body.data.rows[i].login_id,
          name: result.body.data.rows[i].name,
        }  
        this.users.push(element)
      }
    } catch (error) {
      this.baseService.showSnackBar('Something Went Wrong getusers', error, 0);
    }
  }

  async cancel() {
    try {
      this.selectMenu = '';
      this.selectUser = '';
      this.content = '';
      this.subject = '';
    } catch (error) {
      this.baseService.showSnackBar('Something Went Wrong', error, 0);
    }
  }

  async submitTicket() {

    let payload = {
      accountID: this.baseService.userProfile.accountID,
      user: sessionStorage.getItem('userID'),
      ComplainUser: this.selectUser.userID,
      menu: this.selectMenu,
      content: this.content,
      subject: this.subject
    }
    console.log('payload::' + JSON.stringify(payload))
    let result;
    try {
      if (this.selectMenu != '') {
        result = await this.helpDesk.submitDetails(payload);
      } else if(this.selectMenu === ''){
        this.baseService.showSnackBar(' User Submit Ticket Successfully', 'Success', 0);
      }
      

      if (result.body.status == 1 && result.body.data.affectedRows == 1) {
        this.baseService.showSnackBar(' User Submit Ticket Successfully', 'Success', 0);

        this.content = '';
        this.subject = '';
        this.selectMenu = '';
        this.selectUser ='';

        this.dataSource.length = 0 ;
        this.getUserTicekts();
        this.delay(5000);   
        this.closeTable();
        this.delay(5000);      
        this.openTable();
      } else {
        this.baseService.showSnackBar('Something Went Wrong During submit ticket', result.body.status + ' : ' + result.body.info , 0);
      }
    } catch (error) {
      throw new error('submit Ticket: helpdesk: ' + error);
    }
  }

  openTable = async () => {
   this.openTicketTable = true;
  }

  closeTable = async () => {
    this.openTicketTable = false;
  }


  async getUserTicekts() {
    let result;
    try {
      result = await this.helpDesk.getUserTickets();
      let ELEMENT_DATA = [];
      for (let i = 0; i < result.body.data.rows.length; i++) {
        const model = {
          ticket_id: result.body.data.rows[i].ticket_id,
          TicketLoginID: result.body.data.rows[i].login_id,
          TicketMenu: result.body.data.rows[i].menu,
          TicketSubject: result.body.data.rows[i].subject,
          TicketUser: result.body.data.rows[i].complain_user_id,
          TicketStatus: result.body.data.rows[i].status
        }
        ELEMENT_DATA.push(model)
      }
      this.dataSource = ELEMENT_DATA;

    } catch (error) {
      throw new error('getUserComplain: ' + error);
    }
  }


  // ********for Editor ********//

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



  // ********************//


  async openDialogError(ticket_id, TicketStatus): Promise<void> {
    let payload;
    try {
      payload = { ticket_id: ticket_id, Ticketstatus: TicketStatus};
      const dialogRef = await this.dialog.open(TicketSystemComponent, { data: payload });

      dialogRef.afterClosed().subscribe(async (data) => {
        console.log('The dialog was closed');
      });
    } catch (error) {
      throw new error('openDialogError: ' + error);
    }

  }


}