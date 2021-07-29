namespace Socialooze.Controllers
{
    using System;
    using System.Threading.Tasks;
    
    using Application.Exertions;
    using Domain;
    
    using Microsoft.AspNetCore.Mvc;
    
    public class ExertionsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetExertions()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //activities/id
        public async Task<IActionResult> GetExertion(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query {Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateExertion(Exertion exertion)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Exertion = exertion}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditExertion(Guid id, Exertion exertion)
        {
            exertion.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {Exertion = exertion}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExertion(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}