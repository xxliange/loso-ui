const fs = require("fs");
const path = require("path");
const cwd = process.cwd();

function getProjectPath(...filepath) {
    return path.join(cwd, ...filepath);
}


function resolve(moduleName) {
    return require.resolve(moduleName);
};
function isThereHaveBrowserslistConfig() {
    try {
        const packagejson = require(getProjectPath('package.json'));
        if (packagejson.browserslist) {
            return true;
        }
    } catch (error) {
        //
    }
    if (fs.existsSync(getProjectPath('.browserslistrc'))) {
        return true;
    }
    if (fs.existsSync(getProjectPath('browserslist'))) {
        return true;
    }
    return false;
}

module.exports = {
    resolve,
    isThereHaveBrowserslistConfig,
    getProjectPath
};

