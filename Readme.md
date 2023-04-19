# sw-monster-parser

Call recursively the API to retrieve each monster data

## Pre-requisite

[Generate a swarfarm token](https://github.com/swarfarm/swarfarm#jwt-authentication) and copy it on `getSwarfarmMonster.ts`

## Usage

* Create a ts file to make your result as you need.

```
    // ./src/main.ts
    import { five_stars, ld_no_awake, second_awake, three_four_stars_awake } from './getSwarfarmMonster';
    import { parseFolder } from './parser';

    const OUTPUT_FOLDER = 'output/Setra';

    const generateData = (folderName: string = 'output') => {
        five_stars(folderName);
        three_four_stars_awake(folderName);
        ld_no_awake(folderName);
        second_awake(folderName);
    };
    // Call the API endpoint
    generateData('output/Setra');
    // Parse input folder to write a json file with monster data
    parseFolder(OUTPUT_FOLDER, 'sw-monsters' );
```

* You can now run `ts-node ./src/main.ts`

# License
This project is licensed under the Apache 2.0 License - see the LICENSE file for details

# Acknowledgments
* [SwarfarmAPI](https://github.com/swarfarm/swarfarm) to retrieve all monster data
