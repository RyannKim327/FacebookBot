const cron = require('node-cron');

// Schedule a cron job to run every 1 minute
const task = cron.schedule('* * * * *', () => {
  console.log('This task runs every minute');
});

// Schedule a cron job to run every weekday at 9:00 AM
const morningTask = cron.schedule('0 9 * * 1-5', () => {
  console.log('Good morning!');
}, {
  scheduled: true,
  timezone: 'America/New_York'
});

// Stop the first task after 5 minutes
setTimeout(() => {
  task.stop();
  console.log('Task has been stopped');
}, 5 * 60 * 1000);
npm install node-cron
