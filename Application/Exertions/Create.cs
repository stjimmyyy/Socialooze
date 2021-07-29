using Application.Core;

namespace Application.Exertions
{
    using System.Threading;
    using System.Threading.Tasks;
    
    using Persistence;
    using Domain;
    
    using FluentValidation;
    using MediatR;
    
    public class Create
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

            public Handler(DataContext context)
            {
                this._context = context;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                this._context.Exertions.Add(request.Exertion);

                var result =await this._context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to create exertion");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}