const cron = require('cron');

// Define the cron schedule
const job = new cron.CronJob('* * * * *', () => {
  // Code to be executed every minute
  console.log('This function runs every minute!');
});

// Start the cron job
job.start();
