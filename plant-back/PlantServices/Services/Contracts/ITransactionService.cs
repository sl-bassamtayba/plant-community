using PlantLibrary.Models;
using SharedLibrary.Contracts;
using SharedLibrary.Models;

namespace PlantServices.Services.Contracts
{
    public interface ITransactionService : ICrudService<Transaction>
    {
        GenericResponse<bool> AddProposalToTransaction(string transactionId, string text, User user);
        GenericResponse<bool> AcceptProposal(string transactionId, string proposalId);
        GenericResponse<bool> RefuseProposal(string transactionId, string proposalId);
        GenericResponse<bool> CancelProposal(string transactionId, string proposalId);
        GenericResponse<bool> EditProposal(string transactionId, TransactionProposal proposal);

    }
}
