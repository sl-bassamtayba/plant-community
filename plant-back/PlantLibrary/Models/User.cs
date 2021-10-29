using SharedLibrary.Database;
using System.Collections.Generic;
using System.Security.Principal;

namespace PlantLibrary.Models
{
    [BsonCollection("User")]
    public class User : Document
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Picture ProfilePicture { get; set; }
        public List<Plant> Wishlist { get; set; }
        public List<OwnedPlant> OwnedPlants { get; set; }

    }

}
