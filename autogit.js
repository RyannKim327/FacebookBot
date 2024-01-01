const cron = require('node-cron');

// Schedule a task to run every minute
cron.schedule('* * * * *', () => {
  console.log('Running cron job');
  // Add your code here to perform the desired task
});
