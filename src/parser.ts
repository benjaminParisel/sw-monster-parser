import { writeFile } from './utils';
import * as fs from 'fs';
import * as path from 'path';
import { Monster } from './types';

/**
 * Default PARAMETER
 */
const defaultMapping = ({ name, element, com2us_id, family_id, image_filename, natural_stars, base_stars}: any): Monster => ({
    name,
    element,
    com2us_id,
    family_id,
    image_filename,
    natural_stars,
    isAwaken: (natural_stars != base_stars)
});
/**
 * END
 */


export const aggregateFolderData = (
    folderPath: string = 'output',
    resultNameFile: string = 'sw-monsters',
    keysToExtract: any = defaultMapping 
    ) => {
    const allMonsters: Monster[] = []; // array to hold all monsters

    fs.readdirSync(folderPath).forEach((fileName) => {
        const filePath = path.join(folderPath, fileName);
        if (path.extname(fileName) === '.json') {
            const fileContents = fs.readFileSync(filePath, 'utf-8');
            const monstersInFile: Monster[] = JSON.parse(fileContents);
            allMonsters.push(...monstersInFile);
        }
    });
    const formattedData: Monster[] = allMonsters.map(keysToExtract);
    writeFile(formattedData, resultNameFile);
    console.log('[Monster entries]:', formattedData.length);
};
