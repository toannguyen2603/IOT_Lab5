import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const Logs = () => {
  const [logs, setlogs] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchState = async () => {
        try {
          const response = await axios.get('/sensor/getAll')
          setlogs(response.data)
        } catch (err) {
          // console.log(Error: $(err.message))
        }
      }

      fetchState()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <CTable striped className="border" hover={true}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID Thiết bị</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tên thiết bị</CTableHeaderCell>
            <CTableHeaderCell scope="col">Cảm biến</CTableHeaderCell>
            <CTableHeaderCell scope="col">Giá trị</CTableHeaderCell>
            <CTableHeaderCell scope="col">Thời gian</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {logs.reverse().map((log) => {
            return (
              <CTableRow key={log._id}>
                <CTableHeaderCell scope="row">{log.deviceID}</CTableHeaderCell>
                <CTableDataCell>{log.device_Name}</CTableDataCell>
                <CTableDataCell>{log.Sensor}</CTableDataCell>
                <CTableDataCell>{log.Value}</CTableDataCell>
                <CTableDataCell>
                  {log.updatedAt ? moment(log.updatedAt).format('DD/MM/YYYY HH:mm') : '--'}
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Logs
