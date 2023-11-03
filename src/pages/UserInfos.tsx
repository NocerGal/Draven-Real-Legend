import { useParams } from 'react-router-dom';
import {
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

  console.log(itemsDatas);

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
                duration={mockMatch.info.gameDuration}
                level={mockMatch.info.participants[userIndex].champLevel}
                summonerName={
                  mockMatch.info.participants[userIndex].summonerName
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
  duration: number;
  level: number;
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
  duration,
  level,
  summonerName,
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
  return (
    <div
      className={`flex gap-8 bg-blue-5 dark:bg-bluedark-5 p-4 mx-auto rounded-lg ${
        victory ? 'bg-mint-5 dark:bg-mintdark-8' : 'bg-red-5 dark:bg-reddark-8'
      }`}
    >
      <div className="relative h-full my-auto">
        <img
          className="h-28 w-28 rounded-lg"
          src={getChampionSquareAsset(championName)}
          alt={'Champion asset ' + championName}
          loading="lazy"
        />
        <span className="absolute rounded-full px-2 py-1 bg-graydark-2 text-graydark-12 bottom-0 right-0 translate-x-2/4 translate-y-1/4">
          {level}
        </span>
      </div>
      <div>
        <div>
          {/* <p>{summonerName}</p> */}
          <p>{championName}</p>
          <p>{`${Math.floor(duration / 60)}:${(`0` + (duration % 60)).slice(
            -2
          )}`}</p>

          <p>{victory ? 'Victoire' : 'Défaite'}</p>
        </div>
        <div>
          <div className="flex gap-2">
            <p>Gold: 1209</p>
            <img
              src="http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/items.png"
              alt="gold"
            />
          </div>
          <div className="flex gap-2">
            <p>Minions: 204</p>
            <img
              src="http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
              alt="gold"
            />
          </div>
        </div>
      </div>
      {/* Items */}
      <div className="relative flex flex-col justify-between">
        <div className="flex gap-2">
          <img
            className="h-10 w-10"
            src={getItemAsset(item0)}
            alt={'Item asset ' + itemsDatas?.data[item0]?.name}
          />
          <img
            className="h-10 w-10"
            src={getItemAsset(item1)}
            alt={'Item asset ' + itemsDatas?.data[item1]?.name}
          />
          <img
            className="h-10 w-10"
            src={getItemAsset(item2)}
            alt={'Item asset ' + itemsDatas?.data[item2]?.name}
          />
        </div>
        <div className="flex">
          <img
            className="h-10 w-10"
            src={getItemAsset(item3)}
            alt={'Item asset ' + itemsDatas?.data[item3]?.name}
          />
          <img
            className="h-10 w-10"
            src={getItemAsset(item4)}
            alt={'Item asset ' + itemsDatas?.data[item4]?.name}
          />
          <img
            className="h-10 w-10"
            src={getItemAsset(item5)}
            alt={'Item asset ' + itemsDatas?.data[item5]?.name}
          />
        </div>
        <img
          className="h-9 w-9 rounded-full absolute right-0 translate-x-2/4 top-2/4 translate-y-full"
          src={getItemAsset(item6)}
          alt={'Item asset ' + itemsDatas?.data[item6]?.name}
        />
      </div>
      <p>{championId}</p>
    </div>
  );
}

function UserInfosSideBar() {
  return null;
}
