export type DateRangeOption = 'today' | 'yesterday' | '7d' | '30d';

export type TimeOfDayOption = 'all' | 'morning_peak' | 'evening_peak' | 'night';

export interface FilterState {
  dateRange: DateRangeOption;
  timeOfDay: TimeOfDayOption;
  selectedZone: string;
  selectedCamera: string;
  setDateRange: (range: DateRangeOption) => void;
  setTimeOfDay: (time: TimeOfDayOption) => void;
  setSelectedZone: (zone: string) => void;
  setSelectedCamera: (camera: string) => void;
  resetFilters: () => void;
}
