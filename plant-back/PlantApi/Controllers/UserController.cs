using Microsoft.AspNetCore.Mvc;
using PlantLibrary.Models;
using PlantServices.Services.Contracts;
using SharedLibrary.Models;
using System.Collections.Generic;

namespace UserApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public GenericResponse<User> CreateUser([FromBody] User user)
        {
            return _userService.Create(user);
        }

        [HttpGet]
        [Route("{id}")]
        public GenericResponse<User> GetOneUser(string id)
        {
            return _userService.GetOne(id);
        }

        [HttpGet]
        public GenericResponse<List<User>> GetAllUsers()
        {
            return _userService.GetAll();
        }

        [HttpPut]
        public GenericResponse<bool> UpdateUser([FromBody] User user)
        {
            return _userService.Update(user);
        }

        [HttpDelete]
        [Route("{id}")]
        public GenericResponse<bool> DeleteUser(string id)
        {
            return _userService.Delete(id);
        }

        [HttpGet]
        [Route("{id}/questions")]
        public GenericResponse<List<Question>> GetQuestions(string id)
        {
            return _userService.GetQuestions(id);
        }

        [HttpGet]
        [Route("{id}/transactions")]
        public GenericResponse<List<Transaction>> GetTransactions(string id)
        {
            return _userService.GetTransactions(id);
        }

        [HttpGet]
        [Route("{id}/replied-transaction")]
        public GenericResponse<List<Transaction>> GetRepliedTransactions(string id)
        {
            return _userService.GetRepliedTransactions(id);
        }

        [HttpPost]
        [Route("{id}/wishlist/{plantId}")]
        public GenericResponse<bool> AddPlantToWishList(string id, string plantId)
        {
            return _userService.AddPlantToWishList(id, plantId);
        }

        [HttpDelete]
        [Route("{id}/wishlist/{plantId}")]
        public GenericResponse<bool> RemovePlantFromWishList(string id, string plantId)
        {
            return _userService.RemovePlantFromWishList(id, plantId);
        }


        [HttpPost]
        [Route("{id}/owned/{plantId}")]
        public GenericResponse<bool> AddOwnedPlant(string id, string plantId, [FromBody] (string nickname, List<PlantCare> cares) request)
        {
            return _userService.AddOwnedPlant(id, plantId, request.nickname, request.cares);
        }

        [HttpDelete]
        [Route("{id}/owned/{ownedPlantId}")]
        public GenericResponse<bool> RemoveOwnedPlant(string id, string ownedPlantId)
        {
            return _userService.RemoveOwnedPlant(id, ownedPlantId);
        }

        [HttpPut]
        [Route("{id}/owned/{ownedPlantId}")]
        public GenericResponse<bool> UpdateOwnedPlant(string id, string ownedPlantId, [FromBody] OwnedPlant ownedPlant)
        {
            if(ownedPlant.Id.ToString() != ownedPlantId)
            {
                return new GenericResponse<bool>(ResponseStatus.Error, "Url and Data not matching", false);
            }

            return _userService.UpdateOwnedPlant(id, ownedPlant);
        }

        [HttpPost]
        [Route("{id}/owned/{ownedPlantId}/cares")]
        public GenericResponse<bool> AddPlantCares(string id, string ownedPlantId, [FromBody] List<PlantCare> cares)
        {
            return _userService.AddPlantCares(id, ownedPlantId, cares);
        }

        [HttpDelete]
        [Route("{id}/owned/{ownedPlantId}/cares")]
        public GenericResponse<bool> RemovePlantCares(string id, string ownedPlantId, [FromBody] PlantCare care)
        {
            return _userService.RemovePlantCares(id, ownedPlantId, care);
        }

    }
}
