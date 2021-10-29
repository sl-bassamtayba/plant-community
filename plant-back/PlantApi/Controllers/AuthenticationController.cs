using Microsoft.AspNetCore.Mvc;
using PlantServices.Services.Contracts;
using SharedLibrary.Models;

namespace TransactionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IAuthenticateService _authenticationService;
        public AuthenticationController(IAuthenticateService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        // TODO : real service

        [HttpGet]
        [Route("/login")]
        public GenericResponse<bool> Login([FromBody] (string username, string password) request)
        {
            return _authenticationService.Login(request.username, request.password);
        }

        [HttpGet]
        [Route("/logout")]
        public GenericResponse<bool> Logout([FromBody] string username)
        {
            return _authenticationService.Logout(username);
        }

    }
}
