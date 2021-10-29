using MongoDB.Bson;
using PlantLibrary.Models;
using PlantServices.Services.Contracts;
using SharedLibrary.Database;
using SharedLibrary.Models;
using System.Collections.Generic;
using System.Linq;

namespace PlantServices.Services.Implementations
{
    public class PlantService : IPlantService
    {

        private readonly IMongoRepository<Plant> _plantRepository;
        private readonly IMongoRepository<Transaction> _transactionRepository;
        private readonly IMongoRepository<Question> _questionRepository;
        private readonly IMongoRepository<User> _userRepository;

        public PlantService(IMongoRepository<Plant> plantRepository, IMongoRepository<Transaction> transactionRepository, IMongoRepository<Question> questionRepository, IMongoRepository<User> userRepository)
        {
            _plantRepository = plantRepository;
            _transactionRepository = transactionRepository;
            _questionRepository = questionRepository;
            _userRepository = userRepository;
        }

        public GenericResponse<Plant> Create(Plant data)
        {
            var result = _plantRepository.InsertOne(data);
            return new GenericResponse<Plant>(result);
        }

        public GenericResponse<bool> Delete(string id)
        {
            var result = _plantRepository.DeleteById(id);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<List<Plant>> GetAll()
        {
            var list = _plantRepository.AsQueryable().ToList();
            return new GenericResponse<List<Plant>>(list);
        }

        public GenericResponse<Plant> GetOne(string id)
        {
            var plant = _plantRepository.FindOne(p => p.Id == new ObjectId(id));
            return new GenericResponse<Plant>(plant);
        }

        public GenericResponse<bool> Update(Plant data)
        {
            var update = _plantRepository.ReplaceOne(data);
            return new GenericResponse<bool>(update);
        }

        public GenericResponse<List<PlantCare>> GetCares(string id)
        {
            var result = _userRepository.FilterBy(u => u.OwnedPlants.Any(op => op.Plant.Id.ToString() == id))
                .SelectMany(u => u.OwnedPlants).Where(op => op.Plant.Id.ToString() == id)
                .SelectMany(op => op.Cares).ToList();

            return new GenericResponse<List<PlantCare>>(result);
        }

        public GenericResponse<List<Question>> GetQuestions(string id)
        {
            var result = _questionRepository.FilterBy(t => t.Plant.Id.ToString() == id).ToList();
            return new GenericResponse<List<Question>>(result);
        }

        public GenericResponse<List<Transaction>> GetTransactions(string id)
        {
            var result = _transactionRepository.FilterBy(t => t.Plant.Id.ToString() == id).ToList();
            return new GenericResponse<List<Transaction>>(result);
        }
    }
}
