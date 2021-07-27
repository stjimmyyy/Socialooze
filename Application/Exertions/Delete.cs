namespace Application.Exertions
{
    
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    
    using Persistence;
    using MediatR;

    public class Delete
    {
        public class  Command : IRequest
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var exertion = await this._context.Exertions.FindAsync(request.Id);

                this._context.Remove(exertion);

                await this._context.SaveChangesAsync(cancellationToken);
                
                return Unit.Value;
            }
        }
    }
}