import { IOniExtensionApp } from '@onivoro/server-vscode';
import { cloneHandler, openFolderHandler, RepoManager, searchHandler } from '..';

export class App implements IOniExtensionApp {
    assetPaths: string[] = ['soundcheck', 'dist', 'soundcheck'];
    registeredCommand = 'extension.helloWorld';
    title = 'Git-Grok';
    viewType?= 'git-grok';\];
    deactivate: () => void = () => { };
    messageBus = (message, vscode) => {

        const { command, payload } = message;

        switch (command) {
            case 'search':
                searchHandler(payload, vscode, postMessage);

                return;
            case 'openFile':
            case 'openFolder':
                openFolderHandler(payload, vscode);

                return;
            case 'clone':
                cloneHandler(payload, vscode);

                return;
            case 'info':
                vscode.window.showInformationMessage(payload);

                return;
            case 'warn':
                vscode.window.showWarningMessage(payload);

                return;
            case 'error':
                vscode.window.showErrorMessage(payload);

                return;
            case 'repoList':
                new RepoManager().getRepoList().then((repos: any) => {
                    postMessage(command, repos);
                });

                return;
        }
    };
}