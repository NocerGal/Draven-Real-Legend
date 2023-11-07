export const API_DEV_KEY = import.meta.env.VITE_API_DEV_RIOT;

export async function getUserDatas(region: string, summonerName: string) {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_DEV_KEY}`
  );
  if (!response.ok) {
    throw new Error('Erreur API');
  }
  const userDatas = await response.json();
  const responseStatus = response.status;
  return { responseStatus, userDatas };
}

export const getUserMatchHistory = async (
  puuid: string,
  regionRouting: string
) => {
  const response = await fetch(
    `https://${regionRouting}/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${API_DEV_KEY}`
  );
  const matchHistory = await response.json();
  console.log('requête GetUserMatchHistory');

  return matchHistory;
};

export const getUserMatchInfosRegardingMatchId = async (
  regionRouting: string,
  matchId: string
) => {
  const response = await fetch(
    `https://${regionRouting}/lol/match/v5/matches/${matchId}?api_key=${API_DEV_KEY}`
  );
  if (!response.ok) throw new Error('ErreurApi');
  const matchInfos = await response.json();

  console.log('requête getUserMatchInfosRegardingMatchId');
  return matchInfos;
};

export const getChampionInformation = (
  language: string,
  championName: string
) => {
  return `http://ddragon.leagueoflegends.com/cdn/13.21.1/data/${language}/champion/${championName}.json`;
};
export const getChampionSquareAsset = (championName: string) => {
  return `http://ddragon.leagueoflegends.com/cdn/13.21.1/img/champion/${championName}.png`;
};

export const getItemInformation = async (language: string) => {
  const response = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/13.21.1/data/${language}/item.json`
  );
  if (!response.ok) throw new Error('Error getInformation');
  const itemsDatas = await response.json();
  return itemsDatas;
};

export const getItemAsset = (item: number) => {
  return `http://ddragon.leagueoflegends.com/cdn/13.21.1/img/item/${item}.png`;
};

export const getAllSummonerSpells = async (lang: string) => {
  const response = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/13.21.1/data/${lang}/summoner.json`
  );
  if (!response.ok) throw new Error('Error getInformation');
  const allSummonerSpells = await response.json();
  return allSummonerSpells;
};

export const getAssetSummonerSpells = (spell: string) => {
  return `http://ddragon.leagueoflegends.com/cdn/13.21.1/img/spell/Summoner${spell}.png`;
};
