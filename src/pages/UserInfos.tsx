import { useParams } from 'react-router-dom';
import {
  getAllSummonerSpells,
  getAssetSummonerSpells,
  getChampionSquareAsset,
  getItemAsset,
  getItemInformation,
  getUserMatchHistory,
  getUserMatchInfosRegardingMatchId,
} from '../api/routesApi';
import { continents } from '../datas/regions.json';
import { memo, useEffect, useState } from 'react';
import { useSidebarContext } from '../context/NavBar';
import { ArrowDownIcon } from '@radix-ui/react-icons';
import FormSearchPlayer from '../components/FormSearchPlayer';
import { ItemsDatas } from '../interfaces/ItemsInteface';
import { RootParticipant } from '../interfaces/participants';
import TeamMates from '../components/TeamMates';
import Item from '../components/Items';

export default function UserInfos() {
  const { language } = useSidebarContext();
  interface Continents {
    [key: string]: string;
  }
  interface MatchInfo {
    metadata: {
      matchId: string;
      participants: string[];
    };
    info: {
      gameDuration: number;
      participants: Array<{
        totalEnemyJungleMinionsKilled: any;
        totalAllyJungleMinionsKilled: number;
        win: boolean;
        teamPosition: string;
        champLevel: number;
        goldEarned: number;
        goldSpent: number;
        summonerName: string;
        kills: number;
        deaths: number;
        assists: number;
        summoner1Id: number;
        summoner2Id: number;
        totalMinionsKilled: number;
        championName: string;
        championId: number;
        item0: number;
        item1: number;
        item2: number;
        item3: number;
        item4: number;
        item5: number;
        item6: number;
      }>;
    };
  }

  const continentsDatas: Continents = continents;
  const { region, puuid } = useParams<{ puuid: string; region: string }>();
  const [listMatchHistory, setListMatchHistory] = useState<string[]>([]);
  const [regionRouting] = useState<string>(continentsDatas[region as string]);
  const [summonerName] = useState<string | null>(
    localStorage.getItem('summonerName')
  );
  const [matchInfos, setMatchInfos] = useState<MatchInfo[]>([]);
  const [userPuuid] = useState<string>(puuid ?? '');
  const [userIndex, setUserIndex] = useState<number[]>([]);

  const [itemsDatas, setItemsDatas] = useState<ItemsDatas>();

  const fetchMatchHistory = async () => {
    try {
      const matchHistory = await getUserMatchHistory(
        puuid as string,
        regionRouting
      );
      setListMatchHistory(matchHistory);
    } catch (error) {
      console.error('Request failed. See next error => ', error);
    }
  };

  const fetchDatasInformations = async () => {
    try {
      const itemsDatas = await getItemInformation(language);
      setItemsDatas(itemsDatas);
      return itemsDatas;
    } catch (error) {
      console.error('Error fetching data: ', error);
      return null;
    }
  };

  const fetchMatchInfos = async () => {
    for (const matchId of listMatchHistory) {
      try {
        const matchData = await getUserMatchInfosRegardingMatchId(
          regionRouting,
          matchId
        );
        const userIndex = matchData.metadata.participants.findIndex(
          (participant: string) => participant === userPuuid
        );
        setMatchInfos((prev) => [...prev, matchData]);
        setUserIndex((prevIndices) => [...prevIndices, userIndex]);
      } catch (error) {
        console.error('Error fetching match info: ', error);
      }
    }
  };

  useEffect(() => {
    fetchMatchHistory();
  }, []);

  useEffect(() => {
    fetchMatchInfos();
    fetchDatasInformations();
  }, [listMatchHistory]);

  return (
    <section>
      <FormSearchPlayer className="flex justify-around mb-4" />
      <div>
        <h1 className="text-2xl md:text-3xl px-4 mb-14 text-center mt-8 text-blue-12 dark:text-bluedark-12 ">
          Warm welcome {summonerName} to your match history! Draven will judge
          it soon.
        </h1>
      </div>
      <div>
        <div className="flex flex-col gap-6">
          {listMatchHistory && itemsDatas ? (
            matchInfos.map((match, index) => (
              <>
                <CardMatchUserInformations
                  laguage={language}
                  participants={match.info.participants}
                  victory={match.info.participants[userIndex[index]].win}
                  role={match.info.participants[userIndex[index]].teamPosition}
                  duration={match.info.gameDuration}
                  gold={
                    match.info.participants[userIndex[index]].goldEarned -
                    match.info.participants[userIndex[index]].goldSpent
                  }
                  minions={
                    match.info.participants[userIndex[index]]
                      .totalMinionsKilled +
                    match.info.participants[userIndex[index]]
                      .totalAllyJungleMinionsKilled +
                    match.info.participants[userIndex[index]]
                      .totalEnemyJungleMinionsKilled
                  }
                  level={match.info.participants[userIndex[index]].champLevel}
                  summonerName={
                    match.info.participants[userIndex[index]].summonerName
                  }
                  kills={match.info.participants[userIndex[index]].kills}
                  deaths={match.info.participants[userIndex[index]].deaths}
                  assists={match.info.participants[userIndex[index]].assists}
                  summonerSpell1={
                    match.info.participants[userIndex[index]].summoner1Id
                  }
                  summonerSpell2={
                    match.info.participants[userIndex[index]].summoner2Id
                  }
                  championName={
                    match.info.participants[userIndex[index]].championName
                  }
                  championId={
                    match.info.participants[userIndex[index]].championId
                  }
                  itemsDatas={itemsDatas}
                  item0={match.info.participants[userIndex[index]].item0}
                  item1={match.info.participants[userIndex[index]].item1}
                  item2={match.info.participants[userIndex[index]].item2}
                  item3={match.info.participants[userIndex[index]].item3}
                  item4={match.info.participants[userIndex[index]].item4}
                  item5={match.info.participants[userIndex[index]].item5}
                  item6={match.info.participants[userIndex[index]].item6}
                />
              </>
            ))
          ) : (
            <p>No match history availables</p>
          )}
        </div>
        <UserInfosSideBar />
      </div>
    </section>
  );
}

