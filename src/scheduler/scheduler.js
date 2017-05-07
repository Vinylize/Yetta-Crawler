import { CronJob } from 'cron';
import { fork } from 'child_process';

const job = new CronJob('0-59 * * * * *', () => {
  console.log('start');
  const crawler = fork('./dist/scheduler/jobs/crawler.js');
  crawler.on('exit', () => {
    console.log('crawling exit!');
  })
}, () => {

}, true);


