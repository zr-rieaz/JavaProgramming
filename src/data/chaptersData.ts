import { Chapter } from "../types";
import { ch01_to_03_chapters } from "./chapters/ch01_to_03";
import { ch04_to_06_chapters } from "./chapters/ch04_to_06";
import { ch07_to_09_chapters } from "./chapters/ch07_to_09";
import { ch10_to_12_chapters } from "./chapters/ch10_to_12";
import { ch13_to_15_chapters } from "./chapters/ch13_to_15";

export const javaChapters: Chapter[] = [
  ...ch01_to_03_chapters,
  ...ch04_to_06_chapters,
  ...ch07_to_09_chapters,
  ...ch10_to_12_chapters,
  ...ch13_to_15_chapters,
];

export function getChapterById(id: number): Chapter | undefined {
  return javaChapters.find((ch) => ch.id === id);
}

export function searchChapters(query: string): { chapter: Chapter; matchingTopicIds: string[] }[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: { chapter: Chapter; matchingTopicIds: string[] }[] = [];

  for (const ch of javaChapters) {
    const matchingTopics: string[] = [];
    const chapterMatches =
      ch.title.toLowerCase().includes(q) ||
      ch.bengaliTitle.toLowerCase().includes(q) ||
      ch.summary.toLowerCase().includes(q);

    for (const t of ch.topics) {
      if (
        t.title.toLowerCase().includes(q) ||
        t.bengaliTitle.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.explanation.toLowerCase().includes(q) ||
        t.codeExample.toLowerCase().includes(q)
      ) {
        matchingTopics.push(t.id);
      }
    }

    if (chapterMatches || matchingTopics.length > 0) {
      results.push({
        chapter: ch,
        matchingTopicIds: matchingTopics,
      });
    }
  }

  return results;
}
