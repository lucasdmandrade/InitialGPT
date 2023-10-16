import {Chat} from '../../api/models/chats';

const groupByDay = (array: Chat[]) => {
  const grouped = [];

  const ordenadoPorLastUsedAt = array.slice();

  let grupoAtual = [ordenadoPorLastUsedAt[0]];
  for (let i = 1; i < ordenadoPorLastUsedAt.length; i++) {
    if (ordenadoPorLastUsedAt[i].lastUsedAt === grupoAtual[0].lastUsedAt) {
      grupoAtual.push(ordenadoPorLastUsedAt[i]);
    } else {
      grouped.push(grupoAtual);
      grupoAtual = [ordenadoPorLastUsedAt[i]];
    }
  }
  grouped.push(grupoAtual);

  return grouped;
};

export default groupByDay;
