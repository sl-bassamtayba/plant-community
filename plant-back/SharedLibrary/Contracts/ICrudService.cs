namespace SharedLibrary.Contracts
{
    public interface ICrudService<T> : IGetAllService<T>, IGetService<T>, ICreateService<T>, IUpdateService<T>, IDeleteService
    {
    }
}
