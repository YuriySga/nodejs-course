import { getRepository } from "typeorm";
import { IColumn } from "../../common/types";
import { BoardColumn } from "../../entities/BoardColumn";

export const getAll = async (boardId: string): Promise<IColumn[]> => {
    const columnRepository = getRepository(BoardColumn);
    const tasks = await columnRepository.find({where: {boardId: `${boardId}`}});
    console.log('+++++++++tasks+++++++++++++');
    console.log(boardId);
    console.log(tasks);
    return tasks;
  }

export const create = async (columns: IColumn[] | undefined): Promise<void> => {
    const arr: { id: string; boardId: string; title: string; order: string; }[] = [];
    const columnRepository = getRepository(BoardColumn);
    if (columns) {
        columns.map(async column => {
            const newColumn = await columnRepository.create(column);
            const result = await columnRepository.save(newColumn);
            console.log('result41111');
            console.log(result);

            arr.push({
                id: result.id,
                boardId: result.boardId,
                title: result.title,
                order: result.order,
            })
        });  

      
    } 
    console.log(arr);
}

export const del = async (boardId: string | undefined): Promise<void> => {
    const columnRepository = getRepository(BoardColumn);
    const columnsToDel = await columnRepository.find({where: {boardId: `${boardId}`}});
    columnsToDel.map(async column => columnRepository.delete(column.id));  
};