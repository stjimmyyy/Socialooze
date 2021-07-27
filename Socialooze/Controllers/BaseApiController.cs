namespace Socialooze.Controllers
{
    using MediatR;
    
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Mvc;
    
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
            .GetService<IMediator>();
    }
}