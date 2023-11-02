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
  return matchHistory;
};
