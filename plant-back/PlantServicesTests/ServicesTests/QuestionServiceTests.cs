using MongoDB.Bson;
using NUnit.Framework;
using PlantLibrary.Models;
using PlantServices.Services.Contracts;
using PlantServices.Services.Implementations;
using SharedLibrary.Database;
using SharedLibrary.Models;

namespace PlantServiceTests.ServicesTests
{
    public class QuestionServiceTests
    {
        private MongoRepositoryMock<Question> _questionRepository;
        private IQuestionService _questionService;

        [SetUp]
        public void Setup()
        {
            _questionRepository = new MongoRepositoryMock<Question>();
            _questionService = new QuestionService(_questionRepository);
        }

        [Test]
        public void Create_ShouldReturn_DataWithId()
        {
            // Given
            var question = new Question()
            {
                Title = "Lorem ipsum",
                Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit."
            };
            
            // When
            var result = _questionService.Create(question);

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.IsNotNull(result.Data);
            Assert.IsNotNull(result.Data.Id);
            Assert.IsNotNull(result.Data.CreatedAt);
        }

        [Test]
        public void Delete_ShouldReturn_True()
        {
            // Given
            var create = _questionRepository.InsertOne(new Question()
            {
                Title = "Lorem ipsum",
                Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit."
            });

            var id = create.Id.ToString();

            // When
            var result = _questionService.Delete(id);

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.IsTrue(result.Data);

        }

        [Test]
        public void Delete_ShouldReturn_False_WhenIdNotExist()
        {
            // When
            var randomId = new ObjectId().ToString();
            var result = _questionService.Delete(randomId);

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.IsFalse(result.Data);
        }

        [Test]
        public void GetAll_ShouldReturn_ListOfQuestions()
        {
            // Given
            _questionRepository.InsertOne(new Question()
            {
                Title = "Lorem ipsum",
                Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit."
            });

            // When
            var result = _questionService.GetAll();

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.AreEqual(1, result.Data.Count);

        }

        [Test]
        public void GetOne_ShouldReturn_OneQuestion()
        {
            // Given
            var create = _questionRepository.InsertOne(new Question()
            {
                Title = "Lorem ipsum",
                Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit."
            });

            var id = create.Id.ToString();

            // When
            var result = _questionService.GetOne(id);

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.IsNotNull(result.Data);
        }

        [Test]
        public void Update_ShouldReturn_True()
        {
            // Given
            var question = _questionRepository.InsertOne(new Question()
            {
                Title = "Lorem ipsum",
                Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit."
            });

            question.Title = "New Title";
            
            // When
            var result = _questionService.Update(question);

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.IsTrue(result.Data);

            var updated = _questionRepository.FindById(question.Id.ToString());
            Assert.IsNotNull(updated);
            Assert.AreEqual("New Title", updated.Title);
        }

        [Test]
        public void AddReplyToQuestion_ShouldReturn_True()
        {
            // Given
            var question = _questionRepository.InsertOne(new Question()
            {
                Title = "Lorem ipsum",
                Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit."
            });
            var questionId = question.Id.ToString();
            var replyText = "Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis.";
            var user = new User()
            {
                Id = new ObjectId(),
                Name = "Toto",
            };

            // When
            var result = _questionService.AddReplyToQuestion(questionId, replyText, user);

            // Then
            Assert.IsNotNull(result);
            Assert.AreEqual(ResponseStatus.OK, result.Status);
            Assert.IsTrue(result.Data);
        }

    }
}
