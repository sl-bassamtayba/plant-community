using PlantLibrary.Models;
using PlantServices.Services.Contracts;
using SharedLibrary.Database;
using SharedLibrary.Models;
using System.Collections.Generic;
using System.Linq;

namespace PlantServices.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IMongoRepository<User> _userRepository;
        private readonly IMongoRepository<Plant> _plantRepository;
        private readonly IMongoRepository<Question> _questionRepository;
        private readonly IMongoRepository<Transaction> _transactionRepository;

        public UserService(IMongoRepository<User> userRepository, IMongoRepository<Plant> plantRepository, IMongoRepository<Question> questionRepository, IMongoRepository<Transaction> transactionRepository)
        {
            _userRepository = userRepository;
            _plantRepository = plantRepository;
            _questionRepository = questionRepository;
            _transactionRepository = transactionRepository;
        }

        public GenericResponse<User> Create(User data)
        {
            var result = _userRepository.InsertOne(data);
            return new GenericResponse<User>(result);
        }

        public GenericResponse<bool> Delete(string id)
        {
            var result = _userRepository.DeleteById(id);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<List<User>> GetAll()
        {
            var result = _userRepository.AsQueryable().ToList();
            return new GenericResponse<List<User>>(result);
        }

        public GenericResponse<User> GetOne(string id)
        {
            var result = _userRepository.FindById(id);
            return new GenericResponse<User>(result);
        }

        public GenericResponse<List<Question>> GetQuestions(string userId)
        {
            var result = _questionRepository.FilterBy(q => q.User.Id.ToString() == userId).ToList();
            return new GenericResponse<List<Question>>(result);
        }

        public GenericResponse<List<Transaction>> GetRepliedTransactions(string userId)
        {
            var result = _transactionRepository.FilterBy(q => q.Buyer.Id.ToString() == userId || q.Proposals.Any(p => p.User.Id.ToString() == userId)).ToList();
            return new GenericResponse<List<Transaction>>(result);
        }

        public GenericResponse<List<Transaction>> GetTransactions(string userId)
        {
            var result = _transactionRepository.FilterBy(q => q.Seller.Id.ToString() == userId).ToList();
            return new GenericResponse<List<Transaction>>(result);
        }

        public GenericResponse<bool> Update(User data)
        {
            var result = _userRepository.ReplaceOne(data);
            return new GenericResponse<bool>(result);
        }


        #region Owned Plant
        public GenericResponse<bool> AddOwnedPlant(string userId, string plantId, string nickName, List<PlantCare> cares = null)
        {
            var user = _userRepository.FindById(userId);
            var plant = _plantRepository.FindById(plantId);
            var ownedPlant = new OwnedPlant()
            {
                Plant = plant,
                NickName = nickName
            };

            if (cares != null)
            {
                foreach (var care in cares)
                {
                    ownedPlant.AddCare(care);
                }
            }

            user.OwnedPlants.Add(ownedPlant);

            var result = _userRepository.ReplaceOne(user);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<bool> RemoveOwnedPlant(string userId, string ownedPlantId)
        {
            var user = _userRepository.FindById(userId);
            var count = user.OwnedPlants.RemoveAll(op => op.Id.ToString() == ownedPlantId);

            var result = _userRepository.ReplaceOne(user);
            return new GenericResponse<bool>(result && count > 0);
        }

        public GenericResponse<bool> UpdateOwnedPlant(string userId, OwnedPlant ownedPlant)
        {
            var user = _userRepository.FindById(userId);

            var count = user.OwnedPlants.RemoveAll(op => op.Id == ownedPlant.Id);
            user.OwnedPlants.Add(ownedPlant);

            var result = _userRepository.ReplaceOne(user);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<bool> AddPlantCares(string userId, string ownedPlantId, List<PlantCare> cares)
        {
            var user = _userRepository.FindById(userId);
            var ownedPlant = user.OwnedPlants.FirstOrDefault(op => op.Id.ToString() == ownedPlantId);

            foreach (var care in cares)
            {
                ownedPlant.AddCare(care);
            }

            var result = _userRepository.ReplaceOne(user);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<bool> RemovePlantCares(string userId, string ownedPlantId, PlantCare care)
        {
            var user = _userRepository.FindById(userId);
            var ownedPlant = user.OwnedPlants.FirstOrDefault(op => op.Id.ToString() == ownedPlantId);

            var count = ownedPlant.Cares.RemoveAll(op => op.Equals(care));

            var result = _userRepository.ReplaceOne(user);
            return new GenericResponse<bool>(result && count > 0);
        }

        #endregion

        #region WishList
        public GenericResponse<bool> AddPlantToWishList(string userId, string plantId)
        {
            var user = _userRepository.FindById(userId);
            var plant = _plantRepository.FindById(plantId);
            if(user.Wishlist == null)
            {
                user.Wishlist = new List<Plant>();
            }
            user.Wishlist.Add(plant);

            var result = _userRepository.ReplaceOne(user);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<bool> RemovePlantFromWishList(string userId, string plantId)
        {
            var user = _userRepository.FindById(userId);
            var count = user.Wishlist.RemoveAll(p => p.Id.ToString() == plantId);

            var result = _userRepository.ReplaceOne(user);
            return new GenericResponse<bool>(result && count > 0);
        }
        #endregion

    }
}
