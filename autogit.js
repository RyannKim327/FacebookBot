// Import the cron module.
const cron = require('node-cron');

// Define a cron job that runs every minute.
const job = cron.schedule('* * * * *', () => {
  // Do something every minute.
  console.log('Running a cron job every minute.');
});

// Start the cron job.
job.start();
cron.schedule('0 0 * * *', () => {
  // Do something every day at midnight.
});
cron.schedule('0 8 * * 1', () => {
  // Do something every Monday at 8am.
});
cron.schedule('*/15 * * * *', () => {
  // Do something every 15 minutes.
});
cron.schedule('0 8 * * 1', () => {
  // Do something every Monday at 8am.
});
