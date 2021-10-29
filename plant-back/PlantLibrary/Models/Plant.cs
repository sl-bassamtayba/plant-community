using SharedLibrary.Database;
using System.Collections.Generic;

namespace PlantLibrary.Models
{
    [BsonCollection("Plant")]
    public class Plant : Document
    {
        public string DefaultName { get; set; }

        public string Family { get; set; }
        public string Genus { get; set; }
        public string Species { get; set; }
        public string Cultivar { get; set; }
        public string Variety { get; set; }
        public string ScientificName { get; set; }
        public List<string> CommonNames { get; set; }
        public string Description { get; set; }
        public string LocationOrigin { get; set; }

        public string TemperatureCMin { get; set; }
        public string TemperatureCMax { get; set; }
        public string TemperatureCIdeal { get; set; }
        public string Brightness { get; set; }
        public string Humidity { get; set; }
        public string Substrate { get; set; }
        public string SoilPH { get; set; }
        public string Multiplication { get; set; }
        public string Wintering { get; set; }

        public List<Picture> Pictures { get; set; }

    }
}
