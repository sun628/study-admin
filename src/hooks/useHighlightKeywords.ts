import { onMounted, onBeforeUnmount } from 'vue';
export const keywords = ['vue', 'vue3', 'TypeScript', 'electron']; // 关键字列表
export const isKeyword = (word: string): boolean => keywords.includes(word); // 是否是关键字

const regex_keywords = new RegExp(`(${keywords.join('|')})`, 'gi'); // 匹配关键字的正则表达式

// 匹配单词的正则表达式(排除html标签和html实体以及&开头的转义字符)
const regex_words = new RegExp(/(?<!&[^;]*?)(?<!<[^>]*?)([A-Za-z]+)/g, 'gi');

/**
 * @description 高亮关键字和单词
 * @param {string} text 需要处理的文本
 * @return {string} 处理后的文本
 */
const highlightKeywordsAndWords = (text: string): string => {
	let result = text;
	// 高亮关键字
	result = result.replace(regex_keywords, '<em class="highlight-keywords">$&</em>');
	// 高亮单词
	result = result.replace(regex_words, (match) => {
		// 检查是否已经被关键字高亮
		if (result.indexOf(`<em class="highlight-keywords">${match}</em>`) !== -1) {
			return match; // 已经被关键字高亮，直接返回原单词
		} else {
			return `<em class="highlight-words">${match}</em>`; // 未被关键字高亮，进行单词高亮
		}
	});
	return result;
};

/**
 * @description 高亮关键字和单词
 * @param {Ref<HTMLElement | null>} DocRef 文档元素的引用
 * @param {(textContent: string) => void} callback 点击关键字的回调函数
 * @return void
 * @example useHighlightKeywords(DocRef, (textContent) => {
 *   console.log('点击了', textContent);
 * });
 */
export const useHighlightKeywords = (DocRef: Ref<HTMLElement | null>, callback: (textContent: string) => void) => {
	const listeners = new Map();
	const keywordClick = (event: Event): void => {
		const target = event.target as HTMLElement;
		if (target) {
			const textContent: any = target.textContent;
			callback(textContent);
		}
	};

	/**
	 * @description 匹配当前元素下所有p标签的文本内容，高亮关键字和单词
	 * @return void
	 */
	const highlightKeywords = (el: HTMLElement | null) => {
		if (!el) return;
		const paragraphs: NodeListOf<HTMLElement> = el.querySelectorAll('p,.highlight');
		for (let i = 0; i < paragraphs.length; i++) {
			const paragraph = paragraphs[i];
			const text = paragraph.innerHTML;
			if (text) {
				const highlightedText = highlightKeywordsAndWords(text);
				paragraph.innerHTML = highlightedText;
				const emElements: NodeListOf<HTMLElement> = paragraph.querySelectorAll('.highlight-keywords');
				for (let j = 0; j < emElements.length; j++) {
					const emElement = emElements[j];
					emElement.addEventListener('click', keywordClick);
					listeners.set(emElement, keywordClick);
				}
			}
		}
	};
	onMounted(() => {
		highlightKeywords(DocRef.value);
	});
	onBeforeUnmount(() => {
		// 移除事件监听
		listeners.forEach((value, key) => {
			key.removeEventListener('click', value);
		});
		listeners.clear();
	});
};
