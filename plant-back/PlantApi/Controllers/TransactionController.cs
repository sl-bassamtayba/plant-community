using Microsoft.AspNetCore.Mvc;
using PlantLibrary.Models;
using PlantServices.Services.Contracts;
using SharedLibrary.Models;
using System.Collections.Generic;

namespace TransactionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private ITransactionService _transactionService;
        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost]
        public GenericResponse<Transaction> CreateTransaction([FromBody] Transaction transaction)
        {
            return _transactionService.Create(transaction);
        }

        [HttpGet]
        [Route("{id}")]
        public GenericResponse<Transaction> GetOneTransaction(string id)
        {
            return _transactionService.GetOne(id);
        }

        [HttpGet]
        public GenericResponse<List<Transaction>> GetAllTransactions()
        {
            return _transactionService.GetAll();
        }

        [HttpPut]
        public GenericResponse<bool> UpdateTransaction([FromBody] Transaction transaction)
        {
            return _transactionService.Update(transaction);
        }

        [HttpDelete]
        [Route("{id}")]
        public GenericResponse<bool> DeleteTransaction(string id)
        {
            return _transactionService.Delete(id);
        }

        [HttpPost]
        [Route("{transactionId}/proposal")]
        public GenericResponse<bool> AddTransactionProposal(string transactionId, [FromBody] string text)
        {
            var loggedUser = IAuthenticateService.LoggedUser; // TODO : replace by real authenticate user

            return _transactionService.AddProposalToTransaction(transactionId, text, loggedUser);
        }

        [HttpPost]
        [Route("{transactionId}/proposal/{proposalId}/accept")]
        public GenericResponse<bool> AcceptTransactionProposal(string transactionId, string proposalId)
        {
            return _transactionService.AcceptProposal(transactionId, proposalId);
        }

        [HttpPost]
        [Route("{transactionId}/proposal/{proposalId}/refuse")]
        public GenericResponse<bool> RefuseTransactionProposal(string transactionId, string proposalId)
        {
            return _transactionService.RefuseProposal(transactionId, proposalId);
        }

        [HttpPost]
        [Route("{transactionId}/proposal/{proposalId}/cancel")]
        public GenericResponse<bool> CancelTransactionProposal(string transactionId, string proposalId)
        {
            return _transactionService.CancelProposal(transactionId, proposalId);
        }

        [HttpPost]
        [Route("{transactionId}/proposal/{proposalId}/edit")]
        public GenericResponse<bool> CancelTransactionProposal(string transactionId, string proposalId,  [FromBody] TransactionProposal proposal)
        {
            if(proposal.Id.ToString() != proposalId)
            {
                return new GenericResponse<bool>(ResponseStatus.Error, "Url and Id not matching", false);
            }

            return _transactionService.EditProposal(transactionId, proposal);
        }

    }
}
