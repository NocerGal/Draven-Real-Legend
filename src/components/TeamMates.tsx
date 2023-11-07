import { getChampionSquareAsset } from '../api/routesApi';
import { RootParticipant } from '../interfaces/participants';

type TeamMatesProps = {
  victory: boolean;
  participants: RootParticipant[];
};

export default function TeamMates({ victory, participants }: TeamMatesProps) {
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
            ? 'text-mint-12 dark:text-mintdark-12'
            : 'text-red-12 dark:text-reddark-12'
        }`}
      >
        Team Mates
      </h2>
      <div className="grid grid-rows-1 sm:grid-cols-2 gap-2">
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
            {Object.values(participants)
              .slice(5)
              .map((participant) => (
                <div
                  key={participant.puuid}
                  className="flex gap-2 justify-between items-center text-center mb-1"
                >
                  <div className="flex gap-2.5 sm:max-w-none max-w-[100px]">
                    <img
                      className="h-5 w-5 rounded-md"
                      src={getChampionSquareAsset(participant.championName)}
                      alt={participant.championName}
                      loading="lazy"
                      title={participant.championName}
                    />

                    <p
                      key={participant.puuid}
                      className={`text-sm text-center overflow-hidden text-ellipsis  whitespace-nowrap ${
                        victory
                          ? 'text-mint-12 dark:text-mintdark-12'
                          : 'text-red-12 dark:text-reddark-12'
                      }`}
                    >
                      {participant.summonerName}
                    </p>
                  </div>

                  <p
                    key={participant.puuid}
                    className={`text-sm text-center whitespace-nowrap ${
                      victory
                        ? 'text-mint-12 dark:text-mintdark-12'
                        : 'text-red-12 dark:text-reddark-12'
                    }`}
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
            Red Side
          </h3>
          {Object.values(participants)
            .slice(0, 5)
            .map((participant) => (
              <div
                key={participant.puuid}
                className="flex gap-2 justify-between items-center text-center mb-1"
              >
                <div className="flex gap-2.5 sm:max-w-none max-w-[100px]">
                  <img
                    title={participant.championName}
                    className="h-5 w-5 rounded-md"
                    src={getChampionSquareAsset(participant.championName)}
                    alt={participant.championName}
                    loading="lazy"
                  />

                  <p
                    key={participant.puuid}
                    className={`text-sm text-center overflow-hidden text-ellipsis whitespace-nowrap ${
                      victory
                        ? 'text-mint-12 dark:text-mintdark-12'
                        : 'text-red-12 dark:text-reddark-12'
                    }`}
                  >
                    {participant.summonerName}
                  </p>
                </div>

                <p
                  key={participant.puuid}
                  className={`text-sm text-center whitespace-nowrap ${
                    victory
                      ? 'text-mint-12 dark:text-mintdark-12'
                      : 'text-red-12 dark:text-reddark-12'
                  }`}
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
