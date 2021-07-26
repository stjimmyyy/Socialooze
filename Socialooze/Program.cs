namespace Socialooze
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Hosting;
    
    using System;
    using System.Threading.Tasks;
    
    using Persistence;
    
    
    public class Program
    {
        public static async Task Main(string[] args)
        {
            //TODO MOVE THIS TO INFRASTRUCTURE
            
            var host = CreateHostBuilder(args).Build();
            
            using var scope = host.Services.CreateScope();

            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<DataContext>();
                
                await context.Database.MigrateAsync();
                await Seeder.SeedData(context);

            }
            catch (Exception e)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(e, "An error occured during migration");
            }
            
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}