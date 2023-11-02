using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using repharm_patients.Data;
using repharm_patients.Models;

namespace repharm_patients.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : Controller
    {
        private readonly PatientsDBContext patientsDBContext;

        public PatientsController(PatientsDBContext patientsDBContext)
        {
            this.patientsDBContext = patientsDBContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await patientsDBContext.Patients.ToListAsync();
            return Ok(patients);
        }

        [HttpGet("{doctorsName}/{doctorsSurname}")]
        public async Task<IActionResult> GetPatientsByDoctor(
            string doctorsName,
            string doctorsSurname
        )
        {
            var patients = await patientsDBContext.Patients
                .Where(p => p.DoctorsName == doctorsName && p.DoctorsSurname == doctorsSurname)
                .ToListAsync();
            return Ok(patients);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientById(Guid id)
        {
            var patient = await patientsDBContext.Patients.FirstOrDefaultAsync(p => p.Id == id);
            return Ok(patient);
        }

        [HttpPost]
        public async Task<IActionResult> AddPatient([FromBody] Patient patient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return 400 with validation errors
            }

            if (patient == null)
            {
                return BadRequest("Invalid input. The patient data is required.");
            }
            patient.Id = Guid.NewGuid();
            await patientsDBContext.Patients.AddAsync(patient);
            await patientsDBContext.SaveChangesAsync();
            return Ok(patient);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(Guid id)
        {
            var patient = await patientsDBContext.Patients.FirstOrDefaultAsync(p => p.Id == id);
            if (patient == null)
            {
                return NotFound(); // Return 404 if the resource is not found
            }

            patientsDBContext.Patients.Remove(patient);
            await patientsDBContext.SaveChangesAsync();
            return NoContent(); // Return 204 for successful deletion
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(Guid id, [FromBody] Patient patient)
        {
            var patientToUpdate = await patientsDBContext.Patients.FirstOrDefaultAsync(
                p => p.Id == id
            );
            if (patientToUpdate == null)
            {
                return NotFound();
            }
            patientToUpdate.FirstName = patient.FirstName;
            patientToUpdate.LastName = patient.LastName;
            patientToUpdate.PersonalId = patient.PersonalId;
            patientToUpdate.DateOfBirth = patient.DateOfBirth;
            patientToUpdate.PhoneNumber = patient.PhoneNumber;
            patientToUpdate.Email = patient.Email;
            patientToUpdate.Allergies = patient.Allergies;
            patientToUpdate.Immunizations = patient.Immunizations;
            patientToUpdate.MedicalConditions = patient.MedicalConditions;
            patientToUpdate.Medications = patient.Medications;
            patientToUpdate.SurgicalHistory = patient.SurgicalHistory;
            patientToUpdate.DoctorsName = patient.DoctorsName;
            patientToUpdate.DoctorsSurname = patient.DoctorsSurname;
            patientToUpdate.Insurance = patient.Insurance;
            await patientsDBContext.SaveChangesAsync();
            return Ok(patientToUpdate);
        }
    }
}
