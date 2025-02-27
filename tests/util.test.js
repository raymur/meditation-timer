import { it,expect, vi, ex} from "vitest";
import { getDayStreak } from "../src/Util";

it('One day streak', ()=>{
  const today = new Date(2000, 0, 1)
  const todayString = '2000-01-01'
  vi.setSystemTime(today)
  const streak = getDayStreak([todayString]);
  expect(streak).toEqual(1)
})


it('technically next day utc', ()=>{
  const nextDay = new Date(2000, 0, 1, 23, 59)
  const todayString = '2000-01-01'
  const yesterdayString = '1999-12-31'
  vi.setSystemTime(nextDay)
  const streak = getDayStreak([todayString, yesterdayString]);
  expect(streak).toEqual(2)
})


it('3 days, not consecutive', ()=>{
  const nextDay = new Date(2000, 0, 1)
  const dates = ['2000-01-01', '1999-12-31', '1999-12-30', '1999-12-28']
  vi.setSystemTime(nextDay)
  const streak = getDayStreak(dates);
  expect(streak).toEqual(3)
})

it('3 days, not today', ()=>{
  const nextDay = new Date(2000, 0, 1)
  const dates = ['1999-12-31', '1999-12-30', '1999-12-28']
  vi.setSystemTime(nextDay)
  const streak = getDayStreak(dates);
  expect(streak).toEqual(0)
})

it('3 days duplicates', ()=>{
  const nextDay = new Date(2000, 0, 1)
  const dates = ['2000-01-01', '1999-12-31', '1999-12-30', '2000-01-01', '1999-12-31', '1999-12-30',]
  vi.setSystemTime(nextDay)
  const streak = getDayStreak(dates);
  expect(streak).toEqual(3)
})