declare const DotNet: any;

class WindowContext {
    public static async setTitle(title: string) {
        window.document.title = title;
        await DotNet.invokeMethodAsync('Chatbox', 'SetTitle', title);
    }
    
    public static async resizeWindow(width: number, height: number, fromLeft: boolean = false, fromBottom: boolean = false) {
        await DotNet.invokeMethodAsync('Chatbox', 'ResizeWindow', width, height, fromLeft, fromBottom);
    }


}

export default WindowContext;
