namespace Application.Exertions
{
    using Domain;
    using FluentValidation;
    
    public class ExertionValidator : AbstractValidator<Exertion>
    {
        public ExertionValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
        }
    }
}