const CronJob = require('cron').CronJob;

// Define the cron schedule
const cronSchedule = '* * * * *'; // Fire the task every minute

// Create a new cron job
const job = new CronJob(cronSchedule, function() {
  console.log('This task runs every minute!');
}, null, true, 'UTC');

// Start the cron job
job.start();
