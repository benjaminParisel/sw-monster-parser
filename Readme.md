# sw-monster-parser

Call recursively the API to retrieve each monster data

## Pre-requisite

[Generate a swarfarm token](https://github.com/swarfarm/swarfarm#jwt-authentication) and copy it on `src/example.ts` for `API_TOKEN` constant.

## Setup

1. Run `npm install`, or `pnpn install` or `yarn install`
2. Run `pnpn run start`
3. In `output` folder, you will found a sw-monsters.json file.

## Usage

- Create a ts file to make your result as you need, an example on src/example.ts is done.
- You can now run `ts-node ./src/example.ts`

## Customize

You can update mapping to define a Function with custom mapping, like is done on example.ts file.

```
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
```

Warning: Don't forget to update Monster interface if you need more info mapping

# Acknowledgments

- [SwarfarmAPI](https://github.com/swarfarm/swarfarm) to retrieve all monster data
