export type Driver = {
  id: number,
  name: string,
  description: string,
  vehicle: string,
  rating: {
    review: number,
    comment: string
  },
  value: number,
  distance: number
}