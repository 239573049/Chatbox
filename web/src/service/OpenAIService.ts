import { ChatUrl } from "@/const/url";
import { message } from "antd";

const Chat = async ({
    messages = [] as any[],
    // @ts-ignore
    handleMessageUpdate = (msg: string) => { },
    handleMessageEnd = () => { }
}) => {
    try {
        const model = localStorage.getItem("model");
        if (!model) {
            message.error("请先选择模型");
            return;
        }

        const input = {
            model: model,
            messages,
            stream: true,
        }

        const response = await fetch(ChatUrl,
            {
                method: "POST",
                body: JSON.stringify(input),
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        // 解析这个response的sse返回流
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();


        while (true) {
            const { done, value } = (await reader?.read()) || {};
            if (done) break;
            // 解码二进制数据
            const chunk = decoder.decode(value);

            // 按行分割数据
            const lines = chunk.split("\n");

            for (const line of lines) {
                // 跳过空行
                if (!line.trim()) continue;
                const message = line.replace(/^data: /, "");
                if (message === "[DONE]") {
                    return;
                }
                try {
                    // 解析 JSON 数据
                    const parsed = JSON.parse(message);
                    // 获取实际的消息内容
                    const content = parsed?.text;
                    if (content) {
                        handleMessageUpdate(content);
                    }
                } catch (error) {
                    console.error("解析错误:", error);
                }

            }
        }
    } catch (error) {
        console.error("解析错误:", error);
    } finally {
        handleMessageEnd();
    }

}

export default Chat;