import { writeFile } from './utils';

export const folderName = 'output';

const apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODU3OSwidXNlcm5hbWUiOiJuYWthcyIsImV4cCI6MTY4MTkyMzYzMCwiZW1haWwiOiJnYW1pbmcubmFrYXNAZ21haWwuY29tIn0.r2XtKzCvC8BhLQrL9NIdoD8sLkLoQOP0zvtuTB-CB3I';

const fetchAndAggregate: any = async (url: string, data: Array<any> = []) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Authorization': apiToken,
        },
    })
        .then(response => response.json())
        .then(result => {
            data = data.concat(result.results);
            if (result.next) {
                // recursively fetch more data
                const nextPageUrl = result.next;
                return fetchAndAggregate(nextPageUrl, data);
            } else {
                // all data has been fetched, return the aggregated array
                return data;
            }
        });
};

/**
 * Call https://swarfarm.com/api/v2/monsters/ with your custom queryParams
 * @param queryParams Should startWith a `?`
 * @param folderName 
 */
export const custom_query = (queryParams: string = '', folderName: string = 'output', fileName: string = '') => {
    if (!queryParams.startsWith('?')) {
        queryParams = `?${queryParams}`;
    }
    fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/${queryParams}`, [])
        .then((monstersData: Array<any>) => {
            writeFile(monstersData, `mobs_5_stars`, folderName);
        });
};

export const ld_no_awake = (folderName: string = 'output') => {
    const mobs_4_stars_L_no_awake: string = `?natural_stars=4&element=light&awaken_level=0&page=1`;
    const mobs_4_stars_D_no_awake: string = `?natural_stars=4&element=dark&awaken_level=0&page=1`;
    fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/${mobs_4_stars_L_no_awake}`, [])
        .then((monstersData: Array<any>) => {
            writeFile(monstersData, `mobs_4_stars_L_no_awake`, folderName);
        });
    fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/${mobs_4_stars_D_no_awake}`, [])
        .then((monstersData: Array<any>) => {
            writeFile(monstersData, `mobs_4_stars_D_no_awake`, folderName);
        });
};

export const five_stars = (folderName: string = 'output') => {
    const mobs_5_stars: string = `?natural_stars=5&page=1`;
    fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/${mobs_5_stars}`, [])
        .then((monstersData: Array<any>) => {
            writeFile(monstersData, `mobs_5_stars`, folderName);
        });
};

export const three_four_stars_awake = (folderName: string = 'output') => {
    const mobs_3_4_stars_awaken: string = `?natural_stars__gte=3&natural_stars__lte=4&awaken_level=1&page_size=100&page=1`;
    fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/${mobs_3_4_stars_awaken}`, [])
        .then((monstersData: Array<any>) => {
            writeFile(monstersData, `mobs_3_4_stars_awaken`, folderName);
        });
};

export const second_awake = (folderName: string = 'output') => {
    fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/?awaken_level=2&page_size=100&page=1`, [])
        .then((monstersData: Array<any>) => {
            writeFile(monstersData, 'second_awake.json', folderName);
        });
};