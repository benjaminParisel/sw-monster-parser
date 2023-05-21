import fs from 'fs';

export const writeFile = async(data: Array<any>, fileName: string, folderName: string = 'output') => {
    const jsonData = JSON.stringify(data, null, 2);
    try {        
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        await fs.promises.writeFile(`${folderName}/${fileName}.json`, jsonData);

        console.log(`Monster added: ${data.length} in ${folderName}/${fileName}.json`);
    } catch (error) {
        console.error('Error:', error);
    }

};