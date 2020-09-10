export interface ScreenParams {
  name: string;
  backgroundColor: string;
  nextScreen: string;
  paddingBottom?: number;
}

export type MainTabsParams = {
  Home: ScreenParams;
  Likes: ScreenParams;
  Camera: ScreenParams;
  Search: ScreenParams;
  Profile: ScreenParams;
};
