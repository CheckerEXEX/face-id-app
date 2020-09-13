export interface ScreenParams {
  name: string;
  backgroundColor: string;
  color: string;
  nextScreen: string;
  paddingBottom?: number;
}

export type MainTabsParams = {
  'Trang chủ' : ScreenParams;
  'Lịch sử': ScreenParams;
  'Chấm công': ScreenParams;
  'Thông tin': ScreenParams;
  'Cài đặt': ScreenParams;
};
