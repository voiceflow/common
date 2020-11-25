export const validCharacters = 'a-zA-Z';

// Latin character Unicode points from https://tiny.amazon.com/1hix1tfzz/enwikiorgwikiList
export const validLatinChars = `${validCharacters}\xC0-\xFF\u0100-\u017F`;

// Support for latin and asian characters - Consider using library such as
// https://www.npmjs.com/package/unicode-6.3.0#readme
// to generate valid chars. Additional flushing out of this lib would be necessary
export const validSpokenCharacters = `${validLatinChars}\u0900-\u0965\u0970-\u097F\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFF9F\u4E00-\u9FAF\u3400-\u4DBF`;

const validSampleCharactersWithoutCurlyBracesOrSpaces = `${validSpokenCharacters}._'\\-`;
const validSampleCharacters = `${validSampleCharactersWithoutCurlyBracesOrSpaces} \\[\\]`;

export const sampleUtteranceRegex = `[^${validSampleCharacters}|]`;
