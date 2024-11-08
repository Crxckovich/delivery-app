export interface ProductInterface {
    id: number
    name: string
    price: number
    ingredients: string[],
    tag?: string,
    image: string
    rating: number
}
