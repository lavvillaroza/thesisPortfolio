namespace ThesisStudentPortfolio2024.Models.Dtos
{
    public class PagedResultDto
    {         
        public List<object>? Items { get; set; }
        public int TotalCount { get; set; }    // Total number of items
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);

        public bool HasPrevious => PageNumber > 1;
        public bool HasNext => PageNumber < TotalPages;
        public PagedResultDto() { }
        public PagedResultDto(List<object>? items, int totalCount, int pageNumber, int pageSize)
        {            
            Items = items;
            TotalCount = totalCount;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
    }
}
