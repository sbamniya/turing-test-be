/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ClustersController from '#controllers/clusters_controller'
import SnapshotsController from '#controllers/snapshots_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/:clusterId/iops', [ClustersController, 'iops'])

router.get('/:clusterId/throughput', [ClustersController, 'throughput'])

router.get('/snapshots/:id', [SnapshotsController, 'get'])
router.put('/snapshots/:id', [SnapshotsController, 'update'])
