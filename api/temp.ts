import { getJson } from 'api'

export const getTemp = () => getJson('/temp')
