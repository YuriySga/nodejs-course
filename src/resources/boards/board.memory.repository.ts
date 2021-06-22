import { DeleteResult, getRepository } from "typeorm";
import { BoardTask } from "../../entities/BoardTask";
import { IBoard } from "../../common/types";
import { Board } from "../../entities/Board";

export const getAll = async (): Promise<Board[]> => {
  const boardRepository = getRepository(Board);
  const boards = await boardRepository.find();
  return boards;
};

export const get = async (id: string): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const boards = await boardRepository.findOne(id);
  return boards;
}

export const create = async (board: IBoard): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const newBoard = boardRepository.create(board);
  const results = await boardRepository.save(newBoard);
  return results;
}

export const update = async (board: IBoard): Promise<undefined | Board> => {
  const boardRepository = getRepository(Board);
  const oldBoard = await boardRepository.findOne(board.id);  
  if (oldBoard) {
    boardRepository.merge(oldBoard, board);
    const results = await boardRepository.save(oldBoard)
    return results;
  }

  return undefined;
}

export const del = async (id: string): Promise<DeleteResult> => {
  const taskRepository = getRepository(BoardTask);
  const tasksToDel = await taskRepository.find({where: {boardId: `${id}`}});
  if (tasksToDel) {
    tasksToDel.map(async task => {
      await taskRepository.delete(task.id);      
    })    
  };

  const boardRepository = getRepository(Board);
  const result = await boardRepository.delete(id);
  return result;
};

