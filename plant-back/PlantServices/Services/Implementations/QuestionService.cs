using PlantLibrary.Models;
using PlantServices.Services.Contracts;
using SharedLibrary.Database;
using SharedLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlantServices.Services.Implementations
{
    public class QuestionService : IQuestionService
    {
        private readonly IMongoRepository<Question> _questionRepository;
        public QuestionService(IMongoRepository<Question> questionRepository)
        {
            _questionRepository = questionRepository;
        }
        
        public GenericResponse<bool> AddReplyToQuestion(string questionId, string text, User user)
        {
            var question = _questionRepository.FindById(questionId);
            
            var replyId = 1;
            if (question.Replies != null && question.Replies.Any())
            {
                replyId = Math.Max(question.Replies.Count, question.Replies.Select(r => r.Id).Max()) + 1;
            } 
            else
            {
                question.Replies = new List<Reply>();
            }

            var reply = new Reply()
            {
                Id = replyId,
                Text = text,
                User = user
            };

            question.Replies.Add(reply);

            var result = _questionRepository.ReplaceOne(question);

            return new GenericResponse<bool>(result);
        }

        public GenericResponse<Question> Create(Question data)
        {
            var result = _questionRepository.InsertOne(data);
            return new GenericResponse<Question>(result);
        }

        public GenericResponse<bool> Delete(string id)
        {
            var result = _questionRepository.DeleteById(id);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<List<Question>> GetAll()
        {
            var result = _questionRepository.AsQueryable().ToList();
            return new GenericResponse<List<Question>>(result);
        }

        public GenericResponse<Question> GetOne(string id)
        {
            var result = _questionRepository.FindById(id);
            return new GenericResponse<Question>(result);
        }

        public GenericResponse<bool> Update(Question data)
        {
            var result = _questionRepository.ReplaceOne(data);
            return new GenericResponse<bool>(result);
        }
    }
}
