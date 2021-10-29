using SharedLibrary.Contracts;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PlantLibrary.Models
{
    public class TransactionType : EnumObject
    {
        // RELATIONS
        [JsonIgnore]
        public virtual ICollection<Transaction> Transactions { get; set; }

    }
}
