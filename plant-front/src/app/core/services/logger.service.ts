import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoggerService {
    log(msg: any) {
        if(environment.production) {
          // TODO : add log system
        } else {
          console.log(new Date() + ": " + JSON.stringify(msg));
        }
    }
}


