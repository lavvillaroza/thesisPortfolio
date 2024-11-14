namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class PaginationParamsDto
    {
        public int PageNumber { get; set; } = 1;  // Default page number is 1
        public int PageSize { get; set; } = 10;   // Default page size is 10 (or any appropriate default)

        public int Skip { 
            get => ((PageNumber - 1) * PageSize);            
        }
        // Optionally enforce a maximum page size
        private const int MaxPageSize = 100;
        public int PageSizeLimit
        {
            get => PageSize;
            set => PageSize = value > MaxPageSize ? MaxPageSize : value;
        }
    }
}
