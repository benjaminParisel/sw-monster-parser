import { five_stars, ld_no_awake, second_awake, three_four_stars_awake } from './getSwarfarmMonster';
import { aggregateFolderData } from './parser';
import { Monster } from './types';

const OUTPUT_FOLDER = 'output/examples';

const customMapping = ({ name, element, com2us_id, family_id, image_filename, natural_stars, base_stars, awaken_level, awakens_from,awakens_to }: any): Monster => ({
    name,
    element,
    com2us_id,
    family_id,
    image_filename,
    natural_stars,
    isAwaken: (natural_stars != base_stars),
    isDoubleAwaken: (awaken_level == 2),
    awakens_from,
    awakens_to
});

const API_TOKEN = ""

/**
 * Get data from swarfarm api and put result in the output folder
 * @param outputFolderName 
 */
const getDataFromSwarfarm = async (outputFolderName: string = 'output') => {
    await three_four_stars_awake(outputFolderName,API_TOKEN);
    await ld_no_awake(outputFolderName,API_TOKEN);
    await second_awake(outputFolderName,API_TOKEN);
    await five_stars(outputFolderName,API_TOKEN);
};

const main = async () => {
    // Call Swarfarm API to get fresh data
    await getDataFromSwarfarm(OUTPUT_FOLDER);
    aggregateFolderData(OUTPUT_FOLDER, 'sw-monsters', customMapping);
}

main();

