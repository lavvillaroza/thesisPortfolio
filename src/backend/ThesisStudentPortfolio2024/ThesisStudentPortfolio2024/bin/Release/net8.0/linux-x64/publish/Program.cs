using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ThesisStudentPortfolio2024.Data;
using ThesisStudentPortfolio2024.Services;
using Serilog;
using ThesisStudentPortfolio2024.Repositories;


var builder = WebApplication.CreateBuilder(args);
var environment = builder.Environment.EnvironmentName;

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOriginProd", policy =>
    {
        policy.WithOrigins("https://www.plpasig-student-portfolio.com", "https://plpasig-student-portfolio.com")
              .AllowAnyHeader()
              .AllowAnyMethod();
              //.AllowCredentials(); // If you need credentials
    });

    options.AddPolicy("AllowSpecificOriginDev", policy =>
    {
        policy.WithOrigins("http://localhost:8080") // Allow both HTTP and HTTPS
              .AllowAnyHeader()
              .AllowAnyMethod();
              //.AllowCredentials(); // If you need credentials
    });
});

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console() // Log to console
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day) // Log to file
    .CreateLogger();

builder.Host.UseSerilog(); // Replace ILogger with Serilog

// Add services to the container.
builder.Services.AddControllers();

// Configure Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DbConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Add repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAnnouncementRepository, AnnouncementRepository>();
builder.Services.AddScoped<ISubjectRepository, SubjectRepository>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IStudentInformationRepository, StudentInformationRepository>();
builder.Services.AddScoped<IStudentDetailRepository, StudentDetailRepository>();
builder.Services.AddScoped<IStudentSeminarRepository, StudentSeminarRepository>();
builder.Services.AddScoped<IStudentSkillRepository, StudentSkillRepository>();
builder.Services.AddScoped<IStudentSubjectTakenRepository, StudentSubjectTakenRepository>();
builder.Services.AddScoped<IStudentCertifAndRecogRepository, StudentCertifAndRecogRepository>();

// Add services
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<AnnouncementService>();
builder.Services.AddScoped<SubjectService>();
builder.Services.AddScoped<StudentService>();
builder.Services.AddScoped<CourseService>();
builder.Services.AddSingleton<CareerPredictionService>();

// Add encryption service
string? encryptionKey = builder.Configuration["EncryptionSettings:Key"];
builder.Services.AddSingleton(new EncryptionService(encryptionKey));

// Add JWT service
builder.Services.AddSingleton<JWTService>();

// Configure JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
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

// Configure Kestrel to listen on both HTTP
builder.WebHost.ConfigureKestrel(options =>
{
    // Listen on HTTP (Port 5000)
    options.ListenAnyIP(5000);    
});

var app = builder.Build();

// Enable serving static files
app.UseStaticFiles();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Allow localhost in development
    app.UseCors("AllowSpecificOriginDev");    
}
else if (app.Environment.IsProduction())
{
    // Use production CORS policy
    app.UseCors("AllowSpecificOriginProd");
}


app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
