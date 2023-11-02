using Microsoft.EntityFrameworkCore;
using repharm_patients.Models;

namespace repharm_patients.Data
{
    public class PatientsDBContext : DbContext
    {
        public PatientsDBContext(DbContextOptions<PatientsDBContext> options)
            : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
    }
}