import { UAParser } from 'ua-parser-js';

/**
 * check mobile device in server
 */
export const isMobileDevice = () => {
    const mobileWidthThreshold = 768; // 设定移动端的宽度阈值
    return window.innerWidth < mobileWidthThreshold;
};

/**
 * check mobile device in server
 */
export const gerServerDeviceInfo = () => {
    if (typeof process === 'undefined') {
        throw new Error('[Server method] you are importing a server-only module outside of server');
    }

    // console.debug(ua);
    const parser = new UAParser('');

    return {
        browser: parser.getBrowser().name,
        isMobile: isMobileDevice(),
        os: parser.getOS().name,
    };
};
