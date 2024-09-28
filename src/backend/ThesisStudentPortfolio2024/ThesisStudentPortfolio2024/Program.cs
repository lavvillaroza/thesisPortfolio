using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Services;
using Serilog;
using ThesisStudentPortfolio2024.Repositories;
using ThesisStudentPortfolio2024.Models.Entities;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()  // Log to console
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)  // Log to file
    .CreateLogger();

builder.Host.UseSerilog();  // Replace ILogger with Serilog

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var connectionString = builder.Configuration.GetConnectionString("DbConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Scoped lifetime is often used for repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAnnouncementRepository<Announcement>, AnnouncementRepository>();
builder.Services.AddScoped<ISubjectRepository, SubjectRepository>();
builder.Services.AddScoped<IStudentInformationRepository, StudentInformationRepository>();
builder.Services.AddScoped<IStudentDetailRepository, StudentDetailRepository>();
builder.Services.AddScoped<IStudentSeminarRepository<StudentSeminar>, StudentSeminarRepository>();
builder.Services.AddScoped<IStudentSkillRepository, StudentSkillRepository>();
builder.Services.AddScoped<IStudentSubjectTakenRepository, StudentSubjectTakenRepository>();

// Scoped lifetime is often used for services
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<AnnouncementService>();
builder.Services.AddScoped<SubjectService>();
builder.Services.AddScoped<StudentService>();


// Singeleton 
string encryptionKey = builder.Configuration["EncryptionSettings:Key"];
builder.Services.AddSingleton(new EncryptionService(encryptionKey));
// Add JWT Service
builder.Services.AddSingleton<JWTService>();
// Configure JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
