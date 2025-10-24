export class OrderDto {
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  constructor(customerName: string, customerPhone: string, comment: string, id: number) {
    this.status = 'OPEN'
    this.courierId = 0
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }

  // add a method to create a new instance with random data
  static createOrderWithRandomData(): OrderDto {
    return new OrderDto('John Doe', '+123456789', 'Urgent order', Math.floor(Math.random() * 100))
  }

  static createOrderWithLowPriority(): OrderDto {
    return new OrderDto('John Doe', '+123456789', 'Low Priority', Math.floor(Math.random() * 100))
  }
}
