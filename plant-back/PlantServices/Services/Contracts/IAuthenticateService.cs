using PlantLibrary.Models;
using SharedLibrary.Models;

namespace PlantServices.Services.Contracts
{
    public interface IAuthenticateService
    {
        static User LoggedUser; 
        GenericResponse<bool> Login(string username, string password);
        GenericResponse<bool> Logout(string username);
    }
}
