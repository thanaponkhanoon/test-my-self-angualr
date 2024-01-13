import { Component, OnInit } from '@angular/core';
import {FormControl , FormGroup,Validators} from '@angular/forms'
import { ProductsService} from '../../services/product.service'

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
productType :string[] = ['ไม้คลุมดิน','ไม้กระถาง','ไม้น้ำ','ไม้พุ่มสูง']
  constructor(private ps:ProductsService) { }
productForm = new FormGroup({
  type: new FormControl('',[Validators.required]),
  name: new FormControl('',[Validators.required]),
  detail: new FormControl('',[Validators.required]),
  file: new FormControl('',[Validators.required]),
  price: new FormControl('',[Validators.required]),
  takecare:new FormControl('',[Validators.required]),
  size:new FormControl('',[Validators.required]),
  img: new FormControl('',[Validators.required]),
})

previewLoaded : boolean = false
  ngOnInit(): void {
  }
  addProduct(){
    this.ps.addProduct(this.productForm.value).subscribe(
      data =>{
        console.log(data);
        alert('Product added successfully')
        this.productForm.reset()
      },
      err =>{
        console.log(err);
        
      }
    )
  }

  onChangeImg(e:any){
  if(e.target.files.length > 0){
    const file = e.target.files[0]
    var pattern = /image-*/
    const reader = new FileReader()
    if(!file.type.match(pattern)){
      alert("invalid format")
      this.productForm.reset()
    }else{
      reader.readAsDataURL(file)
      reader.onload = () =>{
        this.previewLoaded = true
        this.productForm.patchValue({
          img:reader.result
        })
      }
    }
  }
}
get fromdata(){
  console.log(this.productForm.controls);
  return this.productForm.controls
}

  resetForm(){
  this.productForm.reset()
  this.previewLoaded = false
}
}
