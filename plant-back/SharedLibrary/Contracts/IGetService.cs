using MongoDB.Bson;
using SharedLibrary.Models;

namespace SharedLibrary.Contracts
{
    public interface IGetService<T>
    {
        GenericResponse<T> GetOne(string id);
    }
}
