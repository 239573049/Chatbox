using System.Reflection;

namespace ChatFileServer;

public class FileMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        
        if(context.Request.Path.StartsWithSegments("/api"))
        {
            await next(context);
            return;
        }
        
        var file = context.Request.Path.Value.TrimStart('/')?.Replace("/", ".");

        var assembly = Assembly.GetExecutingAssembly();

        var stream = assembly.GetManifestResourceStream("ChatFileServer.file." + file);

        if (stream == null)
        {
            // 如果文件不存在，返回index.html
            stream = assembly.GetManifestResourceStream("ChatFileServer.file.index.html");

            if (stream == null)
            {
                context.Response.StatusCode = 404;
                return;
            }
            else
            {
                context.Response.ContentType = GetContentType("index.html");
            }
        }
        else
        {
            context.Response.ContentType = GetContentType(file);
        }


        await stream.CopyToAsync(context.Response.Body);
    }

    /// <summary>
    /// 根据文件名获取ContentType
    /// </summary>
    /// <returns></returns>
    public static string GetContentType(string fileName)
    {
        var ext = Path.GetExtension(fileName).ToLowerInvariant();
        return ext switch
        {
            ".txt" => "text/plain",
            ".pdf" => "application/pdf",
            ".doc" => "application/vnd.ms-word",
            ".docx" => "application/vnd.ms-word",
            ".xls" => "application/vnd.ms-excel",
            ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ".png" => "image/png",
            ".jpg" => "image/jpeg",
            ".jpeg" => "image/jpeg",
            ".gif" => "image/gif",
            ".csv" => "text/csv",
            ".html" => "text/html",
            ".css" => "text/css",
            ".js" => "application/javascript",
            ".json" => "application/json",
            ".zip" => "application/zip",
            ".rar" => "application/x-rar-compressed",
            ".xml" => "application/xml",
            _ => "application/octet-stream"
        };
    }
}