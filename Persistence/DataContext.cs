namespace Persistence
{
    using Domain;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    
    public class DataContext : IdentityDbContext<AppUser>
    {

        public DataContext(DbContextOptions<DataContext> options) 
            : base(options)
        {
            
        }
        public DbSet<Exertion> Exertions { get; set; }

    }
}