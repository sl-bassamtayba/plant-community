using PlantLibrary.Models;
using SharedLibrary.Contracts;
using SharedLibrary.Models;
using System.Collections.Generic;

namespace PlantServices.Services.Contracts
{
    public interface IUserService : ICrudService<User>
    {
        GenericResponse<List<Question>> GetQuestions(string userId);

        GenericResponse<List<Transaction>> GetTransactions(string userId);
        GenericResponse<List<Transaction>> GetRepliedTransactions(string userId);

        GenericResponse<bool> AddPlantToWishList(string userId, string plantId);
        GenericResponse<bool> RemovePlantFromWishList(string userId, string plantId);

        GenericResponse<bool> AddOwnedPlant(string userId, string plantId, string nickName, List<PlantCare> cares = null);
        GenericResponse<bool> RemoveOwnedPlant(string userId, string ownedPlantId);
        GenericResponse<bool> UpdateOwnedPlant(string userId, OwnedPlant plant);
        GenericResponse<bool> AddPlantCares(string userId, string ownedPlantId, List<PlantCare> cares);
        GenericResponse<bool> RemovePlantCares(string userId, string ownedPlantId, PlantCare care);
    }
}
