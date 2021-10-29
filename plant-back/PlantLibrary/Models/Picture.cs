using SharedLibrary.Database;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PlantLibrary.Models
{
    public class Picture : Document
    {
        public string Label { get; set; }
        public string Location { get; set; }
        public DateTime InsertDate { get; set; }

    }
}
