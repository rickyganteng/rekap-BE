const express = require('express')
const Route = express.Router()
const userController = require('./Pemeliharaan_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

Route.get('/', userController.getAllBensin)
Route.get('/keuangan/bensin', userController.getAllKeuanganBensin)
Route.get('/keuangan/bengkel', userController.getAllKeuanganBengkel)
Route.get('/sum', userController.getAllSUMBensin)
Route.get('/sum/bengkel', userController.getAllSUMBengkel)
Route.get('/sum/all', userController.getAllSUM)
Route.post(
  '/',
  // authMiddleware.authentication,
  uploadFile,
  userController.PostStnk
)
Route.post(
  '/bengkel',
  // authMiddleware.authentication,
  uploadFile,
  userController.PostBengkel
)
Route.patch(
  '/:id',
  // authMiddleware.authentication,
  uploadFile,
  userController.updateStnk
)
Route.patch(
  '/bengkel/:id',
  // authMiddleware.authentication,
  uploadFile,
  userController.updateBengkel
)
Route.delete('/:id', userController.deletedSTNK)
Route.delete('/bengkel/:id', userController.deletedBengkel)

// Route.get('/getafterdate', userController.getAfterDataNow)
// Route.get('/getnotafterdate', userController.getNotAfterDataNow)
// Route.get('/getlaporantoday', userController.getLaporanTOday)
// Route.get('/:id', userController.getByIdLaporanAktivitas)
// Route.get('/laporan/:id', userController.getLaporanAktivitasByIdUser)
// Route.post(
//   '/',
//   authMiddleware.authentication,
//   uploadFile,
//   userController.postLaporanAktivitas
// )
// Route.get(
//   '/cronjob/okey',
//   // authMiddleware.authentication,
//   uploadFile,
//   userController.postLaporanAktivitasIfBlank
// )

// Route.delete(
//   '/',
//   userController.deletedLaporanAktivitasAll
// )
module.exports = Route
