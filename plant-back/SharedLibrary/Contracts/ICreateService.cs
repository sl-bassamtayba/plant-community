using SharedLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedLibrary.Contracts
{
    public interface ICreateService<T>
    {
        GenericResponse<T> Create(T data);
    }
}
