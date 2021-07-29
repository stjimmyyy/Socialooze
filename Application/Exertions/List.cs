namespace Application.Exertions
{
    using System.Diagnostics;
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    
    using Microsoft.EntityFrameworkCore;
    
    using Core;
    using Persistence;
    using Domain;
    using MediatR;
    public class List
    {
        public class Query : IRequest<Result<List<Exertion>>>
        {
            
        }

        public class Handler : IRequestHandler<Query, Result<List<Exertion>>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                this._context = context;
            }
            
            public async Task<Result<List<Exertion>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Exertion>>.Success(await this._context.Exertions.ToListAsync(cancellationToken));
            }
        }
    }
}