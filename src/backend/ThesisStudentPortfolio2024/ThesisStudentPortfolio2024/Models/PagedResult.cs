﻿namespace ThesisStudentPortfolio2024.Models
{
    public class PagedResult<T>
    {
        public List<T>? Items { get; set; }
        public int TotalCount { get; set; }    // Total number of items
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);

        public bool HasPrevious => PageNumber > 1;
        public bool HasNext => PageNumber < TotalPages;
    }
}
