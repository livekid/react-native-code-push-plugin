"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceIfNotFound = replaceIfNotFound;
function replaceIfNotFound(originalString, stringToBeReplaced, newStringToReplace) {
    // Make sure the original does not contain the new string
    if (!originalString.includes(newStringToReplace)) {
        return originalString.replace(stringToBeReplaced, newStringToReplace);
    }
    return originalString;
}
//# sourceMappingURL=replaceIfNotFound.js.map