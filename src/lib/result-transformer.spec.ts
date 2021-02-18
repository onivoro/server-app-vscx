
import FileSearchResult from './models/file-search-result';
import ResultTransformer from './result-transformer';

const url = "https://github.com/angular/components.git";

const repo = url;

const fileNameOne = 'fileNameOne';
const fileNameTwo = 'fileNameTwo';

const pathOne = 'pathOne';
const pathTwo = 'pathTwo';

const lineOne = '111: one';
const lineTwo = '22: two';

describe('ResultTransformer', () => {

    describe('transform', () => {
        it('captures the files containing matches', () => {
            expect(ResultTransformer.transform(getMockMatches(), repo))
                .toEqual(expect.objectContaining({ fileList: [`${pathOne}/${fileNameOne}`, `${pathTwo}/${fileNameTwo}`] }));
        });

        it('captures the repo', () => {
            expect(ResultTransformer.transform(getMockMatches(), repo))
                .toEqual(expect.objectContaining({ repo }));
        });

        it('captures the url', () => {
            expect(ResultTransformer.transform(getMockMatches(), repo))
                .toEqual(expect.objectContaining({ url }));
        });

        it('captures the matching lines for each matching file', () => {
            const dir = 'github.com/angular/components';
            const matchesRefined: FileSearchResult[] = [
                { "matchingLines": ["111: one"], "name": "pathOne/fileNameOne",  path: `${dir}/pathOne/fileNameOne`} as any,
                { "matchingLines": ["22: two"], "name": "pathTwo/fileNameTwo",  path: `${dir}/pathTwo/fileNameTwo`} as any
            ];
            expect(ResultTransformer.transform(getMockMatches(), repo))
                .toEqual(expect.objectContaining({ matchesRefined }));
        });

        it('captures the raw std out', () => {
            const matches = getMockMatches();
            expect(ResultTransformer.transform(getMockMatches(), repo))
                .toEqual(expect.objectContaining({ matches }));
        });

        it('captures the containing directory', () => {
            const matches = getMockMatches();
            expect(ResultTransformer.transform(getMockMatches(), repo))
                .toEqual(expect.objectContaining({ matches }));
        });
    });
});

function getMockMatches() {
    return `${pathOne}/${fileNameOne}
${lineOne}

${pathTwo}/${fileNameTwo}
${lineTwo}`;
}
