interface ILocationState {
  locationHistory: string;
  scrollX: number;
}

export interface ILocation extends Location {
  state: ILocationState;
}
