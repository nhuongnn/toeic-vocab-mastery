import { PronunciationCategoryInfo, PronunciationTopic, PronunciationCategoryId } from '@/types/pronunciation';
import { linkingSoundsTopics } from './linking-sounds';
import { rhythmStressTopics } from './rhythm-stress';
import { reductionsTopics } from './reductions';
import { vietnamesePitfallsTopics } from './vietnamese-pitfalls';
import { intonationTopics } from './intonation';

export const pronunciationCategories: PronunciationCategoryInfo[] = [
  {
    id: 'linking-sounds',
    title: 'Connected Speech & Linking',
    titleVi: 'Nối âm tự nhiên (Connected Speech)',
    description:
      'Cơ chế miệng tự nhiên khi nói trượt: Nối phụ âm sang nguyên âm (Pick it up), âm T vỗ kiểu Mỹ (Water, Better), và nuốt âm H trong đại từ (Tell him ➔ Tell-im).',
    iconName: 'Link2',
    badge: 'Nối âm trượt mượt',
  },
  {
    id: 'rhythm-stress',
    title: 'Word Stress & Sentence Rhythm',
    titleVi: 'Trọng âm từ & Nhịp điệu câu (Rhythm)',
    description:
      'Bản nhạc nhịp điệu tiếng Anh: Chỉ nhấn to từ mang thông tin chính (Content Words), đè bẹp từ chức năng (Function Words), và phép màu của âm lười Schwa /ə/.',
    iconName: 'Activity',
    badge: 'Nhịp điệu tự nhiên',
  },
  {
    id: 'reductions',
    title: 'Everyday Speech Reductions',
    titleVi: 'Dạng rút gọn cửa miệng (Reductions)',
    description:
      'Những thứ người bản xứ luôn nói tắt trong đời thực: Gonna, Wanna, Gotta, Lemme, Kinda, Outta, và dạng quá khứ Coulda, Shoulda, Woulda, Whaddya.',
    iconName: 'Zap',
    badge: 'Nói nhanh như gió',
  },
  {
    id: 'vietnamese-pitfalls',
    title: 'Vietnamese Speaker Sound Pitfalls',
    titleVi: 'Cặp âm chí mạng người Việt hay nhầm',
    description:
      'Chữa dứt điểm tật nuốt âm đuôi (/s/, /z/, /t/, /d/), phân biệt cặp âm nhạy cảm /i:/ vs /ɪ/ (Leave vs Live, Sheet vs Shit), và kỹ thuật kẹp lưỡi âm "TH".',
    iconName: 'AlertTriangle',
    badge: 'Tránh bẫy tai hại',
  },
  {
    id: 'intonation',
    title: 'Intonation & Tone in Conversations',
    titleVi: 'Ngữ điệu & Cảm xúc giao tiếp (Intonation)',
    description:
      'Nghệ thuật lên giọng (Rising ↗) và xuống giọng (Falling ↘) để thể hiện sự chắc chắn, tò mò, lịch sự hoặc kết thúc danh sách liệt kê.',
    iconName: 'Volume2',
    badge: 'Ngữ điệu bản xứ',
  },
];

export const allPronunciationTopics: PronunciationTopic[] = [
  ...linkingSoundsTopics,
  ...rhythmStressTopics,
  ...reductionsTopics,
  ...vietnamesePitfallsTopics,
  ...intonationTopics,
];

export function getTopicsByCategory(categoryId: PronunciationCategoryId): PronunciationTopic[] {
  return allPronunciationTopics.filter((topic) => topic.categoryId === categoryId);
}

export function getTopicById(id: string): PronunciationTopic | undefined {
  return allPronunciationTopics.find((topic) => topic.id === id);
}
