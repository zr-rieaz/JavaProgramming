import { JavaProgram } from "../types";
import { ch01_to_03_programs } from "./programs/ch01_to_03";
import { ch04_to_06_programs } from "./programs/ch04_to_06";
import { ch07_to_09_programs } from "./programs/ch07_to_09";
import { ch10_to_12_programs } from "./programs/ch10_to_12";
import { ch13_to_15_programs } from "./programs/ch13_to_15";

export const allPrograms: JavaProgram[] = [
  ...ch01_to_03_programs,
  ...ch04_to_06_programs,
  ...ch07_to_09_programs,
  ...ch10_to_12_programs,
  ...ch13_to_15_programs,
];

export function getProgramById(id: string): JavaProgram | undefined {
  return allPrograms.find((p) => p.id === id);
}

export function getProgramsByChapter(chapter: number): JavaProgram[] {
  return allPrograms.filter((p) => p.chapter === chapter);
}

export function searchPrograms(query: string): JavaProgram[] {
  if (!query.trim()) return allPrograms;
  const q = query.toLowerCase();
  return allPrograms.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.bengaliTitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      p.code.toLowerCase().includes(q)
  );
}
