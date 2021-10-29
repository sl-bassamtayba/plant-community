using SharedLibrary.Database;
using System;
using System.Collections.Generic;

namespace PlantLibrary.Models
{
    [BsonCollection("Transaction")]
    public class Transaction : Document
    {
        public string Description { get; set; }
        public string LocationPostalCode { get; set; }
        public string LocationCity { get; set; }
        public double Price { get; set; } // TODO : if sale
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsClosed { get; set; } // Default : false
        public Plant Plant { get; set; }
        public PlantSize PlantSize { get; set; }
        public User Seller { get; set; }
        public User Buyer { get; set; }
        public List<DeliveryOption> DeliveryOptions { get; set; }
        public List<TransactionType> TransactionTypes { get; set; }
        public List<Picture> Pictures { get; set; }


        public List<TransactionProposal> Proposals { get; set; }


    }

}
