﻿using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public interface ISubjectRepository
    {
        Task<List<Subject>> GetAllSubjects();
        Task<bool> AddSubjetAsync(Subject subject);
        Task<bool> UpdateSubjetAsync(Subject subject);
        Task<bool> DeleteSubjetAsync(Subject subject);
    }
}