using ThesisStudentPortfolio2024.Models;
using ThesisStudentPortfolio2024.Models.Entities;
using ThesisStudentPortfolio2024.Repositories;

namespace ThesisStudentPortfolio2024.Services
{
    public class StudentService
    {
        private readonly IStudentDetailRepository _studentDetailRepository;
        private readonly IStudentSeminarRepository<StudentSeminar> _studentSeminarRepository;
        private readonly IStudentSkillRepository _studentSkillRepository;
        private readonly IStudentSubjectTakenRepository _studentSubjectTakenRepository;
        private readonly IStudentInformationRepository _studentInformationRepository;
        public StudentService(IStudentDetailRepository studentDetailRepository, IStudentSeminarRepository<StudentSeminar> studentSeminarRepository, IStudentSkillRepository studentSkillRepository, IStudentSubjectTakenRepository studentSubjectTakenRepository, IStudentInformationRepository studentInformationRepository)
        {            
            _studentDetailRepository = studentDetailRepository;
            _studentSeminarRepository = studentSeminarRepository;
            _studentSkillRepository = studentSkillRepository;
            _studentSubjectTakenRepository = studentSubjectTakenRepository;
            _studentInformationRepository = studentInformationRepository;
        }
        //Detail
        public async Task<StudentDetail?> GetStudentDetailByUserIdAsync(int userId) { 
            return await _studentDetailRepository.GetStudentDetailByUserIdAsync(userId);
        }
        public async Task<bool> AddStudentDetailAsync(StudentDetail studentDetail) { 
            return await _studentDetailRepository.AddStudentDetailAsync(studentDetail);
        }
        public async Task<bool> UpdateStudentDetailAsync(StudentDetail studentDetail) {
            return await _studentDetailRepository.UpdateStudentDetailAsync(studentDetail);
        }
        //Seminar
        public async Task<bool> AddStudentSeminartAsync(StudentSeminar studentSeminar)
        {
            return await _studentSeminarRepository.AddStudentSeminartAsync(studentSeminar);
        }
        public async Task<bool> UpdateStudentSeminarAsync(StudentSeminar studentSeminar) {
            return await _studentSeminarRepository.UpdateStudentSeminarAsync(studentSeminar);
        }
        public async Task<PagedResult<StudentSeminar>> GetStudentSeminarByStudentIdAsync(PaginationParams paginationParams, int userId) {
            return await _studentSeminarRepository.GetStudentSeminarByStudentIdAsync(paginationParams, userId);
        }

        //Skill
        public async Task<List<StudentSkill>> GetStudentSkillsByStudentIdAsync(int userId) {
            return await _studentSkillRepository.GetStudentSkillsByStudentIdAsync(userId);
        }
        public async Task<List<Skill>> GetAllSkillsAsync() { 
            return await _studentSkillRepository.GetAllSkillsAsync();
        }
        public async Task<bool> AddStudentSkillAsync(StudentSkill studentSkill) { 
            return await _studentSkillRepository.AddStudentSkillAsync(studentSkill);
        }
        public async Task<bool> DeleteStudentSkillAsync(StudentSkill studentSkill) {
            return await _studentSkillRepository.DeleteStudentSkillAsync(studentSkill);
        }
    }
}
