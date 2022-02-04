import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppserviceService } from '../appservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activeItem='file';
  errorMessage='';
  data:any=[];
  datacolumns=['userId','id','title','body'];
  lastUpdated='';
  uploading=false;
  successMessage='';



  constructor(private appService:AppserviceService,private router:Router) { }

  ngOnInit(): void {
    if(this.appService.userName){
      this.router.navigate(['/login']);
    }
    else{
      this.appService.getData().subscribe((res:any)=>{
        if(res){
          if(res.user_file){
            this.data=res.user_file;
            
          }
          if(res.last_updated){
            this.lastUpdated=res.last_updated;
          }
        }
      },err=>{
        console.log(err);
      })
    }
  }
  logout(){
    this.appService.userName='';
    this.router.navigate(['/login']);
  }
  get userName(){
    return this.appService.userName;
  }
  toggle(type:string){
    if(this.activeItem != type){
      this.activeItem=type;
    }
  }
  get users(){
    let items:any[]=[];
    for(let user of this.data){
      if(!items.includes(user.userId)){
        items.push(user.userId);
      }
    }
    return items.length;
  }
  uploadFile(event:any){
    if(event.target.files && event.target.files[0]){
      let file=event.target.files;
      var reader= new FileReader();
      reader.readAsText(file[0],"UTF-8");
      reader.onload=()=>{
        const data:string= reader.result as string;
        try{
          var obj=JSON.parse(data);
          this.uploading=true;
          this.appService.upload(obj).subscribe((res:any)=>{
            this.data=res.data;
            this.lastUpdated=res.last_updated;
            this.uploading=false;
            this.successMessage='File uploaded successfully.';
            setTimeout(() => {
              this.successMessage='';
              
            }, 3000);

          })

        }
        catch(e){
          this.uploading=false;
          this.errorMessage='Invalid JSON file content. please check file content.';
          setTimeout(() => {
            this.errorMessage='';
            
          }, 3000);
          event.srcElement.value=null;
        }
      }
    }

  }

}
