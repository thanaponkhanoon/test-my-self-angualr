import { Component, OnInit } from '@angular/core';
import { OderService} from '../../services/oder.service'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-addmin-order',
  templateUrl: './addmin-order.component.html',
  styleUrls: ['./addmin-order.component.css']
})
export class AddminOrderComponent implements OnInit {

  orders:any
  img:string = " "
  
  constructor(private od:OderService,private modalService: NgbModal) {this.onLoading() }

  ngOnInit(): void {
  }
  onLoading(){
    try{
      this.od.getOders().subscribe(
        data =>{
          this.orders = data
        },
        err =>{
           console.log(err);
        }
      )
    }catch(err){
      console.log(err);
      
    }
  }
  openLg(content:any,img:string) {
    this.img = img
    this.modalService.open(content, { size: 'lg' });
  }

  conferm(i:number){
    this.orders[i].status = "success"
    this.od.PutOrder(this.orders[i]).subscribe(
      data =>{
        console.log(data)
      },
      err =>{
        console.log(err);
        
      }
    )
  }
}
