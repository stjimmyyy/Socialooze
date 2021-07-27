namespace Socialooze.Extensions
{
    using Application.Core;
    using Application.Exertions;
    
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Configuration;
    using Microsoft.OpenApi.Models;
    
    using Persistence;
    using MediatR;
    
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "Socialooze", Version = "v1"});
            });

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithOrigins("http://localhost:3000");
                });

            });

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfile).Assembly);

            return services;
        }
    }
}