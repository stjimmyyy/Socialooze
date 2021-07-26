namespace Persistence
{
    using Domain;
    using Microsoft.EntityFrameworkCore;
    
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) 
            : base(options)
        {
        }
        
        public DbSet<Exertion> Exertions { get; set; }

    }
}