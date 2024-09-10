export interface ILoginData {
  token: string;
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  userRole: 2;
  created: Date | string;
  updated: Date | string;
}

interface DateFilter {
  lastYear: boolean;
  lastMonth: boolean;
  lastWeek: boolean;
  lastDay: boolean;
  lastHour: boolean;
}

interface StatusFilter {
  active: boolean;
  inActive: boolean;
  followUp: boolean;
  noAction: boolean;
  verified: boolean;
  unVerified: boolean;
}

interface SortByFilter {
  recentlyUpdated: boolean;
  fresh: boolean;
  actionRequired: boolean;
  inQueue: boolean;
}

export interface FilterState {
  page: number;
  size: number;
  search: string;
  contact: boolean;
  date: DateFilter;
  status: StatusFilter;
  sortBy: SortByFilter;
}
