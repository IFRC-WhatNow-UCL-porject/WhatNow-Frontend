import { messageTypes, contentTypes } from "../../constant";
import CryptoJS from 'crypto-js';

const secretKey = 'ifrcwhatnow';

const csv_data_generator = (time_id, contents, messages, selectedSociety, selectedLanguage, selectedRegion) => {
    let csvContent = '';

    csvContent += time_id + '\n';
    csvContent += '#List attribution title and message below\n';
  
    csvContent += 'Society Name,Language,Region Name,Attribution Message,Attribution Url,Description\n';
    csvContent += selectedSociety.society_name + ',' + selectedLanguage.display + ',' + selectedRegion.region_name + ',' + selectedLanguage.message.replace(/\n/g, ' ') + ',' + selectedLanguage.url.replace(/\n/g, ' ') + ',' + selectedLanguage.description.replace(/\n/g, ' ') + '\n';
  
    csvContent += '#List whatnow content below. Once event type per line.\n';
    csvContent += '#Each stage within an Stages column must be on a new row leave preceding duplicate cells blank\n';
  
    csvContent += 'Event Type,Title,Description,Web Url,Mitigation Stages,Seasonal Forecast Stages,Watch Stages,Warning Stages,Immediate Stages,Recover Stages\n';

    for (let i = 0; i < contents.length; i++) {
        const content = contents[i];
        const content_message = Array.from({ length: Object.keys(messageTypes).length }, () => []);
        const message_types = Object.keys(messageTypes);
        for (let j = 0; j < messages.length; j++) {
            const message = messages[j];
            if (message.content_type == content.content_type) {
                const index = message_types.indexOf(message.type);
                content_message[index].push(message.content);
            }
        }
        let end = false;
        let row_index = 0;
        let message_limit = content_message.map(message_list => message_list.length).reduce((a, b) => Math.max(a, b));
        while (!end) {
            let line = '';
            if (row_index == 0) {
                line += contentTypes[content.content_type] + ',' + content.title + ',' + content.description + ',' + content.url + ',';
            } else {
                line += ',,,,';
            }
            for (let j = 0; j < content_message.length; j++) {
                if (content_message[j].length > row_index) {
                    line += content_message[j][row_index] + ',';
                } else {
                    line += ',';
                }
            }
            csvContent += line + '\n';
            if (row_index == message_limit - 1 || message_limit == 0) {
                end = true;
            } else {
                row_index++;
            }
        }
    }

    csvContent = csvContent.slice(0, -1);
  
    return csvContent;
}

const generateAndEncryptId = (society_id) => {
    const id = society_id + '_' + new Date().toISOString();
    const encrypted = CryptoJS.AES.encrypt(id, secretKey).toString();
    return encrypted;
  };

export { csv_data_generator, generateAndEncryptId };