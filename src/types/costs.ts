export type PostCostItem = Omit<CostItem, 'id'>

export interface CostItem {
  id: number
  reportId: number
  label: string
  value: number
  type: number
}
