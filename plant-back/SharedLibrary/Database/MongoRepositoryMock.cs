using MongoDB.Bson;
using MongoDB.Driver;
using SharedLibrary.Database.Mongo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SharedLibrary.Database
{
    public class MongoRepositoryMock<TDocument> : IMongoRepository<TDocument>
        where TDocument : IDocument
    {
        private readonly List<TDocument> _collection;

        public MongoRepositoryMock()
        {
            _collection = new List<TDocument>();
        }

        public virtual IQueryable<TDocument> AsQueryable()
        {
            return _collection.AsQueryable();
        }



        public virtual IEnumerable<TDocument> FilterBy(
            Expression<Func<TDocument, bool>> filterExpression)
        {
            return _collection.Where(filterExpression.Compile());
        }

        public virtual IEnumerable<TProjected> FilterBy<TProjected>(
            Expression<Func<TDocument, bool>> filterExpression,
            Expression<Func<TDocument, TProjected>> projectionExpression)
        {
            // TODO : check
            return (IEnumerable<TProjected>) _collection.Where(filterExpression.Compile());
        }

        public virtual TDocument FindOne(Expression<Func<TDocument, bool>> filterExpression)
        {
            return _collection.FirstOrDefault(filterExpression.Compile());
        }

        public virtual Task<TDocument> FindOneAsync(Expression<Func<TDocument, bool>> filterExpression)
        {
            return Task.Run(() => _collection.FirstOrDefault(filterExpression.Compile()));
        }

        public virtual TDocument FindById(string id)
        {
            var objectId = new ObjectId(id);
            return _collection.FirstOrDefault(c => c.Id == objectId);
        }

        public virtual Task<TDocument> FindByIdAsync(string id)
        {
            return Task.Run(() =>
            {
                var objectId = new ObjectId(id);
                return _collection.FirstOrDefault(c => c.Id == objectId);
            });
        }


        public virtual TDocument InsertOne(TDocument document)
        {
            document.Id = new ObjectId();
            _collection.Add(document);
            return document;
        }

        public virtual Task<TDocument> InsertOneAsync(TDocument document)
        {
            return Task.Run(() => {
                document.Id = new ObjectId();
                _collection.Add(document);
                return document;
            });
        }

        public void InsertMany(ICollection<TDocument> documents)
        {
            foreach (var item in documents)
            {
                item.Id = new ObjectId();
            }

            _collection.AddRange(documents);
        }


        public virtual async Task InsertManyAsync(ICollection<TDocument> documents)
        {
            await Task.Run(() => {
                foreach (var item in documents)
                {
                    item.Id = new ObjectId();
                }
                _collection.AddRange(documents);
            });
        }

        public bool ReplaceOne(TDocument document)
        {
            var index = _collection.FindIndex(x => x.Id == document.Id);
            _collection[index] = document;

            return index >= 0;
        }

        public virtual async Task<bool> ReplaceOneAsync(TDocument document)
        {
            return await Task.Run(() => {
                var index = _collection.FindIndex(x => x.Id == document.Id);
                _collection[index] = document;

                return index >= 0;
            });
        }

        public bool DeleteOne(Expression<Func<TDocument, bool>> filterExpression)
        {
            var find = _collection.FirstOrDefault(filterExpression.Compile());
            var delete = _collection.Remove(find);
            return delete;
        }

        public Task<bool> DeleteOneAsync(Expression<Func<TDocument, bool>> filterExpression)
        {
            return Task.Run(() => {
                var find = _collection.FirstOrDefault(filterExpression.Compile());
                var delete = _collection.Remove(find);
                return delete;
            });
        }

        public bool DeleteById(string id)
        {
            var objectId = new ObjectId(id);
            var find = _collection.FirstOrDefault(x => x.Id == objectId);
            var delete = _collection.Remove(find);
            return delete;
        }

        public Task<bool> DeleteByIdAsync(string id)
        {
            return Task.Run(() =>
            {
                var objectId = new ObjectId(id);
                var find = _collection.FirstOrDefault(x => x.Id == objectId);
                var delete = _collection.Remove(find);
                return delete;
            });
        }

        public void DeleteMany(Expression<Func<TDocument, bool>> filterExpression)
        {
            Func<TDocument, bool> func = filterExpression.Compile();
            Predicate<TDocument> predicate = func.Invoke;

            _collection.RemoveAll(predicate);
        }

        public Task DeleteManyAsync(Expression<Func<TDocument, bool>> filterExpression)
        {
            Func<TDocument, bool> func = filterExpression.Compile();
            Predicate<TDocument> predicate = func.Invoke;

            return Task.Run(() => _collection.RemoveAll(predicate));
        }
    }
}
