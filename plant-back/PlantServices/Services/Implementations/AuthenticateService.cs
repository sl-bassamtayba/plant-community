using PlantLibrary.Models;
using PlantServices.Services.Contracts;
using SharedLibrary.Database;
using SharedLibrary.Models;

namespace PlantServices.Services.Implementations
{
    public class AuthenticateService : IAuthenticateService
    {
        //TODO : real authentication

        private readonly IMongoRepository<User> _userRepository;

        public static User LoggedUser { get; set; }

        public GenericResponse<bool> Login(string username, string password)
        {
            bool isValid;
            if(isValid = CheckUserPassword(username, password, out var user))
            {
                LoggedUser = user;
            }

            return new GenericResponse<bool>(isValid);
        }

        public GenericResponse<bool> Logout(string username)
        {
            if (LoggedUser.Name == username)
            {
                LoggedUser = null;
            }

            return new GenericResponse<bool>(LoggedUser == null);
        }

        private bool CheckUserPassword(string username, string password, out User user)
        {
            user = _userRepository.FindOne(u => u.Name == username);
            return user.Password == password;
        }

    }
}
