export interface Weather {
  weather: Array<{
    main: string
  }>
  wind: {
    speed: number
  }
}
