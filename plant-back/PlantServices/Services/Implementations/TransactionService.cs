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
    public class TransactionService : ITransactionService
    {
        private readonly IMongoRepository<Transaction> _transactionRepository;
        public TransactionService(IMongoRepository<Transaction> transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        public GenericResponse<bool> AcceptProposal(string transactionId, string proposalId)
        {
            var transaction = _transactionRepository.FindById(transactionId);
            var proposal = transaction.Proposals.FirstOrDefault(p => p.Id.ToString() == proposalId);

            proposal.validation = true;
            transaction.Buyer = proposal.User;
            transaction.End = DateTime.Now;
            transaction.IsClosed = true;

            var result = _transactionRepository.ReplaceOne(transaction);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<bool> AddProposalToTransaction(string transactionId, string text, User user)
        {
            var transaction = _transactionRepository.FindById(transactionId);
            var proposal = new TransactionProposal()
            {
                Text = text,
                User = user
            };

            if(transaction.Proposals == null)
            {
                transaction.Proposals = new List<TransactionProposal>();
            }

            transaction.Proposals.Add(proposal);

            var result = _transactionRepository.ReplaceOne(transaction);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<bool> CancelProposal(string transactionId, string proposalId)
        {
            var transaction = _transactionRepository.FindById(transactionId);
            transaction.Proposals.RemoveAll(p => p.Id.ToString() == proposalId);

            var result = _transactionRepository.ReplaceOne(transaction);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<Transaction> Create(Transaction data)
        {
            var result = _transactionRepository.InsertOne(data);
            return new GenericResponse<Transaction>(result);
        }

        public GenericResponse<bool> Delete(string id)
        {
            var result = _transactionRepository.DeleteById(id);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<bool> EditProposal(string transactionId, TransactionProposal proposal)
        {
            var transaction = _transactionRepository.FindById(transactionId);

            transaction.Proposals.RemoveAll(p => p.Id == proposal.Id);
            transaction.Proposals.Add(proposal);

            var result = _transactionRepository.ReplaceOne(transaction);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<List<Transaction>> GetAll()
        {
            var result = _transactionRepository.AsQueryable().ToList();
            return new GenericResponse<List<Transaction>>(result);
        }

        public GenericResponse<Transaction> GetOne(string id)
        {
            var result = _transactionRepository.FindById(id);
            return new GenericResponse<Transaction>(result);
        }

        public GenericResponse<bool> RefuseProposal(string transactionId, string proposalId)
        {
            var transaction = _transactionRepository.FindById(transactionId);
            var proposal = transaction.Proposals.FirstOrDefault(p => p.Id.ToString() == proposalId);

            proposal.validation = false;

            var result = _transactionRepository.ReplaceOne(transaction);
            return new GenericResponse<bool>(result);
        }

        public GenericResponse<bool> Update(Transaction data)
        {
            var result = _transactionRepository.ReplaceOne(data);
            return new GenericResponse<bool>(result);
        }
    }
}
