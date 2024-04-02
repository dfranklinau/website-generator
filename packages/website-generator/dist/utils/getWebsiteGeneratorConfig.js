"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebsiteGeneratorConfig = void 0;
const readFile_1 = require("./readFile");
const getWebsiteGeneratorConfig = async () => {
    const config = await (0, readFile_1.readFile)('./website-generator.config.json');
    if (!config)
        return {};
    try {
        return JSON.parse(config);
    }
    catch {
        return {};
    }
};
exports.getWebsiteGeneratorConfig = getWebsiteGeneratorConfig;
//# sourceMappingURL=getWebsiteGeneratorConfig.js.map