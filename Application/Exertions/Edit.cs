using Application.Core;

namespace Application.Exertions
{
    using System.Threading;
    using System.Threading.Tasks;
    
    using MediatR;
    using AutoMapper;
    using FluentValidation;
    
    using Persistence; 
    using Domain;

    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Exertion Exertion { get; set; }
        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Exertion)
                    .SetValidator(new ExertionValidator());
            }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._context = context;
                this._mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var exertion = await this._context.Exertions.FindAsync(request.Exertion.Id);

                if (exertion == null) return null;
                
                this._mapper.Map(request.Exertion, exertion);

                var result = await this._context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to update exertion");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}