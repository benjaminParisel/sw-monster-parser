import fs from 'fs';

export interface Monster {
    name: string;
    element: string;
    com2us_id: number;
    image_filename: string;
    natural_stars: number;
    family_id: number;
    isAwaken: boolean;
}


export const writeFile = (data: Array<any>, fileName: string, folderName: string = 'output') => {
    const jsonData = JSON.stringify(data, null, 2); // convert data to JSON string with 2 spaces of indentation

    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
    fs.writeFile(`${folderName}/${fileName}.json`, jsonData, (err: any) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Monster added: ${data.length} in ${folderName}/${fileName}.json`);
        }
    });
};