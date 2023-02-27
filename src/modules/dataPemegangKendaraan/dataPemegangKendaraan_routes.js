const express = require('express')
const Route = express.Router()
const userController = require('./dataPemegangKendaraan_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

Route.get('/', userController.getAllDataPemegang)
Route.post(
  '/',
  // authMiddleware.authentication,
  uploadFile,
  userController.PostDataPemegang
)
Route.patch(
  '/:id',
  // authMiddleware.authentication,
  uploadFile,
  userController.updateDataPemegang
)
Route.delete('/:id', userController.deletedDataPemegang)
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
