import { updateSnapshotValidator } from '#validators/snapshot'
import type { HttpContext } from '@adonisjs/core/http'

const SNAPSHOTS = new Array(100).fill(0).map((_, index) => ({
  name: `Policy ${index}`,
  id: index + 1,
  directory: `/policy_${index}`,
  schedule: {
    type: 'daily',
    timezone: 'America/Los Angeles',
    time: {
      hour: 7,
      minutes: 0,
    },
    days: [0, 1, 2, 3, 4],
    delete: {
      occurrence: 'never',
      after: index,
      unit: 'day',
    },
  },
  enabled: true,
  locked: true,
}))

export default class SnapshotsController {
  async get({ params }: HttpContext) {
    return SNAPSHOTS.find(({ id }) => id === Number(params.id))
  }

  async update({ params, response, request }: HttpContext) {
    const payload = await request.validateUsing(updateSnapshotValidator)
    const snapshotIndex = SNAPSHOTS.findIndex(({ id }) => id === Number(params.id))
    if (snapshotIndex === -1) {
      return response.status(404).json({})
    }

    SNAPSHOTS[snapshotIndex] = {
      ...SNAPSHOTS[snapshotIndex],
      ...payload,
    }

    return SNAPSHOTS[snapshotIndex]
  }
}
