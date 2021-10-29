using MongoDB.Bson;
using SharedLibrary.Models;

namespace SharedLibrary.Contracts
{
    public interface IDeleteService
    {
        GenericResponse<bool> Delete(string id);
    }
}
