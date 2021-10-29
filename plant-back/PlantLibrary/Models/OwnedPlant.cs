using MongoDB.Bson;
using System.Collections.Generic;

namespace PlantLibrary.Models
{
    public class OwnedPlant
    {
        public ObjectId Id { get; private set; }
        public string NickName { get; set; }  
        public Plant Plant { get; set; }

        public List<PlantCare> Cares => _plantcares;
        private List<PlantCare> _plantcares;

        public OwnedPlant()
        {
            Id = new ObjectId();
        }

        public void AddCare(PlantCare care)
        {
            if(_plantcares == null)
            {
                _plantcares = new List<PlantCare>();
            }

            //TODO: add check on month value 
            _plantcares.Add(care);
        }

        public void RemoveCare(PlantCare care)
        {
            _plantcares.Remove(care);
        }

    }

}
