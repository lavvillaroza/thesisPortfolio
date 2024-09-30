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
        public async Task<bool> AddStudentSeminarAsync(StudentSeminar studentSeminar)
        {
            return await _studentSeminarRepository.AddStudentSeminartAsync(studentSeminar);
        }
        public async Task<bool> UpdateStudentSeminarAsync(StudentSeminar studentSeminar) {
            return await _studentSeminarRepository.UpdateStudentSeminarAsync(studentSeminar);
        }
        public async Task<PagedResult<StudentSeminar>> GetStudentSeminarByUserIdAsync(PaginationParams paginationParams, int userId) {
            return await _studentSeminarRepository.GetStudentSeminarByStudentIdAsync(paginationParams, userId);
        }

        //Skill
        public async Task<List<StudentSkill>> GetStudentSkillsByUserIdAsync(int userId) {
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

        //Subject Taken
        public async Task<List<StudentSubjectTaken>> GetAllStudentSubjetTakenByUser(int userId, int year)
        {
            return await _studentSubjectTakenRepository.GetAllStudentSubjetTakenByUser(userId, year);
        }
        public async Task<bool> AddStudentSubjetTakenAsync(StudentSubjectTaken studentSubjectTaken) {
            return await _studentSubjectTakenRepository.AddStudentSubjetTakenAsync(studentSubjectTaken);
        }
        public async Task<bool> DeleteStudentSubjetTakenAsync(StudentSubjectTaken studentSubjectTaken) {
            return await _studentSubjectTakenRepository.DeleteStudentSubjetTakenAsync(studentSubjectTaken);
        }

        //Student Information
        public async Task<bool> AddStudentInformationAsync(StudentInformation studentInfo) { 
            return await _studentInformationRepository.AddStudentInformationAsync(studentInfo);
        }
        public async Task<bool> AddStudentInformationDetailAsync(StudentInformationDetail studentInfoDtl) { 
            return await _studentInformationRepository.AddStudentInformationDetailAsync (studentInfoDtl);
        }
        public async Task<bool> UpdateStudentInformationAsync(StudentInformation studentInfo) { 
            return await _studentInformationRepository.UpdateStudentInformationAsync(studentInfo);
        }
        public async Task<bool> UpdateStudentInformationDetailAsync(StudentInformationDetail studentInfoDtl) { 
            return await _studentInformationRepository.UpdateStudentInformationDetailAsync(studentInfoDtl);
        }
        public async Task<StudentInformation> GetStudentInformationByUserIdAsync(int userId) { 
            return await _studentInformationRepository.GetStudentInformationByUserIdAsync (userId);
        }
    }
}
