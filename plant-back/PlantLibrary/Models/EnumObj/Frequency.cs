using SharedLibrary.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;


namespace PlantLibrary.Models
{
    public class Frequency : EnumObject
    {
        // RELATIONS
        [JsonIgnore]
        public virtual ICollection<PlantCare> PlantCares { get; set; }

    }
}
