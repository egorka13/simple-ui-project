import { BoardItemComponent } from '@components/board/board-item/board-item.component';

export type Layer = Array<BoardItemComponent>;

export interface ZIndexObj {
    [key: number]: Layer;
}
