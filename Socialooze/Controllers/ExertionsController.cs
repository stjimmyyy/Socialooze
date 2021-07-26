namespace Socialooze.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    
    using Domain;
    using Persistence;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    public class ExertionsController : BaseApiController
    {
        private readonly DataContext _context;

        public ExertionsController(DataContext context)
        {
            this._context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Exertion>>> GetActivities()
        {
            return await this._context.Exertions.ToListAsync();
        }

        [HttpGet("{id}")] //activities/id
        public async Task<ActionResult<Exertion>> GetActivity(Guid id)
        {
            return await this._context.Exertions.FindAsync(id);
        }
    }
}