using Microsoft.EntityFrameworkCore;
using Serilog;
using ThesisStudentPortfolio2024.Models.Dtos;
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

        public async Task<IEnumerable<Subject>> GetSubjectsAllAsync() {
            IEnumerable<Subject> fetchSubjectsAll = await _subjectRepository.GetSubjectsAsync();
            return fetchSubjectsAll;
        }
        public async Task<PagedResultDto> GetSubjectsAsync(PaginationParamsDto paginationParamsDto) {

            List<Subject> fetchSubjects = await _subjectRepository.GetSubjectsAsync();
            PagedResultDto pagedResultDto = new PagedResultDto();
            pagedResultDto.TotalCount = fetchSubjects.Count();
            pagedResultDto.PageNumber = paginationParamsDto.PageNumber;
            pagedResultDto.PageSize = paginationParamsDto.PageSize;

            var subjects = fetchSubjects
                        .Skip(paginationParamsDto.Skip)
                        .Take(paginationParamsDto.PageSize)
                        .ToList();
            List<SubjectDto> subjectsDto = new List<SubjectDto>();
            foreach (Subject subject in subjects)
            {
                SubjectDto subjectDto = new SubjectDto
                {
                    Id = subject.Id,
                    SubjectName = subject.SubjectName,
                    SubjectDescription = subject.SubjectDescription,
                    Prereq = subject.Prereq,
                    Lec = subject.Lec,
                    Lab = subject.Lab,
                    Units = subject.Units,
                    Hrs = subject.Hrs,                    
                    CreatedBy = subject.CreatedBy,
                    CreatedDate = subject.CreatedDate,
                    LastModifiedBy = subject.LastModifiedBy,
                    LastModifiedDate = subject.LastModifiedDate,
                };
                subjectsDto.Add(subjectDto);
            }
            pagedResultDto.Items = subjectsDto.Cast<object>().ToList();
            return pagedResultDto;
        }

        public async Task<PagedResultDto> GetSubjectsAsync(PaginationParamsDto paginationParamsDto, string searchValue)
        {
            List<Subject> fetchSubjects = await _subjectRepository.GetSearchSubjectsAsync(searchValue);
            PagedResultDto pagedResultDto = new PagedResultDto();
            pagedResultDto.TotalCount = fetchSubjects.Count();
            pagedResultDto.PageNumber = paginationParamsDto.PageNumber;
            pagedResultDto.PageSize = paginationParamsDto.PageSize;

            var subjects = fetchSubjects
                        .Skip(paginationParamsDto.Skip)
                        .Take(paginationParamsDto.PageSize)
                        .ToList();
            List<SubjectDto> subjectsDto = new List<SubjectDto>();
            foreach (Subject subject in subjects)
            {
                SubjectDto subjectDto = new SubjectDto
                {
                    Id = subject.Id,
                    SubjectName = subject.SubjectName,
                    SubjectDescription = subject.SubjectDescription,
                    Prereq = subject.Prereq,
                    Lec = subject.Lec,
                    Lab = subject.Lab,
                    Units = subject.Units,
                    Hrs = subject.Hrs,                    
                    CreatedBy = subject.CreatedBy,
                    CreatedDate = subject.CreatedDate,
                    LastModifiedBy = subject.LastModifiedBy,
                    LastModifiedDate = subject.LastModifiedDate,
                };
                subjectsDto.Add(subjectDto);
            }
            pagedResultDto.Items = subjectsDto.Cast<object>().ToList();
            return pagedResultDto;
        }


        public async Task<bool> AddSubjetAsync(SubjectDto subjectDto) {
            Subject subject = new Subject { 
                SubjectName = subjectDto.SubjectName,
                SubjectDescription = subjectDto.SubjectDescription,
                Prereq = subjectDto.Prereq,
                Lec = subjectDto.Lec,
                Lab = subjectDto.Lab,
                Units = subjectDto.Units,
                Hrs = subjectDto.Hrs,                
                CreatedBy = subjectDto.CreatedBy,                
                LastModifiedBy = subjectDto.LastModifiedBy,                
            };

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
