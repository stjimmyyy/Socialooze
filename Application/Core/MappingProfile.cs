namespace Application.Core
{
    using Domain;

    using AutoMapper;
    
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Exertion, Exertion>();
        }
        
        
    }
}