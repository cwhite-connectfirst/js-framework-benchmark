import * as path from 'path';

export class PathHelper {
    private static parentPackagePath: string;
    private static packagePath: string;
    private static electronPath: string;
    private static parentPackageName: string = "js-framework-benchmark";
    private static packageName: string = "spectron-ts";

    static GetParentPackagePath(): string {
        if (!PathHelper.parentPackagePath) {
            let newPath = __dirname;

            PathHelper.parentPackagePath = newPath.split(PathHelper.parentPackageName)[0] + PathHelper.parentPackageName;
        }

        return PathHelper.parentPackagePath;
    }

    static GetPackagePath(): string {
        if (!PathHelper.packagePath) {
            let newPath = __dirname;

            PathHelper.packagePath = newPath.split(PathHelper.packageName)[0] + PathHelper.packageName;
        }

        return PathHelper.packagePath;
    }

    static GetElectronPath(): string {
        if (!PathHelper.electronPath) {
            PathHelper.electronPath = path.join(PathHelper.GetPackagePath(), 'node_modules', '.bin', 'electron')
        }

        return PathHelper.electronPath;
    }
}