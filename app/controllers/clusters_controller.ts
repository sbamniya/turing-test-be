import type { HttpContext } from '@adonisjs/core/http'
import dayjs from 'dayjs'

type DataRecord = {
  cluster_id: number
  date: string
  read: number
  write: number
}

const getRandomNumber = (max: number) => Math.floor(Math.random() * max)

const clusters = new Array(100).fill(0).map((_, i) => i + 1)

const IOPS_DATA = clusters.reduce((acc, curr) => {
  acc.push(
    ...new Array(1000).fill(0).map((_, i) => ({
      date: dayjs().subtract(i, 'day').format(),
      read: getRandomNumber(500),
      write: getRandomNumber(200),
      cluster_id: curr,
    }))
  )
  return acc
}, [] as DataRecord[])

const THROUGHPUT_DATA = clusters.reduce((acc, curr) => {
  acc.push(
    ...new Array(1000).fill(0).map((_, i) => ({
      date: dayjs().subtract(i, 'day').format(),
      read: getRandomNumber(200),
      write: getRandomNumber(150),
      cluster_id: curr,
    }))
  )
  return acc
}, [] as DataRecord[])

export default class ClustersController {
  async iops({ params }: HttpContext) {
    const data = IOPS_DATA.filter(({ cluster_id }) => cluster_id === Number(params.clusterId))
    const { read, write } = data.reduce(
      (acc, { read: cread, write: cwrite }) => ({
        ...acc,
        read: acc.read + cread,
        write: acc.write + cwrite,
      }),
      { read: 0, write: 0 }
    )
    return {
      data,
      read,
      write,
    }
  }

  async throughput({ params }: HttpContext) {
    const data = THROUGHPUT_DATA.filter(({ cluster_id }) => cluster_id === Number(params.clusterId))
    const { read, write } = data.reduce(
      (acc, { read: cread, write: cwrite }) => ({
        ...acc,
        read: acc.read + cread,
        write: acc.write + cwrite,
      }),
      { read: 0, write: 0 }
    )
    return {
      data,
      read: read / data.length,
      write: write / data.length,
    }
  }
}
