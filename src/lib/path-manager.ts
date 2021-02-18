export class PathManager {
    static getHomeDirectory(scmProviderPath?: string): string {
        return `${process.env.HOME}/.gitgrok/${scmProviderPath || ''}/`.replace('//', '/');
    }
}