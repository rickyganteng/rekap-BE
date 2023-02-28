const connection = require('../../config/mysql')

module.exports = {
  getDataAll: (limit, offset, keywords, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT @no:=@no+1 AS nomor, s.nopolisi_stnk, u.user_name, u.user_email, u.user_nomor,b.id_pemeliharaan ,b.status_pemeliharaan,b.tanggal_pemeliharaan ,b.sisa_anggaran FROM pemeliharaan b JOIN user u ON b.id_user = u.id_user JOIN stnk s ON b.id_stnk = s.id_stnk JOIN (SELECT @no:=0) r WHERE s.nopolisi_stnk LIKE ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [keywords, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataAllKeuanganBensin: (limit, offset, keywords, sort, bensin) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT @no:=@no+1 AS nomor, s.id_stnk,s.nopolisi_stnk, u.user_name, u.user_email, u.user_nomor,b.id_pemeliharaan ,b.status_pemeliharaan ,b.sisa_anggaran FROM pemeliharaan b JOIN user u ON b.id_user = u.id_user JOIN stnk s ON b.id_stnk = s.id_stnk JOIN (SELECT @no:=0) r WHERE s.nopolisi_stnk LIKE ? AND b.status_pemeliharaan = ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [keywords, bensin, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataAllKeuanganBengkel: (limit, offset, keywords, sort, bensin) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT @no:=@no+1 AS nomor, s.id_stnk,s.nopolisi_stnk, u.user_name, u.user_email, u.user_nomor,b.id_pemeliharaan ,b.status_pemeliharaan ,b.sisa_anggaran FROM pemeliharaan b JOIN user u ON b.id_user = u.id_user JOIN stnk s ON b.id_stnk = s.id_stnk JOIN (SELECT @no:=0) r WHERE s.nopolisi_stnk LIKE ? AND b.status_pemeliharaan = ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [keywords, bensin, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  // getAllStnk: () => {
  //   return new Promise((resolve, reject) => {
  //     connection.query('SELECT * FROM stnk', (error, result) => {
  //       !error ? resolve(result) : reject(new Error(error))
  //     })
  //   })
  // },
  getAllDataPemegang: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getSumBensin: (ket) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(sisa_anggaran) as totalsemua FROM pemeliharaan WHERE status_pemeliharaan = ?`,
        [ket],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getSumBengkel: (ket) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(sisa_anggaran) as totalsemua FROM pemeliharaan WHERE status_pemeliharaan = ?`,
        [ket],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getSum: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(sisa_anggaran) as totalsemua FROM pemeliharaan`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updateDataSTNK: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE stnk SET ? WHERE id_stnk = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getDataByIdSTNKUpdate: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM stnk WHERE id_stnk = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
          // console.log(result)
        }
      )
    })
  },
  getDataByIdSTNK: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM pemeliharaan WHERE id_pemeliharaan = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
          // console.log(result)
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO pemeliharaan SET ?',
        setData,
        (error, result) => {
          // !error ? resolve({result.insertId, ...setData}) : reject(new Error(error))
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  updateData: (setData, id) => {
    console.log('isiset', setData)
    console.log('id', id)
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE pemeliharaan SET ? WHERE id_pemeliharaan = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getDataCount: (keywords) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM pemeliharaan WHERE id_pemeliharaan LIKE ?',
        keywords,
        (error, result) => {
          // console.log(result) isi array dalamnya objek
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM pemeliharaan WHERE id_pemeliharaan = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }

  // getDataAllLaporanAktivitas: () => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       'SELECT u.user_nip, u.user_name, u.user_phone_number ,l.logaktivitas_id, l.logaktivitas_isi, l.logaktivitas_created_at FROM logaktivitas l JOIN user u ON l.logaktivitas_user_id = u.id',
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },

  // getDataByIdLaporanAktivitas: (id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       'SELECT u.user_nip, u.user_name, l.logaktivitas_id, l.logaktivitas_isi, l.logaktivitas_created_at FROM logaktivitas l JOIN user u ON l.logaktivitas_user_id = u.id WHERE l.logaktivitas_id = ?',
  //       id,
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataLaporanAktivitasByIdUser: (id, sort, limit, offset) => {
  //   return new Promise((resolve, reject) => {
  //     const sqlquery = `SELECT u.user_nip, u.user_name,u.user_pangkat,u.user_phone_number ,l.logaktivitas_id,l.logaktivitas_image, l.logaktivitas_isi, l.logaktivitas_created_at FROM logaktivitas l JOIN user u ON l.logaktivitas_user_id = u.id WHERE u.id = ${id} ORDER BY ${sort}  LIMIT ${limit} OFFSET ${offset}`
  //     // console.log('cccsqlquery', sqlquery);

  //     connection.query(
  //       sqlquery,
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },

  // deleteData: (id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       'DELETE FROM logaktivitas WHERE logaktivitas_id = ?',
  //       id,
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // deleteDataAll: () => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       'DELETE FROM logaktivitas',
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getAfterDataNow: () => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       'SELECT * FROM logaktivitas WHERE DATE(logaktivitas_created_at) = CURDATE()',
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getNotAfterDataNow: () => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       'SELECT * FROM logaktivitas WHERE NOT DATE(logaktivitas_created_at) = CURDATE()',
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataLaporanToday: (limit, offset, sortCol, sort, keywords) => {
  //   return new Promise((resolve, reject) => {
  //     const sqlquery = `SELECT logaktivitas_image,user.id, user.user_name,user.user_nip,user.user_phone_number, user_pangkat, logaktivitas.logaktivitas_isi, logaktivitas.logaktivitas_created_at FROM logaktivitas RIGHT JOIN user ON user.id = logaktivitas.logaktivitas_user_id AND DATE(logaktivitas.logaktivitas_created_at) = CURDATE() WHERE user.${sortCol} LIKE '${keywords}' ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`
  //     connection.query(
  //       sqlquery,
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataLaporanTodayNoLimit: (sortCol, sort, keywords) => {
  //   return new Promise((resolve, reject) => {
  //     const sqlquery = `SELECT logaktivitas_image,user.id, user.user_name,user.user_nip,user.user_phone_number, user_pangkat, logaktivitas.logaktivitas_isi, logaktivitas.logaktivitas_created_at FROM logaktivitas RIGHT JOIN user ON user.id = logaktivitas.logaktivitas_user_id AND DATE(logaktivitas.logaktivitas_created_at) = CURDATE() WHERE user.${sortCol} LIKE '${keywords}' ORDER BY ${sort} `
  //     connection.query(
  //       sqlquery,
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataLaporanTodayTotal: (sortCol, keywords) => {
  //   return new Promise((resolve, reject) => {
  //     const sqlquery = `SELECT COUNT(*) AS total FROM logaktivitas RIGHT JOIN user ON user.id = logaktivitas.logaktivitas_user_id AND DATE(logaktivitas.logaktivitas_created_at) = CURDATE() WHERE user.${sortCol} LIKE '${keywords}'`
  //     connection.query(
  //       sqlquery,
  //       keywords,
  //       (error, result) => {
  //         // console.log(result) isi array dalamnya objek
  //         !error ? resolve(result[0].total) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataCondition: (data) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query('SELECT * FROM logaktivitas WHERE DATE(logaktivitas_created_at) = CURDATE() AND ?', data, (error, result) => {
  //       !error ? resolve(result) : reject(new Error(error))
  //     })
  //   })
  // },
  // getDataCountTotal: (sortCol, keywords) => {
  //   return new Promise((resolve, reject) => {
  //     const sqlquery = `SELECT COUNT(*) AS total FROM logaktivitas l JOIN user u ON l.logaktivitas_user_id = u.id WHERE ${sortCol} LIKE '${keywords}'`
  //     connection.query(
  //       sqlquery,
  //       keywords,
  //       (error, result) => {
  //         // console.log(result) isi array dalamnya objek
  //         !error ? resolve(result[0].total) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataCountTotalByUserId: (id, sortby) => {
  //   return new Promise((resolve, reject) => {
  //     const sqlquery = `SELECT COUNT(*) AS total FROM logaktivitas l JOIN user u ON l.logaktivitas_user_id = u.id WHERE u.id = ${id} ORDER BY '${sortby}'`
  //     connection.query(
  //       sqlquery,
  //       (error, result) => {
  //         // console.log(result) isi array dalamnya objek
  //         !error ? resolve(result[0].total) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataCount: (limit, offset, sortCol, sort, keywords, fromdate, todate) => {
  //   return new Promise((resolve, reject) => {
  //     const sqlquery = `SELECT l.logaktivitas_id, u.user_nip,u.user_phone_number, l.logaktivitas_image, u.user_name, u.user_pangkat, l.logaktivitas_isi, l.logaktivitas_created_at FROM logaktivitas l JOIN user u ON l.logaktivitas_user_id = u.id WHERE ${sortCol} LIKE '${keywords}' ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`
  //     console.log('dwdwd', sqlquery)
  //     connection.query(
  //       sqlquery,
  //       (error, result) => {
  //         // console.log(result) isi array dalamnya objek
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataCountNoLimit: (sortCol, sort, keywords) => {
  //   return new Promise((resolve, reject) => {
  //     const sqlquery = `SELECT l.logaktivitas_id, u.user_nip,u.user_phone_number, l.logaktivitas_image, u.user_name, u.user_pangkat, l.logaktivitas_isi, l.logaktivitas_created_at FROM logaktivitas l JOIN user u ON l.logaktivitas_user_id = u.id WHERE ${sortCol} LIKE '${keywords}' ORDER BY ${sort} `
  //     console.log('dwdwd', sqlquery)
  //     connection.query(
  //       sqlquery,
  //       (error, result) => {
  //         // console.log(result) isi array dalamnya objek
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataCountTanggalTotal: (fromdate, todate, sortCol, keywords) => {
  //   console.log('dwdwdddd', fromdate)
  //   return new Promise((resolve, reject) => {
  //     const sqlquery = `SELECT l.logaktivitas_id, u.user_nip, u.user_name, u.user_pangkat,u.user_phone_number, l.logaktivitas_isi, l.logaktivitas_created_at FROM logaktivitas l JOIN user u ON l.logaktivitas_user_id = u.id WHERE l.logaktivitas_created_at BETWEEN '${fromdate}' AND '${todate}' AND ${sortCol} LIKE '${keywords}' `
  //     console.log('dwdwd', sqlquery)
  //     connection.query(
  //       sqlquery,
  //       (error, result) => {
  //         // console.log(result) isi array dalamnya objek
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataCountTanggal: (limit, offset, fromdate, todate, sortCol, sort, keywords) => {
  //   console.log('dwdwdddd', fromdate)
  //   return new Promise((resolve, reject) => {
  //     const sqlquery = `SELECT l.logaktivitas_id, u.user_nip, u.user_name, u.user_pangkat,u.user_phone_number, l.logaktivitas_isi, l.logaktivitas_created_at FROM logaktivitas l JOIN user u ON l.logaktivitas_user_id = u.id WHERE l.logaktivitas_created_at BETWEEN '${fromdate} 00:00:00' AND '${todate} 23:59:59' AND ${sortCol} LIKE '${keywords}' ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`
  //     console.log('dwdwd', sqlquery)
  //     connection.query(
  //       sqlquery,
  //       (error, result) => {
  //         // console.log(result) isi array dalamnya objek
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataCountTanggalNoLimit: (sortCol, sort, keywords, fromdate, todate) => {
  //   console.log('dwdwdddd', fromdate)
  //   return new Promise((resolve, reject) => {
  //     const sqlquery = `SELECT l.logaktivitas_id, u.user_nip, u.user_name, u.user_pangkat,u.user_phone_number, l.logaktivitas_isi, l.logaktivitas_created_at FROM logaktivitas l JOIN user u ON l.logaktivitas_user_id = u.id WHERE l.logaktivitas_created_at BETWEEN '${fromdate} 00:00:00' AND '${todate} 23:59:59' AND ${sortCol} LIKE '${keywords}' ORDER BY ${sort} `
  //     console.log('dwdwd', sqlquery)
  //     connection.query(
  //       sqlquery,
  //       (error, result) => {
  //         // console.log(result) isi array dalamnya objek
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // }
}
