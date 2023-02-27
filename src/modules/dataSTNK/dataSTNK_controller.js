const helper = require('../../helpers')
const dataSTNKModel = require('./dataSTNK_model')

module.exports = {
  getAllStnk: async (req, res) => {
    try {
      let { page, limit, sort, keywords } = req.query
      console.log('ahh', sort)
      console.log('uhhh', req.query)

      limit = limit || '60'
      page = page || '1'
      keywords = keywords || '%'
      sort = sort || 'nomor ASC'

      page = parseInt(page)
      limit = parseInt(limit)
      const offset = page * limit - limit

      const totalData = await dataSTNKModel.getDataCount(keywords)
      console.log('Total Data ' + totalData)
      const totalPage = Math.ceil(totalData / limit)
      console.log('Total Page ' + totalPage)

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await dataSTNKModel.getDataAll(
        limit,
        offset,
        keywords,
        sort
      )
      console.log('ini resssult', keywords)
      return helper.response(res, 200, 'Succes Get All Data', result, pageInfo)
    } catch (error) {
      //   return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  PostStnk: async (req, res) => {
    console.log('huhuhu')
    try {
      // console.log(req.body)
      const {
        NoPolisiSTNK,
        MerkSTNK,
        TipeSTNK,
        PemegangKendaraan,
        userId,
        NoRangka,
        NoMesin,
        MasaBerlakuSTNK,
        MasaBerlakuPajakTahunan,
        JenisBahanBakar,
        AnggaranBensinDiberikan,
        AnggaranPemeliharaanDiberikan
      } = req.body
      console.log('req body', req.body)
      const setData = {
        nopolisi_stnk: NoPolisiSTNK,
        merk_stnk: MerkSTNK,
        tipe_stnk: TipeSTNK,
        Pemegang_kendaraan_stnk: PemegangKendaraan,
        jenis_bahan_bakar_stnk: JenisBahanBakar,
        id_user: userId,
        no_rangka_stnk: NoRangka,
        no_mesin_stnk: NoMesin,
        masa_berlaku_STNK: MasaBerlakuSTNK,
        masa_berlaku_pajak_tahunan: MasaBerlakuPajakTahunan,
        jumlah_anggaran_bensin_stnk: AnggaranBensinDiberikan,
        pemakaian_anggaran_bensin_stnk: 0,
        pemakaian_anggaran_pemeliharaan_stnk: 0,
        jumlah_anggaran_pemeliharaan_stnk: AnggaranPemeliharaanDiberikan
      }

      const result = await dataSTNKModel.createData(setData)
      return helper.response(res, 200, 'Succes Input Data STNK !', result)
    } catch (error) {
      // return helper.response(res, 400, 'Input Data STNK Failed', error)
      console.log(error)
    }
  },
  updateStnk: async (req, res) => {
    try {
      const { id } = req.params
      let result = await dataSTNKModel.getDataByIdSTNK(id)
      console.log('ini result', result)
      if (result.length > 0) {
        const {
          userId,
          NoPolisiSTNK,
          // TahunPembuatanSTNK: '',
          MerkSTNK,
          TipeSTNK,
          PemegangKendaraan,
          JenisBahanBakar,
          Keterangan,
          NoRangka,
          NoMesin,
          MasaBerlakuSTNK,
          MasaBerlakuPajakTahunan,
          AnggaranBensinDiberikan,
          AnggaranPemeliharaanDiberikan
        } = req.body
        console.log('ini body', req.body)

        const setData = {
          nopolisi_stnk:
            NoPolisiSTNK === undefined ? result[0].nopolisi_stnk : NoPolisiSTNK,
          no_rangka_stnk:
            NoRangka === undefined ? result[0].no_rangka_stnk : NoRangka,
          jumlah_anggaran_pemeliharaan_stnk:
            AnggaranPemeliharaanDiberikan === undefined
              ? result[0].jumlah_anggaran_pemeliharaan_stnk
              : AnggaranPemeliharaanDiberikan,
          jumlah_anggaran_bensin_stnk:
            AnggaranBensinDiberikan === undefined
              ? result[0].jumlah_anggaran_bensin_stnk
              : AnggaranBensinDiberikan,
          masa_berlaku_pajak_tahunan:
            MasaBerlakuPajakTahunan === undefined
              ? result[0].masa_berlaku_pajak_tahunan
              : MasaBerlakuPajakTahunan,
          masa_berlaku_STNK:
            MasaBerlakuSTNK === undefined
              ? result[0].masa_berlaku_STNK
              : MasaBerlakuSTNK,
          no_mesin_stnk:
            NoMesin === undefined ? result[0].no_mesin_stnk : NoMesin,
          jenis_bahan_bakar_stnk:
            JenisBahanBakar === undefined
              ? result[0].jenis_bahan_bakar_stnk
              : JenisBahanBakar,
          merk_stnk: MerkSTNK === undefined ? result[0].merk_stnk : MerkSTNK,
          tipe_stnk: TipeSTNK === undefined ? result[0].tipe_stnk : TipeSTNK,
          Pemegang_kendaraan_stnk:
            PemegangKendaraan === undefined
              ? result[0].Pemegang_kendaraan_stnk
              : PemegangKendaraan,
          keterangan_stnk:
            Keterangan === undefined ? result[0].keterangan_stnk : Keterangan,
          id_user: userId === undefined ? result[0].id_user : userId,
          stnk_updated_at: new Date(Date.now())
        }
        console.log('ini setdata', setData)
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
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  deletedSTNK: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      let result = await dataSTNKModel.getDataByIdSTNK(id)

      console.log('wewewee', result)
      if (result.length > 0) {
        result = await dataSTNKModel.deleteData(id)
        resultt = await dataSTNKModel.deleteDataPemeliharaanByIdSTNK(id)
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
