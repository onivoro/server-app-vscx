import { exec } from "child_process";
import { PathManager } from "../path-manager";
import { RepoManager } from "../repo-manager";
import {ResultTransformer} from "../result-transformer";

export const searchHandler = (payload: string, vscode: any, postMessage: any) => {
    let list: string[];
    const rm = new RepoManager();
    rm.getRepoList()
        .then(rl => { list = rl; })
        .then(() => PathManager.getHomeDirectory())
        .then((home) => {
            list.forEach(repo => {
                const cwd = rm.extractProjectDirFromUrl(repo, home);
                vscode.window.showErrorMessage(cwd);

                exec(`git grep --break --heading --line-number -n -F -- "${payload}"`, { cwd }, (err, commandResult) => {
                    if (err) {
                        vscode.window.showErrorMessage(err.message);
                    } else {
                        const searchResult = ResultTransformer.transform(commandResult.toString(), repo);
                        if(searchResult.matches && searchResult.matches.length) {
                            postMessage('searchResult', searchResult);
                        }
                    }
                });
            });
        });
};