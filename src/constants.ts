import dukou from './assets/dukou.flac';
import guyongzhe from './assets/guyongzhe.flac';
import zheshijienameduoren from './assets/zheshijienameduoren.flac';
import newThang from './assets/new-thang.flac';

export interface PlayListItem {
  name: string;
  url: string;
}

export const defaultPlayList: PlayListItem[] = [
  {
    name: '渡口',
    url: dukou,
  },
  {
    name: '蛄蛹者',
    url: guyongzhe,
  },
  {
    name: '这世界那么多人',
    url: zheshijienameduoren,
  },
  {
    name: 'New Thang',
    url: newThang,
  },
]
