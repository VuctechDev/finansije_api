export type PostPaymentItem = Omit<PaymentItem, 'id'>

export interface PaymentItem {
  id: number
  reportId: number
  label: string
  value: number
  type: number
}