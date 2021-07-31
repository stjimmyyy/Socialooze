namespace Application.Exertions
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    
    using Core;
    using Persistence;
    using Domain;
    using MediatR;

    public class Details
    {
        public class Query : IRequest<Result<Exertion>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Exertion>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }
            
            public async Task<Result<Exertion>> Handle(Query request, CancellationToken cancellationToken)
            {
                var exertion = await this._context.Exertions.FindAsync(request.Id);

                return Result<Exertion>.Success(exertion);
            }
        }
    }
}