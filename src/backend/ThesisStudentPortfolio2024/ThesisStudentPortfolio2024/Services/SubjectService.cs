using Microsoft.EntityFrameworkCore;
using Serilog;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Repositories;

namespace ThesisStudentPortfolio2024.Services
{
    public class SubjectService
    {
        private readonly ISubjectRepository _subjectRepository;

        public SubjectService(ISubjectRepository subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }

        public async Task<List<Subject>> GetAllSubjects() { 
            return await _subjectRepository.GetAllSubjects();
        }
        public async Task<bool> AddSubjetAsync(Subject subject) {
            return await _subjectRepository.AddSubjetAsync(subject);
        }
        public async Task<bool> UpdateSubjetAsync(Subject subject) {
            return await _subjectRepository.UpdateSubjetAsync(subject);
        }
        public async Task<bool> DeleteSubjetAsync(Subject subject) {
            return await _subjectRepository.DeleteSubjetAsync(subject);
        }
    }
}