type CardMatchUserInformationsProps = {
  laguage: string;
  participants: RootParticipant[];
  victory: boolean;
  role: string;
  duration: number;
  gold: number;
  minions: number;
  level: number;
  kills: number;
  assists: number;
  deaths: number;
  summonerSpell1: number;
  summonerSpell2: number;
  summonerName: string;
  championName: string;
  championId: number;
  itemsDatas: ItemsDatas;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
};

const CardMatchUserInformations = memo(
  ({
    laguage,
    participants,
    victory,
    role,
    duration,
    gold,
    minions,
    level,
    kills,
    assists,
    deaths,
    summonerSpell1,
    summonerSpell2,
    championName,
    itemsDatas,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
  }: CardMatchUserInformationsProps) => {
    interface SummonerSpell {
      id: string;
      name: string;
      description: string;
      tooltip: string;
      maxrank: number;
      cooldown: number[];
      cooldownBurn: string;
      cost: number[];
      costBurn: string;
      datavalues: Record<string, unknown>;
      effect: (number[] | null)[];
      effectBurn: (string | null)[];
      vars: unknown[];
      key: string;
      summonerLevel: number;
      modes: string[];
      costType: string;
      maxammo: string;
      range: number[];
      rangeBurn: string;
      image: {
        full: string;
        sprite: string;
        group: string;
        x: number;
        y: number;
        w: number;
        h: number;
      };
      resource: string;
    }
    const [nameSummonerSpell1, setNameSummonerSpell1] = useState('');
    const [nameSummonerSpell2, setNameSummonerSpell2] = useState('');
    const [displayTeamMates, setDisplayTeamMates] = useState<boolean>(false);
    const fetchSummonerSpellName = async (
      summonerSpell: number,
      state: (arg: string) => void
    ) => {
      try {
        const summonerList = await getAllSummonerSpells(laguage);
        const spellsArray: SummonerSpell[] = Object.values(summonerList.data);
        const spell = spellsArray.find(
          (spell) => spell.key === summonerSpell.toString()
        );

        if (spell) {
          state(spell.name);
        }
      } catch {
        console.error('Error fetchSummonerAsset');
      }
    };

    fetchSummonerSpellName(summonerSpell1, setNameSummonerSpell1);
    fetchSummonerSpellName(summonerSpell2, setNameSummonerSpell2);

    return (
      <div className="flex flex-col">
        <div className="max-w-[1000px] mx-auto ">
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-10 bg-blue-5 dark:bg-bluedark-5 p-4 mx-auto rounded-lg ${
              victory
                ? 'bg-mint-5 dark:bg-mintdark-8'
                : 'bg-red-5 dark:bg-reddark-8'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center">
                <p
                  className={`first-letter:text-4xl   ${
                    victory
                      ? 'text-mint-11 dark:text-mintdark-3'
                      : 'text-red-11 dark:text-reddark-3'
                  } `}
                >
                  {victory ? 'V' : 'D'}
                </p>
              </div>
              <div className="relative h-full flex items-center my-auto">
                <img
                  className="h-28 w-28 rounded-lg"
                  src={getChampionSquareAsset(championName)}
                  alt={'Champion asset ' + championName}
                  loading="lazy"
                  title={championName}
                />
                <span className="absolute rounded-full px-2 py-1 bg-graydark-2 text-graydark-12 bottom-0 right-0 translate-x-2/4 translate-y-1/4 lg:-translate-y-full">
                  {level}
                </span>
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col justify-between sm:justify-normal gap-4">
                  <div>
                    <p
                      className={`text-xl  ${
                        victory
                          ? 'text-mint-11 dark:text-mintdark-12'
                          : 'text-red-11 dark:text-reddark-12'
                      }`}
                    >
                      {championName}
                    </p>
                    <p
                      className={`text-md lowercase first-letter:uppercase  ${
                        victory
                          ? 'text-mint-11 dark:text-mintdark-12'
                          : 'text-red-11 dark:text-reddark-12'
                      }`}
                    >
                      {role}
                    </p>
                    <p
                      className={`text-md  ${
                        victory
                          ? 'text-mint-11 dark:text-mintdark-12'
                          : 'text-red-11 dark:text-reddark-12'
                      }`}
                    >{`${Math.floor(duration / 60)}:${(
                      `0` +
                      (duration % 60)
                    ).slice(-2)}`}</p>
                  </div>
                  <div className="flex gap-2">
                    <img
                      className={`h-8 w-8 border-solid border-2 rounded-lg ${
                        victory
                          ? 'border-mint-5 dark:border-mintdark-5'
                          : 'border-red-5 dark:border-reddark-5'
                      }`}
                      src={getAssetSummonerSpells(nameSummonerSpell1)}
                      alt={nameSummonerSpell1}
                      title={nameSummonerSpell1}
                    />
                    <img
                      className={`h-8 w-8 border-solid border-2 rounded-lg ${
                        victory
                          ? 'border-mint-5 dark:border-mintdark-5'
                          : 'border-red-5 dark:border-reddark-5'
                      }`}
                      src={getAssetSummonerSpells(nameSummonerSpell2)}
                      alt={nameSummonerSpell2}
                      title={nameSummonerSpell2}
                    />
                  </div>
                </div>

                <div className="h-full flex flex-col justify-between gap-2 sm:gap-4">
                  <div className="relative flex flex-col justify-around gap-1 border-solid ">
                    <div className="flex gap-2">
                      <Item
                        item={item0}
                        itemsDatas={itemsDatas}
                        victory={victory}
                      />
                      <Item
                        item={item1}
                        itemsDatas={itemsDatas}
                        victory={victory}
                      />
                      <Item
                        item={item2}
                        itemsDatas={itemsDatas}
                        victory={victory}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Item
                        item={item3}
                        itemsDatas={itemsDatas}
                        victory={victory}
                      />
                      <Item
                        item={item4}
                        itemsDatas={itemsDatas}
                        victory={victory}
                      />
                      <Item
                        item={item5}
                        itemsDatas={itemsDatas}
                        victory={victory}
                      />
                    </div>

                    <img
                      className="h-9 w-9 rounded-full absolute right-0 translate-x-1/4"
                      src={getItemAsset(item6 as number)}
                      alt={'Item asset ' + itemsDatas?.data[item6]?.name}
                      title={itemsDatas?.data[item6]?.name}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row  sm:gap-4 items-start sm:items-center justify-between sm:justify-normal">
                    <p
                      className={`text-md text-center whitespace-nowrap ${
                        victory
                          ? 'text-mint-12 dark:text-mintdark-12 '
                          : 'text-red-12 dark:text-reddark-12'
                      }`}
                    >
                      {kills} / {deaths} / {assists}
                    </p>
                    <p
                      className={`text-sm text-center whitespace-nowrap ${
                        victory
                          ? 'text-mint-12 dark:text-mintdark-12 '
                          : 'text-red-12 dark:text-reddark-12'
                      }`}
                    >
                      KDA :{' '}
                      {deaths != 0
                        ? ((deaths + kills) / deaths).toFixed(1)
                        : 'Perfect'}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col justify-center">
                  <div
                    className={`flex gap-2 justify-between text-md  ${
                      victory
                        ? 'text-mint-11 dark:text-mintdark-12'
                        : 'text-red-11 dark:text-reddark-12'
                    }`}
                  >
                    <p>{gold}</p>
                    <img
                      className="h-8 w-8"
                      src="http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/items.png"
                      alt="gold"
                      title="minion"
                    />
                  </div>
                  <div
                    className={`flex justify-between gap-2 text-md  ${
                      victory
                        ? 'text-mint-11 dark:text-mintdark-12'
                        : 'text-red-11 dark:text-reddark-12'
                    }`}
                  >
                    <p>{minions}</p>
                    <img
                      className="h-8 w-8"
                      src="http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
                      alt="gold"
                      title="gold"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <TeamMates participants={participants} victory={victory} />
              </div>
            </div>
            <div
              className={`flex flex-col gap-2 text-sm justify-center items-center text-center lg:hidden ${
                victory
                  ? 'text-mint-11 dark:text-mintdark-12 '
                  : 'text-red-11 dark:text-reddark-12 '
              }`}
            >
              Mates
              <ArrowDownIcon
                className={`h-10 w-10 lg:hidden cursor-pointer rounded-full ${
                  victory
                    ? 'text-mint-11 dark:text-mintdark-12 hover:bg-mint-11 hover:text-mint-1 dark:hover:bg-mintdark-12 dark:hover:text-mintdark-1'
                    : 'text-red-11 dark:text-reddark-12 hover:bg-red-11 hover:text-red-1 dark:hover:bg-reddark-12 dark:hover:text-reddark-1'
                }`}
                onClick={() => setDisplayTeamMates((prev) => !prev)}
              />
            </div>
          </div>
          <div className={`lg:hidden ${displayTeamMates ? 'block' : 'hidden'}`}>
            <TeamMates participants={participants} victory={victory} />
          </div>
        </div>
      </div>
    );
  }
);

function UserInfosSideBar() {
  return null;
}
