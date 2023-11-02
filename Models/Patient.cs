using System.ComponentModel.DataAnnotations;

namespace repharm_patients.Models
{
    public record Patient
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string PersonalId { get; set; } = string.Empty;
        [Required]
        public string DateOfBirth { get; set; } = string.Empty;
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        public string Allergies { get; set; } = string.Empty;
        public string Immunizations { get; set; } = string.Empty;
        public string MedicalConditions { get; set; } = string.Empty;
        public string Medications { get; set; } = string.Empty;
        public string SurgicalHistory { get; set; } = string.Empty;
        [Required]
        public string DoctorsName { get; set; } = string.Empty;
        [Required]
        public string DoctorsSurname { get; set; } = string.Empty;
        [Required]
        public bool Insurance { get; set; }
    }
}
