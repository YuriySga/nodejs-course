export interface IUser {
  id?: string;
  name: string;
  login: string;
  password?: string;
}

export interface IBoard {
  id?: string;
  title: string ;
  columns?: string;
}

export interface IColumn {
  id?: string | undefined;
  boardId: string;
  title: string;
  order: string;
}

export interface IColumns {
  columns: IColumn[];
  boardId: string;
}

export interface ITask {
  id?: string;
  boardId: string;
  columnId : string;
  userId: string | null;
  description: string;
  title: string;
  order: number;
}

export interface ITaskIds {
  taskId: string | undefined,
  boardId: string | undefined
}