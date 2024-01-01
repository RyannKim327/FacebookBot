const cron = require('node-cron');

// Schedule a task to run every 10 seconds
cron.schedule('*/10 * * * * *', () => {
  console.log('Task executed!');
});

// Schedule a task to run every day at 3:00 PM
cron.schedule('0 15 * * *', () => {
  console.log('Task executed at 3:00 PM!');
});

// Schedule a task to run every Monday at 9:30 AM
cron.schedule('30 9 * * 1', () => {
  console.log('Task executed on Monday at 9:30 AM!');
});

// Schedule a task to run every last day of the month at 11:59 PM
cron.schedule('59 23 28-31 * *', () => {
  console.log('Task executed on the last day of the month at 11:59 PM!');
});
