import { writeFile } from './utils';

export const folderName = 'output';

const fetchAndAggregate: any = async (url: string, apiToken: string = '', data: Array<any> = []) => {
    if(apiToken == ''){
        throw new Error('You need to give apiToken to call swarfarm API. Check readme for more informations.')
    }
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
                return fetchAndAggregate(nextPageUrl,apiToken, data);
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
export const custom_query = async (queryParams: string = '', folderName: string = 'output', fileName: string = '', apiToken: string) => {
    if (!queryParams.startsWith('?')) {
        queryParams = `?${queryParams}`;
    }
    await fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/${queryParams}`, apiToken,[])
        .then(async (monstersData: Array<any>) => {
           await writeFile(monstersData, `mobs_5_stars`, folderName);
        });
};

export const ld_no_awake = async (folderName: string = 'output', apiToken: string) => {
    const mobs_4_stars_L_no_awake: string = `?natural_stars=4&element=light&awaken_level=0&page=1`;
    const mobs_4_stars_D_no_awake: string = `?natural_stars=4&element=dark&awaken_level=0&page=1`;
    await fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/${mobs_4_stars_L_no_awake}`, apiToken,[])
        .then(async (monstersData: Array<any>) => {
            await writeFile(monstersData, `mobs_4_stars_L_no_awake`, folderName);
        });
     await fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/${mobs_4_stars_D_no_awake}`,  apiToken, [])
        .then(async (monstersData: Array<any>) => {
            await writeFile(monstersData, `mobs_4_stars_D_no_awake`, folderName);
        });
};

export const five_stars =  async (folderName: string = 'output', apiToken: string) => {
    const mobs_5_stars: string = `?natural_stars=5&page=1`;
     await fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/${mobs_5_stars}`,apiToken, [])
        .then(async (monstersData: Array<any>) => {
            await writeFile(monstersData, `mobs_5_stars`, folderName);
        });
};

export const three_four_stars_awake =  async (folderName: string = 'output', apiToken: string) => {
    const mobs_3_4_stars_awaken: string = `?natural_stars__gte=3&natural_stars__lte=4&awaken_level=1&page_size=100&page=1`;
    await fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/${mobs_3_4_stars_awaken}`, apiToken,[])
        .then(async (monstersData: Array<any>) => {
           await writeFile(monstersData, `mobs_3_4_stars_awaken`, folderName);
        });
};

export const second_awake = async (folderName: string = 'output', apiToken: string) => {
     await fetchAndAggregate(`https://swarfarm.com/api/v2/monsters/?awaken_level=2&page_size=100&page=1`, apiToken,[])
        .then(async (monstersData: Array<any>) => {
            await writeFile(monstersData, 'second_awake', folderName);
        });
};