using Microsoft.AspNetCore.Mvc;
using PlantLibrary.Models;
using PlantServices.Services.Contracts;
using SharedLibrary.Models;
using System.Collections.Generic;

namespace PlantApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private IPlantService _plantService;
        public PlantController(IPlantService plantService)
        {
            _plantService = plantService;
        }

        [HttpPost]
        public GenericResponse<Plant> CreatePlant([FromBody] Plant plant)
        {
            return _plantService.Create(plant);
        }

        [HttpGet]
        [Route("{id}")]
        public GenericResponse<Plant> GetOnePlant(string id)
        {
            return _plantService.GetOne(id);
        }

        [HttpGet]
        public GenericResponse<List<Plant>> GetAllPlants()
        {
            return _plantService.GetAll();
        }

        [HttpPut]
        public GenericResponse<bool> UpdatePlant([FromBody] Plant plant)
        {
            return _plantService.Update(plant);
        }

        [HttpDelete]
        [Route("{id}")]
        public GenericResponse<bool> DeletePlant(string id)
        {
            return _plantService.Delete(id);
        }

        [HttpGet]
        [Route("{id}/questions")]
        public GenericResponse<List<Question>> GetPlantQuestions(string id)
        {
            return _plantService.GetQuestions(id);
        }

        [HttpGet]
        [Route("{id}/transactions")]
        public GenericResponse<List<Transaction>> GetPlantTransactions(string id)
        {
            return _plantService.GetTransactions(id);
        }

        [HttpGet]
        [Route("{id}/cares")]
        public GenericResponse<List<PlantCare>> GetPlantCares(string id)
        {
            return _plantService.GetCares(id);
        }

    }
}
