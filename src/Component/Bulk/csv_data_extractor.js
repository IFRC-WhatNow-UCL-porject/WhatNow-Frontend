import { contentTypes, messageTypes } from "../../constant";
import CryptoJS from 'crypto-js';

const secretKey = 'ifrcwhatnow';

const decryptId = (encryptedId) => {
    const bytes = CryptoJS.AES.decrypt(encryptedId, secretKey);
    const originalId = bytes.toString(CryptoJS.enc.Utf8);
    return originalId;
  };

const file_format_check = (file) => {
    if (file[1].split(',')[0] == "#List attribution title and message below") {
            if (file[4].split(',')[0] == "#List whatnow content below. Once event type per line.") {
                if (file[5].split(',')[0] == "#Each stage within an Stages column must be on a new row leave preceding duplicate cells blank") {
                    return true;
            }
        }
    }
    return false;
}

const data_reorganizor = (data) => {
    var result = {}
    var jump_to_next_content_type = false;
    
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const current_content_type = row[0];
        const content_types = Object.keys(contentTypes);

        if (current_content_type) {
            jump_to_next_content_type = false;
            for (let k = 0; k < content_types.length; k++) {
                if (current_content_type == contentTypes[content_types[k]]) {
                    if (!result[content_types[k]]) {
                        result[content_types[k]] = {
                            content: {title: row[1], description: row[2], url: row[3]},
                            messages: Array.from({ length: Object.keys(messageTypes).length }, () => [])
                        };
                    }
                    for (let j = 4; j < row.length; j++) {
                        if (row[j]) {
                            result[content_types[k]].messages[j - 4].push(row[j]);
                        }
                    }
                    break;
                } else {
                    jump_to_next_content_type = true;
                }
            }
        } else {
            if (jump_to_next_content_type) {
                continue;
            }
        }
    }

    return result;
}

export { decryptId, file_format_check, data_reorganizor };