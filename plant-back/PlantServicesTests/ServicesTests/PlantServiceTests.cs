using MongoDB.Bson;
using NUnit.Framework;
using PlantLibrary.Models;
using PlantServices.Services.Contracts;
using SharedLibrary.Database;
using SharedLibrary.Models;

namespace PlantServiceTests.ServicesTests
{
    public class PlantServiceTests
    {
        private MongoRepositoryMock<Plant> _plantRepository;
        private IPlantService _plantService;

        [SetUp]
        public void Setup()
        {
            _plantRepository = new MongoRepositoryMock<Plant>();
            _plantService = new PlantServices.Services.Implementations.PlantService(_plantRepository);
        }

        [Test]
        public void Create_ShouldReturn_DataWithId()
        {
            // Given
            var plantName = "Monstera Peru";
            var plant = new Plant()
            {
                DefaultName = plantName
            };
            
            // When
            var result = _plantService.Create(plant);

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.IsNotNull(result.Data);
            Assert.IsNotNull(result.Data.Id);
            Assert.IsNotNull(result.Data.CreatedAt);
            Assert.AreEqual(plantName, result.Data.DefaultName);
        }

        [Test]
        public void Delete_ShouldReturn_returnTrue()
        {
            // Given
            var create = _plantRepository.InsertOne(new Plant()
            {
                DefaultName = "Zamioculcas Zamiifolia"
            });

            var id = create.Id.ToString();

            // When
            var result = _plantService.Delete(id);

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.IsTrue(result.Data);

        }

        [Test]
        public void Delete_ShouldReturn_returnFalse_WhenIdNotExist()
        {
            // When
            var randomId = new ObjectId().ToString();
            var result = _plantService.Delete(randomId);

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.IsFalse(result.Data);
        }

        [Test]
        public void GetAll_ShouldReturn_ListOfPlants()
        {
            // Given
            _plantRepository.InsertOne(new Plant()
            {
                DefaultName = "Monstera Deliciosa",
            });
            _plantRepository.InsertOne(new Plant()
            {
                DefaultName = "Calathea Makoyana",
            });

            // When
            var result = _plantService.GetAll();

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.AreEqual(2, result.Data.Count);

        }

        [Test]
        public void GetOne_ShouldReturn_returnOnePlant()
        {
            // Given
            var create = _plantRepository.InsertOne(new Plant()
            {
                DefaultName = "Sanseviera Moonshine"
            });

            var id = create.Id.ToString();

            // When
            var result = _plantService.GetOne(id);

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.IsNotNull(result.Data);
        }

        [Test]
        public void Update_ShouldReturn_returnTrue()
        {
            // Given
            var plant = _plantRepository.InsertOne(new Plant()
            {
                DefaultName = "Mostera"
            });

            plant.DefaultName = "Monstera";
            
            // When
            var result = _plantService.Update(plant);

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.IsTrue(result.Data);

            var updated = _plantRepository.FindById(plant.Id.ToString());
            Assert.IsNotNull(updated);
            Assert.AreEqual("Monstera", updated.DefaultName);
        }


    }
}
