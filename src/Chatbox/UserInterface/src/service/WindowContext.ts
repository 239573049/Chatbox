declare const DotNet: any;

class WindowContext {
    public static async setTitle(title: string) {
        window.document.title = title;
        await DotNet.invokeMethodAsync('Chatbox', 'SetTitle', title);
    }
}

export default WindowContext;
