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
import mockMatch from '../datas/mockMatch.json';
import { useEffect, useState } from 'react';
import { useSidebarContext } from '../context/NavBar';
import { ArrowDownIcon } from '@radix-ui/react-icons';

export default function UserInfos() {
  const { language } = useSidebarContext();
  interface Continents {
    [key: string]: string;
  }
  const continentsDatas: Continents = continents;
  const { region, puuid } = useParams();
  const [listMatchHistory, setListMatchHistory] = useState<string[]>();
  const [regionRouting] = useState<string>(continentsDatas[region as string]);
  const [summonerName] = useState<string | null>(
    localStorage.getItem('summonerName')
  );
  const [matchInfos, setMatchInfos] = useState<object[]>([]);
  const [userPuuid] = useState<string>(import.meta.env.VITE_NOC_ER_GAL_PUUID);
  const [userIndex] = useState<number>(
    mockMatch.metadata.participants.findIndex(
      (participant) => participant == userPuuid
    )
  );
  const [itemsDatas, setItemsDatas] = useState<object | null>(null);

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
      return itemsDatas;
    } catch (error) {
      console.error('Error fetching data: ', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datas = await fetchDatasInformations();
        setItemsDatas(datas);
      } catch (error) {
        console.error(
          'There was an error fetching the item information',
          error
        );
      }
    };
    fetchData();
  }, [language]);

  // console.log(itemsDatas);

  // useEffect(() => {
  //   fetchMatchHistory();
  // }, []);

  // useEffect(() => {
  //   fetchMatchInfos();
  // }, [listMatchHistory]);

  // console.log(mockMatch);
  // console.log(userIndex);
  // console.log(matchInfos);

  // console.log(mockMatch.info.participants[userIndex].championName);

  return (
    <section>
      <div>
        <h1 className="text-2xl md:text-3xl px-4 mb-14 text-center mt-8 text-blue-12 dark:text-bluedark-12 ">
          Warm welcome {summonerName} to your match history! Draven will judge
          it soon.
        </h1>
      </div>
      <div>
        <div className="flex flex-col gap-6">
          {
            // listMatchHistory && (
            // matchInfos.map((match, index) => (
            <>
              {/* // listMatchHistory && (
              // matchInfos.map((match, index) => ( */}
              <CardMatchUserInformations
                laguage={language}
                victory={true}
                role={mockMatch.info.participants[userIndex].teamPosition}
                duration={mockMatch.info.gameDuration}
                level={mockMatch.info.participants[userIndex].champLevel}
                summonerName={
                  mockMatch.info.participants[userIndex].summonerName
                }
                kills={mockMatch.info.participants[userIndex].kills}
                deaths={mockMatch.info.participants[userIndex].deaths}
                assists={mockMatch.info.participants[userIndex].assists}
                summonerSpell1={
                  mockMatch.info.participants[userIndex].summoner1Id
                }
                summonerSpell2={
                  mockMatch.info.participants[userIndex].summoner2Id
                }
                championName={
                  mockMatch.info.participants[userIndex].championName
                }
                championId={mockMatch.info.participants[userIndex].championId}
                itemsDatas={itemsDatas}
                item0={mockMatch.info.participants[userIndex].item0}
                item1={mockMatch.info.participants[userIndex].item1}
                item2={mockMatch.info.participants[userIndex].item2}
                item3={mockMatch.info.participants[userIndex].item3}
                item4={mockMatch.info.participants[userIndex].item4}
                item5={mockMatch.info.participants[userIndex].item5}
                item6={mockMatch.info.participants[userIndex].item6}
              />
              <CardMatchUserInformations
                laguage={language}
                victory={false}
                duration={150}
                level={mockMatch.info.participants[userIndex].champLevel}
                summonerName={
                  mockMatch.info.participants[userIndex].summonerName
                }
                summonerSpell1={
                  mockMatch.info.participants[userIndex].summoner1Id
                }
                summonerSpell2={
                  mockMatch.info.participants[userIndex].summoner2Id
                }
                championName={
                  mockMatch.info.participants[userIndex].championName
                }
                championId={mockMatch.info.participants[userIndex].championId}
                itemsDatas={itemsDatas}
                item0={mockMatch.info.participants[userIndex].item0}
                item1={mockMatch.info.participants[userIndex].item1}
                item2={mockMatch.info.participants[userIndex].item2}
                item3={mockMatch.info.participants[userIndex].item3}
                item4={mockMatch.info.participants[userIndex].item4}
                item5={mockMatch.info.participants[userIndex].item5}
                item6={mockMatch.info.participants[userIndex].item6}
              />
            </>
            // )
            // )
            // )
          }
        </div>
        <UserInfosSideBar />
      </div>
    </section>
  );
}

