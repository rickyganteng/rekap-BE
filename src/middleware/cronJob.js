const CronJob = require('node-cron')
const actionJob = require('../modules/laporanAktivitas/laporanAktivitas_controller')
exports.initScheduledJobs = () => {
  // const scheduledJobFunction = CronJob.schedule('* * * * *', () => {
  const scheduledJobFunction = CronJob.schedule('5 * * * *', () => {
    actionJob.postLaporanAktivitasIfBlank()
  })

  scheduledJobFunction.start()
}
