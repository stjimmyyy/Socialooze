namespace Application.Exertions
{
    using System.Threading;
    using System.Threading.Tasks;
    
    using Persistence;
    
    using Domain;

    using MediatR;
    
    public class Create
    {
        public class Command : IRequest
        {
            public Exertion Exertion { get; set; }
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
                this._context.Exertions.Add(request.Exertion);

                await this._context.SaveChangesAsync(cancellationToken);
                
                return Unit.Value;
            }
        }
    }
}