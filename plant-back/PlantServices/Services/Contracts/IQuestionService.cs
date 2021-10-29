using PlantLibrary.Models;
using SharedLibrary.Contracts;
using SharedLibrary.Models;

namespace PlantServices.Services.Contracts
{
    public interface IQuestionService: ICrudService<Question>
    {
        GenericResponse<bool> AddReplyToQuestion(string questionId, string text, User user);
    }
}
