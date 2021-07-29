namespace Application.Exertions
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    
    using Core;    
    using Persistence;
    using MediatR;

    public class Delete
    {
        public class  Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var exertion = await this._context.Exertions.FindAsync(request.Id);

                //if (exertion == null) return null;
                
                this._context.Remove(exertion);

                var result = await this._context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the exertion");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}