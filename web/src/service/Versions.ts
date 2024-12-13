

const getVersions = async () => {
    const response = await fetch('https://token-ai.cn/versions.json');
    const data = await response.json();
    return data;
}

// 调用本地api判断版本
const getVersionLocal = async () => {
    const response = await fetch('/api/versions');
    return await response.json();
}

export {
    getVersions,
    getVersionLocal
}

