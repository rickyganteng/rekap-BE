const express = require('express')
const Route = express.Router()
const userController = require('./UangBengkel_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

Route.get('/', userController.getAllBengkel)
Route.get('/sumbengkel', userController.getAllSUMBengkel)
Route.post(
  '/',
  // authMiddleware.authentication,
  uploadFile,
  userController.PostBengkel
)
Route.patch(
  '/:id',
  // authMiddleware.authentication,
  uploadFile,
  userController.updateBengkel
)
Route.delete('/:id', userController.deletedBengkel)

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
