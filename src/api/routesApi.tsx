export const API_DEV_KEY = import.meta.env.VITE_API_DEV_RIOT;

// GET

// GET UserData (Id, AccountId, PUUID, summonerName, profileIcon, revisionDate, summoner level)
export const getUserDatas = async (region: string, summonerName: string) => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_DEV_KEY}`,
    {
      method: 'GET',
    }
  );
  const userDatas = await response.json();

  return userDatas;
};

export const getUserMatchHistory = async (
  puuid: string,
  regionRouting: string
) => {
  const response = await fetch(
    `https://${regionRouting}/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${API_DEV_KEY}`,
    {
      method: 'GET',
    }
  );
  const matchHistory = await response.json();
  return matchHistory;
};
