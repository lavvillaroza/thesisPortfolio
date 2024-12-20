﻿using Microsoft.EntityFrameworkCore;
using Serilog;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Models.Entities;

namespace ThesisStudentPortfolio2024.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDbContext _context;

        public CourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        async Task<bool> ICourseRepository.AddCourseAsync(Course course)
        {
            bool ret = false;
            try
            {
                await _context.Courses.AddAsync(course);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<bool> ICourseRepository.DeleteCourseAsync(int courseId)
        {
            bool ret = false;
            var existingCourse = await _context.Courses.FindAsync(courseId);
            if (existingCourse == null)
            {
                // User not found
                return false;
            }
            try
            {                
                _context.Courses.Remove(existingCourse);
                await _context.SaveChangesAsync();
                ret = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
            return ret;
        }

        async Task<List<Course>> ICourseRepository.GetCoursesAsync()
        {
            return await _context.Courses.ToListAsync();
        }

        async Task<Course> ICourseRepository.GetCourseByIdAsync(int courseId)
        {
            return await _context.Courses.Where(x => x.Id == courseId).FirstAsync();
        }

        async Task<bool> ICourseRepository.UpdateCourseAsync(Course course)
        {
            var existingCourse = await _context.Courses.FindAsync(course.Id);

            if (existingCourse == null)
            {
                // User not found
                return false;
            }

            // Update fields (you can add any other fields you want to update)
            existingCourse.CourseName = course.CourseName;
            existingCourse.CourseCode = course.CourseCode;
            existingCourse.TotalUnitsRequired = course.TotalUnitsRequired;
            existingCourse.LastModifiedDate = course.LastModifiedDate;
            existingCourse.LastModifiedBy = course.LastModifiedBy;
            // Save changes to the database
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
