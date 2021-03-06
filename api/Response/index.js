import axios from 'axios'
import {config} from '../../config'

const allResponse = (header) => {
    return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + '/api/responses', { headers: { Authorization: header } })
            .then(resp => {
                resolve(resp)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const allUserResponse = (data,header) => {
  return new Promise((resolve, reject) => {
      axios.get(config.apiUrl + '/api/responses/'+data, { headers: { Authorization: header } })
          .then(resp => {
              resolve(resp)
          })
          .catch(err => {
              reject(err)
          })
  })
}

const allArchieve = (header) => {
    return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + '/api/archieves', { headers: { Authorization: header } })
            .then(resp => {
                resolve(resp)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const replyResonse = (data, header) => {
  return new Promise((resolve, reject) => {
      axios.post(config.apiUrl + '/api/reply_response', data, { headers: { Authorization: header } })
          .then(resp => {
              resolve(resp)
          })
          .catch(err => {
              reject(err)
          })
  })
}

const allCount = (header) => {
  return new Promise((resolve, reject) => {
      axios.get(config.apiUrl + '/api/all/count', { headers: { Authorization: header } })
          .then(resp => {
              resolve(resp)
          })
          .catch(err => {
              reject(err)
          })
  })
}



export const Response = {
    allResponse,
    allArchieve,
    allUserResponse,
    allCount,
    replyResonse
}
