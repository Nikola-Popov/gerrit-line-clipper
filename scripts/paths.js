'use strict';

const javaSuffix = ".java";
const mavenFileStructurePattern = "src/(main|test)/java";
const sourcePattern = "src/";
const sapCorePreffixPattern = "com/sap/core";
const forwardSlashPattern = /\//g;

const isMavenStructured = (path) => {
    return path.search(mavenFileStructurePattern) !== -1;
}

const removeJavaSuffix = (path) => {
    return path.substring(0, path.lastIndexOf(javaSuffix));

}

const toFullPath = (path) => {
    let fullPath = path;
    fullPath = fullPath.trim();
    if (isMavenStructured(fullPath)) {
        fullPath = fullPath.slice(fullPath.search(mavenFileStructurePattern));
    } else {
        fullPath = fullPath.slice(fullPath.lastIndexOf(sourcePattern));
    }
    fullPath = fullPath.slice(fullPath.indexOf(sapCorePreffixPattern));
    fullPath = fullPath.replace(forwardSlashPattern, ".");

    fullPath = removeJavaSuffix(fullPath);

    return fullPath;
}

const toClassPath = (path) => {
    let classPath = path;
    classPath = classPath.slice(classPath.lastIndexOf("/") + 1);
    return removeJavaSuffix(classPath);
}