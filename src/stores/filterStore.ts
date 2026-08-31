import { create } from 'zustand';
import { FilterState, DateRangeOption, TimeOfDayOption } from '../types/filter';

export const useFilterStore = create<FilterState>((set) => ({
  dateRange: 'today',
  timeOfDay: 'all',
  selectedZone: 'all',
  selectedCamera: 'all',
  setDateRange: (range: DateRangeOption) => set({ dateRange: range }),
  setTimeOfDay: (time: TimeOfDayOption) => set({ timeOfDay: time }),
  setSelectedZone: (zone: string) => set({ selectedZone: zone, selectedCamera: 'all' }),
  setSelectedCamera: (camera: string) => set({ selectedCamera: camera }),
  resetFilters: () => set({
    dateRange: 'today',
    timeOfDay: 'all',
    selectedZone: 'all',
    selectedCamera: 'all',
  }),
}));
