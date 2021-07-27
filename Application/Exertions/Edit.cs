
namespace Application.Exertions
{
    using AutoMapper;

    using System.Threading;
    using System.Threading.Tasks;
    
    using MediatR;
    using Persistence; 
    using Domain;

    public class Edit
    {
        public class Command : IRequest
        {
            public Exertion Exertion { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                this._mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var exertion = await this._context.Exertions.FindAsync(request.Exertion.Id);

                this._mapper.Map(request.Exertion, exertion);

                await this._context.SaveChangesAsync(cancellationToken);
                
                return Unit.Value;
            }
        }
    }
}