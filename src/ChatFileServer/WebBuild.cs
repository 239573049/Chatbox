using System.Net;
using System.Net.NetworkInformation;

namespace ChatFileServer;

public static class WebBuild
{
    public static ushort GetAvailablePort()
    {
        for (ushort i = 51990; i < 52000; i++)
        {
            if (!IsPortInUse(i))
            {
                return i;
            }
        }

        return 0;
    }

    public static bool IsPortInUse(int port)
    {
        // 获取本地计算机的网络连接信息
        IPGlobalProperties ipProperties = IPGlobalProperties.GetIPGlobalProperties();
        IPEndPoint[] tcpEndPoints = ipProperties.GetActiveTcpListeners();

        // 检查指定端口是否在活动的监听端口列表中
        return tcpEndPoints.Any(endpoint => endpoint.Port == port);
    }
}