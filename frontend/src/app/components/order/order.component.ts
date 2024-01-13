import { Component, OnInit } from '@angular/core';
import { OderService} from '../../services/oder.service'


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OderComponent implements OnInit {
  orders:any
  status: boolean[] = []; 
  constructor(private od:OderService) {this.onLoading() }

  ngOnInit(): void {
  }

  onLoading(){
    try{
      this.od.getOdersByUserId().subscribe(
        data =>{
          console.log(data.length);
          this.orders = data
          for (let i = 0; i < data.length; i++) {
            this.status[i] = false
            console.log(this.status[i]);
          }
        },
        err =>{
           console.log(err);
        }
      )
    }catch(err){
      console.log(err);
    }
  }


  onChangeImg(e:any,i:number){
    if(e.target.files.length > 0){
      const file = e.target.files[0]
      var pattern = /image-*/
      const reader = new FileReader()
      if(!file.type.match(pattern)){
        alert("invalid format")
      }else{
        reader.readAsDataURL(file)
        reader.onload = () =>{
          this.orders.statusbutton = true
          this.status[i] = true;
          console.log(this.status[i]);
          this.orders[i].img = reader.result       
        }
      }
    }
  }
 putOrder(i:number){
   this.orders[i].status = "confirmation"
  this.od.PutOrder(this.orders[i]).subscribe(
    data =>{
      console.log(data)
      this.status[i] =false;
    },
    err =>{
      console.log(err);
      
    }
  )
 }

 deleteOrder(i:number){
  this.od.DeleteOrder(this.orders[i]).subscribe(
    data =>{
      window.location.reload();
    },
    err =>{
      console.log(err);
    }
  )
 }

}
