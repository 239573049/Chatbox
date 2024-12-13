declare const DotNet: any;

class WindowContext {
    public static async setTitle(title: string) {
        window.document.title = title;
        fetch('/api/window/title?title=' + title, {
            method: 'POST',
        });
    }
}

export default WindowContext;
