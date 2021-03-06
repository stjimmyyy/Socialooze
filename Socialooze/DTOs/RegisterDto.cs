namespace Socialooze.DTOs
{
    using System.ComponentModel.DataAnnotations;

    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [RegularExpression("[\\w!@$%^&*()_+]+", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }
        
        [Required]
        public string Username { get; set; }
    }
}