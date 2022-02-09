import { Component } from '@angular/core';
// import { AssetService } from '../src/services/asset.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VE-Bid';
  // assetObj = {}
  // constructor(private asset: AssetService) {
  //   console.log('Called Constructor');
  // }
  // ngOnInit() {
  //  this.getAssets();
  // }

  // getAssets=()=>{
  //   try {
  //     this.asset.getAsset().subscribe(res=>{
  //       if (res) {
  //         this.assetObj = res.data
  //         console.log(this.assetObj);
          
  //       } else {
  //         console.log('data not found');
          
  //       }
        
  //     })
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }

}
