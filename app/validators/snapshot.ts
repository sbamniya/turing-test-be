import vine from '@vinejs/vine'

export const updateSnapshotValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    directory: vine.string().trim(),
    schedule: vine.object({
      type: vine.enum(['daily', 'weekly']),
      timezone: vine.enum(['America/Los Angeles']),
      time: vine.object({
        hour: vine.number().min(0).max(23),
        minutes: vine.number().min(0).max(59),
      }),
      days: vine.array(vine.number().min(0).max(6)).distinct(),
      delete: vine.object({
        occurrence: vine.enum(['never']),
        after: vine.number(),
        unit: vine.enum(['day', 'minute', 'week']),
      }),
    }),
    enabled: vine.boolean(),
    locked: vine.boolean(),
  })
)
