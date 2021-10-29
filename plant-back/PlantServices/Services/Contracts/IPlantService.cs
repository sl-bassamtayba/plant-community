using PlantLibrary.Models;
using SharedLibrary.Contracts;
using SharedLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlantServices.Services.Contracts
{
    public interface IPlantService : ICrudService<Plant>
    {
        GenericResponse<List<Question>> GetQuestions(string id);
        GenericResponse<List<Transaction>> GetTransactions(string id);
        GenericResponse<List<PlantCare>> GetCares(string id);
    }
}
