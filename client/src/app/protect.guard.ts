import { CanActivateFn, Router } from '@angular/router';

import {inject} from '@angular/core';
import { UserService } from '../services/user.service';


export const protectGuard: CanActivateFn = (route, state) => {
  let status:boolean;
  const router=inject(Router);
  const userService=inject(UserService);
  userService.getUserLoginStatus().subscribe({
    next:(getUserLoginStatus)=>{
      status=getUserLoginStatus}
    })
    console.log(status)
    if(status){
      return true;
    }else{
      return router.navigate(['/login'])
    }
  
  
};
