export type payload = {
    key?: string
    newItem: string
}

export type key = Omit<payload, 'newItem'>
