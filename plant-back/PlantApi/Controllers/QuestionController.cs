using Microsoft.AspNetCore.Mvc;
using PlantLibrary.Models;
using PlantServices.Services.Contracts;
using SharedLibrary.Models;
using System.Collections.Generic;

namespace QuestionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private IQuestionService _questionService;

        public QuestionController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpPost]
        public GenericResponse<Question> CreateQuestion([FromBody] Question question)
        {
            return _questionService.Create(question);
        }

        [HttpGet]
        [Route("{id}")]
        public GenericResponse<Question> GetOneQuestion(string id)
        {
            return _questionService.GetOne(id);
        }

        [HttpGet]
        public GenericResponse<List<Question>> GetAllQuestions()
        {
            return _questionService.GetAll();
        }

        [HttpPut]
        public GenericResponse<bool> UpdateQuestion([FromBody] Question question)
        {
            return _questionService.Update(question);
        }

        [HttpDelete]
        [Route("{id}")]
        public GenericResponse<bool> DeleteQuestion(string id)
        {
            return _questionService.Delete(id);
        }

        [HttpPost]
        [Route("{id}/reply")]
        public GenericResponse<bool> ReplyToQuestion(string id, [FromBody] string text)
        {
            var loggedUser = IAuthenticateService.LoggedUser; // TODO : replace by real authenticate user
            return _questionService.AddReplyToQuestion(id, text, loggedUser);
        }


    }
}
