using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SharedLibrary.Database
{
    public interface IMongoRepository<TDocument> where TDocument : IDocument
    {
        IQueryable<TDocument> AsQueryable();

        IEnumerable<TDocument> FilterBy(
            Expression<Func<TDocument, bool>> filterExpression);
        IEnumerable<TProjected> FilterBy<TProjected>(
            Expression<Func<TDocument, bool>> filterExpression,
            Expression<Func<TDocument, TProjected>> projectionExpression);

        TDocument FindOne(Expression<Func<TDocument, bool>> filterExpression);
        Task<TDocument> FindOneAsync(Expression<Func<TDocument, bool>> filterExpression);
        TDocument FindById(string id);
        Task<TDocument> FindByIdAsync(string id);

        TDocument InsertOne(TDocument document);
        Task<TDocument> InsertOneAsync(TDocument document);
        void InsertMany(ICollection<TDocument> documents);
        Task InsertManyAsync(ICollection<TDocument> documents);

        bool ReplaceOne(TDocument document);
        Task<bool> ReplaceOneAsync(TDocument document);

        bool DeleteOne(Expression<Func<TDocument, bool>> filterExpression);
        Task<bool> DeleteOneAsync(Expression<Func<TDocument, bool>> filterExpression);
        bool DeleteById(string id);
        Task<bool> DeleteByIdAsync(string id);
        void DeleteMany(Expression<Func<TDocument, bool>> filterExpression);
        Task DeleteManyAsync(Expression<Func<TDocument, bool>> filterExpression);
    }
}
