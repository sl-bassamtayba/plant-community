export interface IPlant {
  id: number;
  family: string;
  genus: string;
  species: string;
  cultivar: string;
  variety: string;
  scientificName: string;
  commonNames: string[];
  description: string;
  locationOrigin: string;
  temperatureCMin: string;
  temperatureCMax: string;
  temperatureCIdeal: string;
  brightness: string;
  humidity: string;
  substrate: string;
  soilPH: string;
}

export class Plant {
  Id: number;
  Brightness: string;
  CommonNames: string[];
  Cultivar: string;
  Description: string;
  Family: string;
  Genus: string;
  Humidity: string;
  LocationOrigin: string;
  ScientificName: string;
  SoilPH: string;
  Species: string;
  Substrate: string;
  TemperatureCMax: string;
  TemperatureCMin: string;
  TemperatureCIdeal: string;
  Variety: string;

  constructor(input: IPlant) {
    this.Id = input.id;
    this.Brightness = input.brightness;
    this.CommonNames = input.commonNames;
    this.Cultivar = input.cultivar;
    this.Description = input.description;
    this.Family = input.family;
    this.Genus = input.genus;
    this.Humidity = input.humidity;
    this.LocationOrigin = input.locationOrigin;
    this.ScientificName = input.scientificName;
    this.SoilPH = input.soilPH;
    this.Species = input.species;
    this.Substrate = input.substrate;
    this.TemperatureCMax = input.temperatureCMax;
    this.TemperatureCMin = input.temperatureCMin;
    this.TemperatureCIdeal = input.temperatureCIdeal;
    this.Variety = input.variety;
  }

  getSearchValue(): string {
    let str = this.ScientificName;

    for (const cn of this.CommonNames) {
      str += ' ' + cn;
    }

    return str;
  }

}
