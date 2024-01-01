const cron = require('cron');

// Define a cron job schedule
const job = new cron.CronJob('*/5 * * * * *', () => {
  console.log('This job runs every 5 seconds');
});

// Start the cron job
job.start();

// Print a message when the job is stopped
job.on('stop', () => {
  console.log('Job stopped');
});

// Stop the cron job after 60 seconds
setTimeout(() => {
  job.stop();
}, 60000);
