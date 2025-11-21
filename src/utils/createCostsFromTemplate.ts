import db from '../db/services'

export const createCostsFromTemplate = async (reportId: number) => {
  try {
    const templates = await db.getTemplate()
    const values = templates.map((template) => {
      const { label, value, type } = template
      return [reportId, label, value, type]
    })
    console.log(values)
    await db.createCostsFromTemplate(values)
  } catch (err) {
    console.log(err)
    throw err
  }
}
