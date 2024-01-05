// Import the cron package
const cron = require('cron');

// Define a cron job that will run every minute
const job = new cron.CronJob('*/1 * * * *', () => {
  // Do something every minute
  console.log('Cron job is running!');
});

// Start the job
job.start();
const job = new cron.CronJob('0 0 * * *', () => {
  // Do something every hour
  console.log('Cron job is running!');
});
