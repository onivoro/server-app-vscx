import { PathManager } from "../path-manager";

export const openFolderHandler = (path: string, vscode: any) => {
    const root = PathManager.getHomeDirectory();

    const p = `${root}${path}`;
    const uri = vscode.Uri.file(p);

    vscode.commands.executeCommand('vscode.openFolder', uri);
};
