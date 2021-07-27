using Microsoft.EntityFrameworkCore;

namespace Application.Exertions
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Persistence;
    
    using Domain;
    using MediatR;
    public class List
    {
        public class Query : IRequest<List<Exertion>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<Exertion>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                this._context = context;
            }
            
            public async Task<List<Exertion>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this._context.Exertions.ToListAsync();
            }
        }
    }
}