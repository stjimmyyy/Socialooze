
using System.Threading;
using System.Threading.Tasks;
using Persistence;

namespace Application.Exertions
{
    using System;

    using Domain;
    using MediatR;

    public class Details
    {
        public class Query : IRequest<Exertion>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Exertion>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }
            
            public async Task<Exertion> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this._context.Exertions.FindAsync(request.Id);
            }
        }
    }
}