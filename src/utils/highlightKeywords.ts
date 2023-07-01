const keywords = ['vue', 'TypeScript']; // 关键字列表
const pattern_keywords = '(' + keywords.join('|') + ')';

const regex_keywords = new RegExp(pattern_keywords, 'gi'); // 匹配关键字的正则表达式
const regex_words = new RegExp(/\b[A-Za-z]+\b/g, 'gi'); // 匹配单词的正则表达式
const REGEX_MAP = {
	words: regex_words,
	keywords: regex_keywords,
};

/**
 * @description 匹配当前元素下所有p标签的文本内容，高亮关键字
 * @param {HTMLElement} el 当前元素
 * @param {string} type 高亮类型 word:单词，keywords:关键字 不传则全部高亮
 * @return void
 */
export const highlightKeywords = (el: HTMLElement | null, type?: keyof typeof REGEX_MAP) => {
	if (!el) return;
	const paragraphs: NodeListOf<HTMLElement> = el.querySelectorAll('p');
	for (let i = 0; i < paragraphs.length; i++) {
		const paragraph = paragraphs[i]; // 当前p标签 DOM
		const text = paragraph.textContent; // 当前p标签文本内容
		if (text) {
			if (type) {
				const regex = REGEX_MAP[type]; // 正则表达式 word:单词，keywords:关键字
				paragraph.innerHTML = text.replace(regex, `<em class=highlight-${type} style='color:red'>$&</em>`);
			} else {
				paragraph.innerHTML = text
					.replace(regex_words, '<em class="highlight-words" style="color:red">$&</em>')
					.replace(regex_keywords, '<em class="highlight-keywords" style="color:green">$&</em>');
			}
		}
	}
};
