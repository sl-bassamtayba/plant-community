using SharedLibrary.Contracts;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace PlantLibrary.Models
{
    public class CareType : EnumObject
    {
        // RELATIONS
        [JsonIgnore]
        public virtual ICollection<PlantCare> PlantCares { get; set; }
    }
}
