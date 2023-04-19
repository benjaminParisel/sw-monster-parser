import { Monster, writeFile } from './utils';
import * as fs from 'fs';
import * as path from 'path';

/**
 * START PARAMETER
 */
const outputFilename: string = 'Setra_with_LD';

const formatData = ({ name, element, com2us_id, family_id, image_filename, natural_stars, base_stars }: any): Monster => ({
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


export const parseFolder = (folderPath: string = 'output', resultNameFile: string = 'sw-monsters') => {
    const allMonsters: Monster[] = []; // array to hold all monsters

    fs.readdirSync(folderPath).forEach((fileName) => {
        const filePath = path.join(folderPath, fileName);
        if (path.extname(fileName) === '.json') {
            const fileContents = fs.readFileSync(filePath, 'utf-8');
            const monstersInFile: Monster[] = JSON.parse(fileContents);
            allMonsters.push(...monstersInFile);
        }
    });
    const formattedData: Monster[] = allMonsters.map(formatData);
    writeFile(formattedData, resultNameFile);
    console.log('[Monster entries]:', formattedData.length);
};


// const mobs_five_stars: any[] = five_stars;
// const mobs_light: any[] = light_4_stars;
// const mobs_dark: any[] = dark_4_stars;
// // Concat 2a mobs and all monster from json import
// const monsterData: any[] = monsters_source.concat(mobs_five_stars, secondAwake, mobs_light, mobs_dark);

// // let debug: Array<any> = monsterData.filter((mob: Monster) => mob.name === "Carcano");
// // console.table(debug);
// // writeFile(debug, 'debug');
// // Filter selected key
// const formattedData: Monster[] = monsterData.map(formatData);

// writeFile(formattedData, outputFilename);

