import dukou from './assets/dukou.flac';
import guyongzhe from './assets/guyongzhe.flac';
import zheshijienameduoren from './assets/zheshijienameduoren.flac';
import newThang from './assets/new-thang.flac';
import gao from './assets/gao.flac';
import kong from './assets/kong.flac';

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
  {
    name: 'RADWIMPS - 陽菜と、走る帆高',
    url: gao,
  },
  {
    name: 'RADWIMPS - 晴れゆく空',
    url: kong,
  },
]
