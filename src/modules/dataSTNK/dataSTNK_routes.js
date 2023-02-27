const express = require('express')
const Route = express.Router()
const userController = require('./dataSTNK_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

Route.get('/', userController.getAllStnk)
Route.post(
  '/',
  // authMiddleware.authentication,
  uploadFile,
  userController.PostStnk
)
Route.patch(
  '/:id',
  // authMiddleware.authentication,
  uploadFile,
  userController.updateStnk
)
Route.delete('/:id', userController.deletedSTNK)

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
