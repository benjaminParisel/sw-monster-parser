import { five_stars, ld_no_awake, second_awake, three_four_stars_awake } from './getSwarfarmMonster';
import { parseFolder } from './parser';

const OUTPUT_FOLDER = 'output/Setra';

const Setra_with_LD = (folderName: string = 'output') => {
    five_stars(folderName);
    three_four_stars_awake(folderName);
    ld_no_awake(folderName);
    second_awake(folderName);
};

// Setra_with_LD('output/Setra');
parseFolder(OUTPUT_FOLDER, 'sw-monsters');