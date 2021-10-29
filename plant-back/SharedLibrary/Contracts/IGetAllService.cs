using SharedLibrary.Models;
using System.Collections.Generic;

namespace SharedLibrary.Contracts
{
    public interface IGetAllService<T>
    {
        GenericResponse<List<T>> GetAll();
    }
}
