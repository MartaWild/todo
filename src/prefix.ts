export const prefix =
    window.location.hostname === 'localhost' ? 'http://localhost:4000' :
    window.location.hostname === '192.168.1.54' ? 'http://192.168.1.54:4000' :
    window.location.origin;
