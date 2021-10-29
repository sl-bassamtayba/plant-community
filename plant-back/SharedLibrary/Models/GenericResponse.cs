using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SharedLibrary.Models
{
    public class GenericResponse<T>
    {
        public GenericResponse()
        {
        }

        public GenericResponse(T data)
        {
            Status = ResponseStatus.OK;
            Message = "Success";
            Data = data;
        }

        public GenericResponse(ResponseStatus status, string message, T data)
        {
            Status = status;
            Message = message;
            Data = data;
        }

        public ResponseStatus Status { get; set; }
        public string Message { get; set; }

        public T Data { get; set; }
    }

    public enum ResponseStatus
    {
        OK,
        Warning,
        Error
    }
}
