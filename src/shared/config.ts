const DEFAULT_CONFIG = {
    PORT:     3000,
    API_ROOT: 'http://localhost:3000'
};

export const PORT     = process.env.PORT || DEFAULT_CONFIG.PORT;
export const API_ROOT = process.env.API_ROOT || DEFAULT_CONFIG.API_ROOT;

export default {
    PORT,
    API_ROOT
};
