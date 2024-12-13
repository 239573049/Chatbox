namespace ChatFileServer;

public class ResultDto
{
    public object Data { get; set; }
    
    public string Message { get; set; }
    
    public bool Success { get; set; }
    
    public ResultDto(object data, string message, bool success)
    {
        Data = data;
        Message = message;
        Success = success;
    }
    
    public static ResultDto CreateSuccess(object data, string message = "")
    {
        return new ResultDto(data, message, true);
    }
    
    public static ResultDto Fail(string message)
    {
        return new ResultDto(null, message, false);
    }
}