type CardMatchUserInformationsProps = {
  laguage: string;
  victory: boolean;
  role: string;
  duration: number;
  level: number;
  kills: number;
  assists: number;
  deaths: number;
  summonerSpell1: number;
  summonerSpell2: number;
  summonerName: string;
  championName: string;
  championId: number;
  itemsDatas: object;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
};

function CardMatchUserInformations({
  laguage,
  victory,
  role,
  duration,
  level,
  kills,
  assists,
  deaths,
  summonerName,
  summonerSpell1,
  summonerSpell2,
  championName,
  championId,
  itemsDatas,
  item0,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
}: CardMatchUserInformationsProps) {
  const [nameSummonerSpell1, setNameSummonerSpell1] = useState('');
  const [nameSummonerSpell2, setNameSummonerSpell2] = useState('');
  const [displayTeamMates, setDisplayTeamMates] = useState<boolean>(false);

  const fetchSummonerSpellName = async (
    summonerSpell: number,
    state: (arg: string) => void
  ) => {
    try {
      const summonerList = await getAllSummonerSpells(laguage);
      const spellsArray = Object.values(summonerList.data);
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

  const handleDisplayTeam = () => {
    setDisplayTeamMates((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <div className="max-w-[1000px] mx-auto">
        <div
          className={`flex gap-4 sm:gap-10 bg-blue-5 dark:bg-bluedark-5 p-4 mx-auto rounded-lg ${
            victory
              ? 'bg-mint-5 dark:bg-mintdark-8'
              : 'bg-red-5 dark:bg-reddark-8'
          }`}
        >
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
          <div className="relative h-full my-auto">
            <img
              className="h-28 w-28 rounded-lg"
              src={getChampionSquareAsset(championName)}
              alt={'Champion asset ' + championName}
              loading="lazy"
              title={championName}
            />
            <span className="absolute rounded-full px-2 py-1 bg-graydark-2 text-graydark-12 bottom-0 right-0 translate-x-2/4 translate-y-1/4">
              {level}
            </span>
          </div>
          <div className="flex flex-col gap-4">
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
              >{`${Math.floor(duration / 60)}:${(`0` + (duration % 60)).slice(
                -2
              )}`}</p>
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
          {/* Items */}
          <div className="relative flex flex-col justify-around gap-2 border-solid ">
            <div className="flex gap-2">
              <img
                className={`h-10 w-10 border-solid border-2 rounded-lg ${
                  victory
                    ? 'border-mint-5 dark:border-mintdark-5'
                    : 'border-red-5 dark:border-reddark-5'
                }`}
                src={getItemAsset(item0)}
                alt={'Item asset ' + itemsDatas?.data[item0]?.name}
                title={itemsDatas?.data[item0]?.name}
              />
              <img
                className={`h-10 w-10 border-solid border-2 rounded-lg ${
                  victory
                    ? 'border-mint-5 dark:border-mintdark-5'
                    : 'border-red-5 dark:border-reddark-5'
                }`}
                src={getItemAsset(item1)}
                alt={'Item asset ' + itemsDatas?.data[item1]?.name}
                title={itemsDatas?.data[item1]?.name}
              />
              <img
                className={`h-10 w-10 border-solid border-2 rounded-lg ${
                  victory
                    ? 'border-mint-5 dark:border-mintdark-5'
                    : 'border-red-5 dark:border-reddark-5'
                }`}
                src={getItemAsset(item2)}
                alt={'Item asset ' + itemsDatas?.data[item2]?.name}
                title={itemsDatas?.data[item2]?.name}
              />
            </div>
            <div className="flex gap-2">
              <img
                className={`h-10 w-10 border-solid border-2 rounded-lg ${
                  victory
                    ? 'border-mint-5 dark:border-mintdark-5'
                    : 'border-red-5 dark:border-reddark-5'
                }`}
                src={getItemAsset(item3)}
                alt={'Item asset ' + itemsDatas?.data[item3]?.name}
                title={'Item asset ' + itemsDatas?.data[item3]?.name}
              />
              <img
                className={`h-10 w-10 border-solid border-2 rounded-lg ${
                  victory
                    ? 'border-mint-5 dark:border-mintdark-5'
                    : 'border-red-5 dark:border-reddark-5'
                }`}
                src={getItemAsset(item4)}
                alt={'Item asset ' + itemsDatas?.data[item4]?.name}
                title={itemsDatas?.data[item4]?.name}
              />
              <img
                className={`h-10 w-10 border-solid border-2 rounded-lg ${
                  victory
                    ? 'border-mint-5 dark:border-mintdark-5'
                    : 'border-red-5 dark:border-reddark-5'
                }`}
                src={getItemAsset(item5)}
                alt={'Item asset ' + itemsDatas?.data[item5]?.name}
                title={itemsDatas?.data[item5]?.name}
              />
            </div>
            <img
              className="h-9 w-9 rounded-full absolute right-0 translate-x-2/4 "
              src={getItemAsset(item6)}
              alt={'Item asset ' + itemsDatas?.data[item6]?.name}
              title={itemsDatas?.data[item6]?.name}
            />
          </div>
          <div className="hidden sm:flex flex-col ">
            <div
              className={`flex gap-2 justify-between text-md  ${
                victory
                  ? 'text-mint-11 dark:text-mintdark-12'
                  : 'text-red-11 dark:text-reddark-12'
              }`}
            >
              <p>1209</p>
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
              <p>204</p>
              <img
                className="h-8 w-8"
                src="http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
                alt="gold"
                title="gold"
              />
            </div>
            <p className="text-sm text-center">
              KDA : {deaths != 0 ? (deaths + kills) / deaths : 'Perfect'}
            </p>
          </div>
          <div className="hidden lg:block">
            <TeamMates victory={victory} />
          </div>
          <ArrowDownIcon
            className="h-16 w-16 lg:hidden cursor-pointer"
            onClick={() => setDisplayTeamMates((prev) => !prev)}
          />
        </div>
        <div className={`lg:hidden ${displayTeamMates ? 'block' : 'hidden'}`}>
          <TeamMates victory={victory} />
        </div>
      </div>
    </div>
  );
}

type TeamMatesProps = {
  victory: boolean;
};

function TeamMates({ victory }: TeamMatesProps) {
  return (
    <div
      className={`p-2 rounded-lg max-md ${
        victory
          ? 'text-mint-1 dark:text-mintdark-12 bg-mint-6 dark:bg-mintdark-6 '
          : 'text-red-1 dark:text-reddark-12 bg-red-6 dark:bg-reddark-6'
      }`}
    >
      <h2
        className={`text-center font-semibold  ${
          victory
            ? 'text-mint-1 dark:text-mintdark-12'
            : 'text-red-1 dark:text-reddark-12'
        }`}
      >
        Team Mates
      </h2>
      <div className="grid grid-cols-2 gap-2">
        <div
          className={`overflow-hidden p-2 rounded-lg ${
            victory
              ? 'text-mint-1 dark:text-mintdark-12 bg-mint-6 dark:bg-mintdark-8  '
              : 'text-red-1 dark:text-reddark-12 bg-red-6 dark:bg-reddark-8'
          }`}
        >
          <h3
            className={`text-center mb-2 ${
              victory
                ? 'text-mint-12 dark:text-mintdark-12'
                : 'text-red-12 dark:text-reddark-12'
            }`}
          >
            Blue Side
          </h3>
          <div>
            {Object.values(mockMatch.info.participants)
              .slice(5)
              .map((participant) => (
                <div
                  key={participant.puuid}
                  className="flex gap-2 justify-between items-center text-center mb-1"
                >
                  <div className="flex gap-2.5 sm:max-w-none max-w-[100px]">
                    <img
                      className="h-5 w-5"
                      src={getChampionSquareAsset(participant.championName)}
                      alt={participant.championName}
                      loading="lazy"
                      title={participant.championName}
                    />

                    <p
                      key={participant.puuid}
                      className="text-sm text-center overflow-hidden text-ellipsis  whitespace-nowrap "
                    >
                      {participant.summonerName}
                    </p>
                  </div>

                  <p
                    key={participant.puuid}
                    className="text-sm text-center whitespace-nowrap"
                  >
                    {participant.kills} / {participant.deaths} /{' '}
                    {participant.assists}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div
          className={`overflow-hidden p-2 rounded-lg ${
            victory
              ? 'text-mint-1 dark:text-mintdark-12 bg-mint-6 dark:bg-mintdark-8  '
              : 'text-red-1 dark:text-reddark-12 bg-red-6 dark:bg-reddark-8'
          }`}
        >
          <h3
            className={`mb-2 text-center ${
              victory
                ? 'text-mint-12 dark:text-mintdark-12'
                : 'text-red-12 dark:text-reddark-12'
            }`}
          >
            Blue Side
          </h3>
          {Object.values(mockMatch.info.participants)
            .slice(0, 5)
            .map((participant) => (
              <div className="flex gap-2 justify-between items-center text-center mb-1">
                <div className="flex gap-2.5 sm:max-w-none max-w-[100px]">
                  <img
                    title={participant.championName}
                    className="h-5 w-5"
                    src={getChampionSquareAsset(participant.championName)}
                    alt={participant.championName}
                    loading="lazy"
                  />

                  <p
                    key={participant.puuid}
                    className="text-sm text-center overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {participant.summonerName}
                  </p>
                </div>

                <p
                  key={participant.puuid}
                  className="text-sm text-center whitespace-nowrap"
                >
                  {participant.kills} / {participant.deaths} /{' '}
                  {participant.assists}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function UserInfosSideBar() {
  return null;
}
