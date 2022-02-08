// Copyright CESSDA ERIC 2017-2021
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import express, {Request, Response} from 'express';
import path from 'path';
import { checkBuildDirectory, checkEnvironmentVariables, startListening, restResponseTimeAllHistogram, restResponseTimeLangHistogram, restResponseTimePublisherHistogram } from './helper';
import responseTime from 'response-time'

export function start () {
    checkBuildDirectory();
    checkEnvironmentVariables(true);

    const app = express();

    app.use('/static', express.static(path.join(__dirname, '../dist')));
    
    //Metrics middleware for API
    app.use('/api/DataSets', responseTime((req:Request, res:Response, time:number)=>{
      //ALL
      if (req?.route?.path){
        restResponseTimeAllHistogram.observe({
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode
        }, Math.round(time*1000))
      }
      //LANG
      if (req.query.metadataLanguage){
        restResponseTimeLangHistogram.observe({
          method: req.method,
          route: req.route.path,
          lang: req.query.metadataLanguage as string,
          status_code: res.statusCode
        }, Math.round(time*1000))
      }
      //PUBLISHER
      if (req.query.publishers){
        let publishers:any = req.query.publishers
        publishers.forEach(function (value: any) {
          restResponseTimePublisherHistogram.observe({
            method: req.method,
            route: req.route.path,
            publ: value as string,
            status_code: res.statusCode
          }, Math.round(time*1000))
        });
      }
    }))

    const indexPath = path.join(path.join(__dirname, '../dist'), 'index.html');

    startListening(app, (_req, res) => res.sendFile(indexPath));
};
