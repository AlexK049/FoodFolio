export function cleanName(address) {
    const excludeList = ["and"];
    const words = address.split(' ');
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (excludeList.includes(word.toLowerCase())) {
            words[i] = word.toLowerCase();
        } else if (word.length > 0) {
            const firstLetter = word[0].toUpperCase();
            const restOfWord = (word.length > 1) ? word.substring(1).toLowerCase() : "";
            words[i] = firstLetter + restOfWord;
        } else {
            words.splice(i, 1);
            i--;
        }
    }
    address = words.join(' ');

    return address;
}