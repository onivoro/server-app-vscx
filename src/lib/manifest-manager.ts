import { execSync } from 'child_process';
import { writeFileRx } from '@onivoro/server-disk';
import { execPromise } from '@onivoro/server-process';
import { parse } from 'path';
import { PathManager } from './path-manager';

export class ManifestManager {
    readonly manifestName = '.manifest';

    async addRepoToManifest(url: string) {
        const list = await this.getRepoList();
        list.push(url);

        return this.saveManifest(list.join('\n'));
    }

    async saveManifest(manifestContent: string) {
        const fullPath = await this.getManifestPath();

        return writeFileRx(fullPath, manifestContent).toPromise();
    }

    async getRepoList(): Promise<string[]> {
        const manifest = await this.upsertManifest();
        try {
            return manifest.split('\n')
                .filter((l: string) => l);
        } catch (e) {
            return [];
        }
    }

    private async getManifestPath() {
        const manifestPath = await PathManager.getHomeDirectory();
        const fullPath = `${manifestPath}${this.manifestName}`;

        return fullPath;
    }

    private async upsertManifest() {
        const fullPath = await this.getManifestPath();
        const catCmd = `cat ${fullPath}`;
        execSync(`mkdir -p ${parse(fullPath).dir}`, { encoding: 'utf8' });

        return execPromise(catCmd)
            .catch(() => execPromise(`touch ${fullPath}`))
            .then(() => execPromise(catCmd));
    }
}