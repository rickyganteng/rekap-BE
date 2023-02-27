const helper = require('../../helpers')
const dataSTNKModel = require('./dataPemegangKendaraan_model')

module.exports = {
  getAllDataPemegang: async (req, res) => {
    try {
      const result = await dataSTNKModel.getAllDataPemegang()
      if (result.length > 0) {
        return helper.response(res, 200, 'Succes Get Data Pemegang ALL', result)
      } else {
        return helper.response(res, 404, 'Data not Found', null)
      }
    } catch (error) {
      //   return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  PostDataPemegang: async (req, res) => {
    console.log('huhuhu')
    try {
      // console.log(req.body)
      const {
        NamaPemegang,
        EMailPemegang,
        NomorPemegang,
        SatkerPemegang,
        NipPemegang
      } = req.body

      const setData = {
        user_name: NamaPemegang,
        user_nip: NipPemegang,
        user_email: EMailPemegang,
        user_nomor: NomorPemegang,
        user_satker: SatkerPemegang,
        user_password: '1123',
        user_verification: 'succes'
      }

      const result = await dataSTNKModel.createData(setData)
      return helper.response(res, 200, 'Succes Input Data STNK !', result)
    } catch (error) {
      // return helper.response(res, 400, 'Input Data STNK Failed', error)
      console.log(error)
    }
  },
  updateDataPemegang: async (req, res) => {
    try {
      const { id } = req.params
      let result = await dataSTNKModel.getDataByIdDataPemegang(id)
      if (result.length > 0) {
        const {
          NamaPemegang,
          EMailPemegang,
          NomorPemegang,
          SatkerPemegang,
          NipPemegang
        } = req.body
        const setData = {
          user_name: NamaPemegang === '' ? result[0].user_name : NamaPemegang,
          user_nip: NipPemegang === '' ? result[0].user_nip : NipPemegang,
          user_email:
            EMailPemegang === '' ? result[0].user_email : EMailPemegang,
          user_nomor:
            NomorPemegang === '' ? result[0].user_nomor : NomorPemegang,
          user_satker:
            SatkerPemegang === '' ? result[0].user_satker : SatkerPemegang,
          user_updated_at: new Date(Date.now())
        }
        // console.log('UPDATE DATA', req.body)
        // console.log(setData)
        // console.log('MOVIE IMAGE DB', result[0].movie_image.length)
        result = await dataSTNKModel.updateData(setData, id)
        return helper.response(res, 200, 'Succes Update Data', result)
      } else {
        return helper.response(
          res,
          404,
          `Cannnot Update !. Data by Id ${id} not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletedDataPemegang: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      let result = await dataSTNKModel.getDataByIdDataPemegang(id)
      console.log('wewewee', result)
      if (result.length > 0) {
        const imgLoc = `src/uploads/${result[0].logaktivitas_image}`
        helper.deleteImage(imgLoc)
        result = await dataSTNKModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Succes Delete Booing Ruangan With ID ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Cannot Delete !.s Data by Id ${id} not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
  ////////////////////////////
  //   getAllLaporanAktivitas: async (req, res) => {
  //     try {
  //       let { page, limit, sort, sortCol, keywords, fromdate, todate } = req.query
  //       limit = limit || '10'
  //       page = page || '1'
  //       keywords = keywords || '%%'
  //       sortCol = sortCol || 'user_name'
  //       sort = sort || 'logaktivitas_created_at DESC'
  //       fromdate = fromdate || ''
  //       todate = todate || ''
  //       page = parseInt(page)
  //       limit = parseInt(limit)
  //       const offset = page * limit - limit
  //       if (fromdate === '' && todate === '') {
  //         const totalData = await dataSTNKModel.getDataCount(
  //           limit,
  //           offset,
  //           sortCol,
  //           sort,
  //           keywords
  //         )
  //         const totalDataNoLimit = await dataSTNKModel.getDataCountNoLimit(
  //           sortCol,
  //           sort,
  //           keywords
  //         )
  //         const totalDataTotal = await dataSTNKModel.getDataCountTotal(
  //           sortCol,
  //           keywords
  //         )
  //         const totalPage = Math.ceil(totalDataTotal / limit)
  //         const pageInfo = { page, totalPage, limit, totalData, totalDataNoLimit }
  //         // const result = await dataSTNKModel.getDataAllLaporanAktivitas(limit, offset, keywords, sort)
  //         return helper.response(
  //           res,
  //           200,
  //           'Succes Get User Data',
  //           totalData,
  //           pageInfo
  //         )
  //       } else {
  //         const totalData = await dataSTNKModel.getDataCountTanggal(
  //           limit,
  //           offset,
  //           fromdate,
  //           todate,
  //           sortCol,
  //           sort,
  //           keywords
  //         )
  //         // const totalDataLength = parseInt(totalData.length)
  //         const totalDataNoLimit = await dataSTNKModel.getDataCountTanggalNoLimit(
  //           sortCol,
  //           sort,
  //           keywords,
  //           fromdate,
  //           todate
  //         )
  //         const totalDataTotal = await dataSTNKModel.getDataCountTanggalTotal(
  //           fromdate,
  //           todate,
  //           sortCol,
  //           keywords
  //         )
  //         const totalPage = Math.ceil(totalDataTotal.length / limit)
  //         const pageInfo = { page, totalPage, limit, totalData, totalDataNoLimit }
  //         // const result = await dataSTNKModel.getDataAllLaporanAktivitas(limit, offset, keywords, sort)
  //         return helper.response(
  //           res,
  //           200,
  //           'Succes Get User Data',
  //           totalData,
  //           pageInfo
  //         )
  //       }
  //     } catch (error) {
  //       return helper.response(res, 400, 'Bad Request', error)
  //       // console.log(error);
  //     }
  //   },
  //   getLaporanTOday: async (req, res) => {
  //     try {
  //       let { page, limit, sort, sortCol, keywords } = req.query
  //       limit = limit || '10'
  //       page = page || '1'
  //       keywords = keywords || '%%'
  //       sortCol = sortCol || 'user_name'
  //       sort = sort || 'user_name DESC'
  //       page = parseInt(page)
  //       limit = parseInt(limit)
  //       const offset = page * limit - limit
  //       const totalData = await dataSTNKModel.getDataLaporanTodayTotal(
  //         sortCol,
  //         keywords
  //       )
  //       const result = await dataSTNKModel.getDataLaporanToday(
  //         limit,
  //         offset,
  //         sortCol,
  //         sort,
  //         keywords
  //       )
  //       const resultTodayNoLimit = await dataSTNKModel.getDataLaporanTodayNoLimit(
  //         sortCol,
  //         sort,
  //         keywords
  //       )
  //       const totalPage = Math.ceil(totalData / limit)
  //       const pageInfo = { page, totalPage, limit, totalData, resultTodayNoLimit }
  //       const datakosong = []
  //       result.forEach((item) => {
  //         if (item.logaktivitas_isi === null) {
  //           const setData = {
  //             user_name: item.user_name,
  //             user_nip: item.user_nip,
  //             user_pangkat: item.user_pangkat,
  //             logaktivitas_isi: '--',
  //             logaktivitas_created_at: item.logaktivitas_created_at,
  //             logaktivitas_image: item.logaktivitas_image
  //           }
  //           datakosong.push(setData)
  //         } else if (item.logaktivitas_isi !== null) {
  //           const setData = {
  //             user_name: item.user_name,
  //             user_nip: item.user_nip,
  //             user_pangkat: item.user_pangkat,
  //             logaktivitas_isi: item.logaktivitas_isi,
  //             logaktivitas_created_at: item.logaktivitas_created_at,
  //             logaktivitas_image: item.logaktivitas_image
  //           }
  //           datakosong.push(setData)
  //         }
  //       })
  //       if (datakosong.length > 0) {
  //         return helper.response(
  //           res,
  //           200,
  //           'Succes Get User Data',
  //           datakosong,
  //           pageInfo
  //         )
  //       } else {
  //         return helper.response(res, 404, 'Data not Found', null)
  //       }
  //     } catch (error) {
  //       return helper.response(res, 400, 'Bad Request', error)
  //       // console.log(error);
  //     }
  //   },
  //   getByIdLaporanAktivitas: async (req, res) => {
  //     try {
  //       const { id } = req.params
  //       const result = await dataSTNKModel.getDataByIdLaporanAktivitas(id)
  //       if (result.length > 0) {
  //         return helper.response(res, 200, 'Succes Get User Data', result)
  //       } else {
  //         return helper.response(res, 404, `Data By Id ${id} not Found`, null)
  //       }
  //     } catch (error) {
  //       return helper.response(res, 400, 'Bad Request', error)
  //       // console.log(error);
  //     }
  //   },
  //   getLaporanAktivitasByIdUser: async (req, res) => {
  //     try {
  //       let { page, limit, sort } = req.query
  //       limit = limit || '10'
  //       page = page || '1'
  //       sort = sort || 'logaktivitas_created_at DESC'
  //       page = parseInt(page)
  //       limit = parseInt(limit)
  //       const offset = page * limit - limit
  //       const { id } = req.params
  //       sort = sort || 'logaktivitas_created_at DESC'
  //       const result = await dataSTNKModel.getDataLaporanAktivitasByIdUser(
  //         id,
  //         sort,
  //         limit,
  //         offset
  //       )
  //       const totalDataTotal = await dataSTNKModel.getDataCountTotalByUserId(
  //         id,
  //         sort
  //       )
  //       const totalPage = Math.ceil(totalDataTotal / limit)
  //       const pageInfo = { page, totalPage, limit, totalDataTotal }
  //       if (result.length > 0) {
  //         return helper.response(
  //           res,
  //           200,
  //           'Succes Get User Data hehe',
  //           result,
  //           pageInfo
  //         )
  //       } else {
  //         return helper.response(res, 404, `Data By Id ${id} not Found`, null)
  //       }
  //     } catch (error) {
  //       return helper.response(res, 400, 'Bad Request', error)
  //       // console.log(error);
  //     }
  //   },
  //   postLaporanAktivitasIfBlank: async (req, res) => {
  //     try {
  //       const datakosong = []
  //       const datakosongById = []
  //       const keywords = '%%'
  //       const sortCol = 'user_name'
  //       const sort = 'user_name DESC'
  //       const result = await dataSTNKModel.getDataLaporanTodayNoLimit(
  //         sortCol,
  //         sort,
  //         keywords
  //       )
  //       // console.log('test blank', result);
  //       result.forEach((item) => {
  //         if (item.logaktivitas_isi === null) {
  //           const setData = {
  //             logaktivitas_user_id: item.id,
  //             logaktivitas_isi: 'Belum mengisi data hari ini',
  //             logaktivitas_image: item.logaktivitas_image
  //           }
  //           datakosong.push(setData)
  //           datakosongById.push(setData.logaktivitas_user_id)
  //         }
  //       })
  //       console.log('databarublank', datakosong)
  //       console.log('databarublankID', datakosongById.length)
  //       for (const e of datakosongById) {
  //         const setData2 = {
  //           logaktivitas_user_id: e,
  //           logaktivitas_isi: '--',
  //           logaktivitas_image: ''
  //         }
  //         // const resultlagi = await dataSTNKModel.createData(setData2)
  //         const result2 = await dataSTNKModel.createData(setData2)
  //         console.log('datasetdata 2', result2)
  //       }
  //     } catch (error) {
  //       // return helper.response(res, 400, 'Bad Request', error)
  //       console.log(error)
  //     }
  //   },
  //   postLaporanAktivitas: async (req, res) => {
  //     try {
  //       // console.log('Controller', req)
  //       const {
  //         namaLengkap,
  //         isiAktivitas
  //         // ruangBuktiSuratDina
  //       } = req.body
  //       const setData = {
  //         logaktivitas_user_id: namaLengkap,
  //         logaktivitas_isi: isiAktivitas,
  //         logaktivitas_image: req.file ? req.file.filename : ''
  //       }
  //       console.log('POST DATA', setData)
  //       const checkLog = await dataSTNKModel.getDataCondition({
  //         logaktivitas_user_id: namaLengkap
  //       })
  //       // console.log('checklog', checkLog);
  //       if (checkLog.length === 0) {
  //         const result = await dataSTNKModel.createData(setData)
  //         return helper.response(res, 200, 'Succes Create Data', result)
  //       } else {
  //         return helper.response(res, 400, 'Anda Sudah Input Aktivitas Hari Ini')
  //       }
  //     } catch (error) {
  //       // return helper.response(res, 400, 'Bad Request', error)
  //       console.log(error)
  //     }
  //   },
  //   updateLaporanAktivitas: async (req, res) => {
  //     try {
  //       const { id } = req.params
  //       let result = await dataSTNKModel.getDataByIdLaporanAktivitasUpdate(id)
  //       if (result.length > 0) {
  //         const { isiAktivitas } = req.body
  //         const setData = {
  //           logaktivitas_user_id: result[0].logaktivitas_user_id,
  //           logaktivitas_isi: isiAktivitas,
  //           logaktivitas_image: req.file
  //             ? req.file.filename
  //             : result[0].logaktivitas_image,
  //           logaktivitas_updated_at: new Date(Date.now())
  //         }
  //         if (req.file) {
  //           console.log('ada file')
  //           if (result[0].logaktivitas_image.length > 0) {
  //             console.log(`Delete Image${result[0].logaktivitas_image}`)
  //             const imgLoc = `src/uploads/${result[0].logaktivitas_image}`
  //             helper.deleteImage(imgLoc)
  //           } else {
  //             console.log('NO img in DB')
  //           }
  //         }
  //         // console.log('UPDATE DATA', req.body)
  //         // console.log(setData)
  //         // console.log('MOVIE IMAGE DB', result[0].movie_image.length)
  //         result = await dataSTNKModel.updateData(setData, id)
  //         return helper.response(res, 200, 'Succes Update Data', result)
  //       } else {
  //         return helper.response(
  //           res,
  //           404,
  //           `Cannnot Update !. Data by Id ${id} not Found !`,
  //           null
  //         )
  //       }
  //     } catch (error) {
  //       return helper.response(res, 400, 'Bad Request', error)
  //     }
  //   },
  //   deletedLaporanAktivitas: async (req, res) => {
  //     try {
  //       // console.log(req.params)
  //       const { id } = req.params
  //       let result = await dataSTNKModel.getDataByIdLaporanAktivitasUpdate(id)
  //       console.log('wewewee', result)
  //       if (result.length > 0) {
  //         const imgLoc = `src/uploads/${result[0].logaktivitas_image}`
  //         helper.deleteImage(imgLoc)
  //         result = await dataSTNKModel.deleteData(id)
  //         return helper.response(
  //           res,
  //           200,
  //           `Succes Delete Booing Ruangan With ID ${id}`,
  //           result
  //         )
  //       } else {
  //         return helper.response(
  //           res,
  //           404,
  //           `Cannot Delete !.s Data by Id ${id} not Found !`,
  //           null
  //         )
  //       }
  //     } catch (error) {
  //       return helper.response(res, 400, 'Bad Request', error)
  //     }
  //   },
  //   deletedLaporanAktivitasAll: async (req, res) => {
  //     try {
  //       const result = await dataSTNKModel.deleteDataAll()
  //       // if (result.length > 0) {
  //       return helper.response(res, 200, 'Succes Delete Data All', result)
  //       // } else {
  //       // return helper.response(res, 404, 'Data not Found', null)
  //       // }
  //     } catch (error) {
  //       return helper.response(res, 400, 'Bad Request', error)
  //       // console.log(error);
  //     }
  //   },
  //   getAfterDataNow: async (req, res) => {
  //     try {
  //       const result = await dataSTNKModel.getAfterDataNow()
  //       if (result.length > 0) {
  //         return helper.response(res, 200, 'Succes Get User Data', result)
  //       } else {
  //         return helper.response(res, 404, 'Data not Found', null)
  //       }
  //     } catch (error) {
  //       return helper.response(res, 400, 'Bad Request', error)
  //       // console.log(error);
  //     }
  //   },
  //   getNotAfterDataNow: async (req, res) => {
  //     try {
  //       const result = await dataSTNKModel.getNotAfterDataNow()
  //       if (result.length > 0) {
  //         return helper.response(res, 200, 'Succes Get User Data', result)
  //       } else {
  //         return helper.response(res, 404, 'Data not Found', null)
  //       }
  //     } catch (error) {
  //       return helper.response(res, 400, 'Bad Request', error)
  //       // console.log(error);
  //     }
  //   }
}
