using System.Data;
using Dapper;
using Microsoft.Data.Sqlite;

namespace Chatbox;

public sealed class DbContext : IDisposable
{
    private readonly IDbConnection _connection;

    public DbContext()
    {
        _connection = CreateConnection();
    }

    public IDbConnection CreateConnection()
    {
        return new SqliteConnection("Data Source=Chatbox.db");
    }

    public async Task<IEnumerable<T>> QueryAsync<T>(string sql, object? param = null)
    {
        return await _connection.QueryAsync<T>(sql, param);
    }

    public async Task<T?> QueryFirstOrDefaultAsync<T>(string sql, object? param = null)
    {
        return await _connection.QueryFirstOrDefaultAsync<T>(sql, param);
    }

    public async Task<int> ExecuteAsync(string sql, object? param = null)
    {
        return await _connection.ExecuteAsync(sql, param);
    }

    public async Task<T> QuerySingleAsync<T>(string sql, object? param = null)
    {
        return await _connection.QuerySingleAsync<T>(sql, param);
    }

    public async Task<dynamic> QueryDynamicAsync(string sql, object? param = null)
    {
        return await _connection.QueryAsync(sql, param);
    }

    public void Dispose()
    {
        _connection.Dispose();
    }
}