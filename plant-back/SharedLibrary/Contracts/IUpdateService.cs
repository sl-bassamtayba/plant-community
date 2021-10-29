using SharedLibrary.Models;

namespace SharedLibrary.Contracts
{
    public interface IUpdateService<T>
    {
        GenericResponse<bool> Update(T data);
    }
}
