using MongoDB.Bson;
using System;

namespace PlantLibrary.Models
{
    public class TransactionProposal
    {
        public TransactionProposal()
        {
            Id = new ObjectId();
        }

        public ObjectId Id { get; private set; }
        public User User { get; set; }
        public string Text { get; set; }
        public bool? validation { get; set; }
    }
}
